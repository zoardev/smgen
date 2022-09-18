import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";
import {deployContract} from "src/libs/deployContract";

export const deployNFTCollectionContract = createAsyncThunk("contract/get-abi", async (payload: null, {getState}) => {
    // @ts-ignore
    let appState: AppState = getState()
    try {
        let abiReq = await fetch(`/api/contract/getABI`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerAddress: appState.account.address,
                contractFile: "NFTCollection"
            })
        });
        let {abi, bytecode} = await abiReq.json();
        let contractAddress = await deployContract(
            abi,
            bytecode,
            appState.account.chainId
        )
        return {
            result: true,
            contractAddress: contractAddress,
            ownerAddress: appState.account.address,
            network: appState.account.network
        };
    } catch (e) {
        console.error("Could not deploy contract", e);
        return {result: false, contractAddress: null, ownerAddress: appState.account.address, network: appState.account.network};
    }

})