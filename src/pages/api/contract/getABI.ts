const fs = require("fs");
const path = require("path")
import {NextApiRequest, NextApiResponse} from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const {
            ownerAddress,
            contractFile
        } = req.body;
        const userDir = path.resolve(process.cwd(), `custom_contracts/${ownerAddress}/build/${contractFile}`);
        if (!fs.existsSync(userDir)) {
            res.status(404).json({
                message: "Could not found folder"
            })
        } else {
            const userCustomContractPath = path.resolve(userDir, `${contractFile}.json`)
            if (!fs.existsSync(userCustomContractPath)) {
                res.status(404).json({
                    message: "Could not found file"
                })
            } else {
                let abiFile = fs.readFileSync(userCustomContractPath);
                let content = JSON.parse(abiFile);
                res.status(200).json({ abi: content.abi, bytecode: content.bytecode});
            }

        }


    }
}
export default handler;