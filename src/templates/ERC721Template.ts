export const ERC721Template = (
    name: string,
    tokenSymbol: string,
    description: string,
    royalty: number,
    mintPerTransaction: number,
    tokenSupply: number,
    mintPrice: number,
    walletMintLimit: number,
    payoutAddresses: number,
    cid: string,
    folderName: string
): string => {
    return `
// contracts/CustomERC721.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract NFTCollection is ERC721, PullPayment, ERC2981 {
    using Counters for Counters.Counter;

    Counters.Counter private currentTokenId;

    uint256 public constant TOTAL_SUPPLY = ${tokenSupply};
    string public constant CID = "${cid}";
    string public constant METADATA_FOLDER = "${folderName}";

    uint8 public royalty = ${royalty};
    uint8 public mintPerTransaction = ${mintPerTransaction};
    uint256 public mintPrice = ${mintPrice} * 1e18;
    uint256 public walletMintLimit = ${walletMintLimit};

    string public baseTokenURI = "";
    constructor() ERC721("${name}", "${tokenSymbol}") {
        baseTokenURI = "";
    }

    function supportsInterface(bytes4 interfaceId)
    public view virtual override(ERC721, ERC2981)
    returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setRoyalty(uint8 _royalty) public onlyOwner returns (uint8) {
        royalty = _royalty;
        return _royalty;
    }

    function setMintPerTransaction(uint8 _mintPerTransaction) public onlyOwner returns (uint8) {
        mintPerTransaction = _mintPerTransaction;
        return _mintPerTransaction;
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner returns (uint256) {
        mintPrice = _mintPrice;
        return _mintPrice;
    }

    function setWalletMintLimit(uint256 _walletMintLimit) public onlyOwner returns (uint256) {
        walletMintLimit = _walletMintLimit;
        return _walletMintLimit;
    }

    function setBaseTokenURI(string _baseTokenURI) public onlyOwner returns (string) {
        baseTokenURI = _baseTokenURI;
        return _baseTokenURI;
    }


    modifier isNotWalletMintLimit(uint256 numberToMint) {
        uint256 balances = balanceOf(msg.sender);
        require(balances + numberToMint <= walletMintLimit, "Exceeds maximum supply");
        _;
    }

    modifier isEnoughMintPrice(uint256 numberToMint) {
        require(msg.value >= mintPrice * numberToMint, "Not enough token sent: check price.");
        _;
    }

    modifier isValidNumberToMint(uint256 numberToMint) {
        require(numberToMint <= mintPerTransaction, "Exceeds maximum number per transaction.");
        _;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function _burn(uint256 tokenId)
    internal virtual override {
        super._burn(tokenId);
        _resetTokenRoyalty(tokenId);
    }

    function burnNFT(uint256 tokenId)
    public {
        _burn(tokenId);
    }

    function mint(address to, uint256 numberToMint, address royaltyReceiver)
    public
    payable
    isNotWalletMintLimit(numberToMint)
    isValidNumberToMint(numberToMint)
    isEnoughMintPrice(numberToMint)
    returns (uint256[] memory)
    {
        uint256[] memory listOfMintIds = new uint256[](numberToMint);
        for (uint256 i; i < numberToMint; i++) {
            currentTokenId.increment();
            uint256 newItemId = currentTokenId.current();
            _safeMint( to, newItemId);
            listOfMintIds[i] = newItemId;
            _setTokenRoyalty(newItemId, royaltyReceiver, royalty);
        }
        return listOfMintIds;
    }
}`
}