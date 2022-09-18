import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppState} from "../store";


export const generateNFTCollectionContract = createAsyncThunk("contract/nft-collection/generate", async (payload: null, {getState}) => {
    try {
        // @ts-ignore
        let appState: AppState = getState()
        let collectionContract = appState.collectionContract;
        await fetch(`/api/contract/generateNFTCollection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...collectionContract.form,
                ownerAddress: appState.account.address,
                contractFile: "NFTCollection"
            })
        });
        return {result: true}
    } catch (e) {
        console.log("Could not generate contract:", e);
        return {result: false}
    }
})