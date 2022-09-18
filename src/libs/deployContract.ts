import {ethers} from "ethers";

export const deployContract = async (abi: any, bytecode: string, chainId: number) => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, chainId);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const factory = new ethers.ContractFactory(abi, bytecode, signer);
        const contract = await factory.deploy();
        await contract.deployed();
        console.log(`Deployment successful! Contract Address: ${contract.address}`);
        return contract.address;
    } catch (e) {
        console.error("Deploy err:", e);
        return null;
    }

}

