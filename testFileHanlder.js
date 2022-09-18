const fs = require("fs");
const path = require("path")
console.log(__dirname);
const userDir = path.resolve(__dirname, "custom_contracts/1234");
const userCustomContractPath = path.resolve(userDir, "abc.sol")
if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir);
}
fs.writeFileSync(userCustomContractPath, "--- content here ---");