
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

    uint256 public constant TOTAL_SUPPLY = 100;
    uint8 public constant ROYALTY = 2.5;
    uint8 public constant MINT_PER_TRANSACTION = 1;
    uint256 public constant MINT_PRICE = 5 * 1e18;
    uint256 public constant WALLET_MINT_LIMIT = 10;
    string public constant CID = "";
    string public constant METADATA_FOLDER = "metadata";
    string public baseTokenURI = "";
    constructor() ERC721("NFT Collection", "NFC") {
        baseTokenURI = "";
    }

    function supportsInterface(bytes4 interfaceId)
    public view virtual override(ERC721, ERC2981)
    returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    modifier isNotWalletMintLimit(uint256 numberToMint) {
        uint256 balances = balanceOf(msg.sender);
        require(balances + numberToMint <= WALLET_MINT_LIMIT, "Exceeds maximum supply");
        _;
    }

    modifier isEnoughMintPrice(uint256 numberToMint) {
        require(msg.value >= MINT_PRICE * numberToMint, "Not enough token sent: check price.");
        _;
    }

    modifier isValidNumberToMint(uint256 numberToMint) {
        require(numberToMint <= MINT_PER_TRANSACTION, "Exceeds maximum number per transaction.");
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
        for(uint256 i; i < numberToMint; i++){
            currentTokenId.increment();
            uint256 newItemId = currentTokenId.current();
            _safeMint( to, newItemId);
            listOfMintIds[i] = newItemId;
            _setTokenRoyalty(newItemId, royaltyReceiver, ROYALTY);
        }
        return listOfMintIds;
    }
}