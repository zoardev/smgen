const fs = require("fs");
const path = require("path")

import {NextApiRequest, NextApiResponse} from "next";
import {ERC721Template} from "src/templates/ERC721Template";
const execSync = require('child_process').execSync;
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            name,
            tokenSymbol,
            description,
            royalty,
            mintPerTransaction,
            tokenSupply,
            mintPrice,
            walletMintLimit,
            payoutAddresses,
            cid,
            folderName,
            ownerAddress,
            contractFile
        } = req.body;
        const userDir = path.resolve(process.cwd(), `custom_contracts/${ownerAddress}`);
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
        const userCustomContractPath = path.resolve(userDir, `${contractFile}.sol`)
        fs.writeFileSync(userCustomContractPath,
            ERC721Template(
                name,
                tokenSymbol,
                description,
                royalty * 10,
                mintPerTransaction,
                tokenSupply,
                mintPrice,
                walletMintLimit,
                payoutAddresses,
                cid,
                folderName
            )
        );

        let compileResult = execSync(`truffle compile --contracts_directory custom_contracts/${ownerAddress} --contracts_build_directory custom_contracts/${ownerAddress}/build/${contractFile}/`);

        res.status(200).json({
            address: ownerAddress,
            contractFile: contractFile
        })

    }
}
export default handler;