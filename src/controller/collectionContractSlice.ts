import {
    ActionReducerMapBuilder,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {CollectionContractState, PayoutAddress} from "./types/CollectionContractState";
import {generateNFTCollectionContract} from "./thunks/generateContract";
import {deployNFTCollectionContract} from "./thunks/deployContract";
import fa from "@walletconnect/qrcode-modal/dist/cjs/browser/languages/fa";

const initialState: CollectionContractState = {
    form: {
        name: "NFT Collection",
        tokenSymbol: "NFC",
        description: "NFT collection generator",
        royalty: 2.5,
        mintPerTransaction: 1,
        tokenSupply: 100,
        mintPrice: 5,
        walletMintLimit: 10,
        payoutAddresses: [{
            address: "",
            percentage: 5
        }],
        cid: "",
        folderName: "metadata",
        ownerAddress: "",
        template: "NFTCollection"
    },
    isGenerating: false,
    isDeploying: false,
    contractAddress: null
}

export const collectionContractSlice = createSlice({
    name: 'collectionContract',
    initialState,
    reducers: {
        updateAttribute: (state, action: PayloadAction<{key: string, value: any}> ) => {
            state.form[action.payload.key] = action.payload.value;
        },
        updatePayoutAddress: (state, action: PayloadAction<{addresses: PayoutAddress[]}> ) => {
            state.form.payoutAddresses = action.payload.addresses
        },
        updateIsGenerating: (state, action: PayloadAction<boolean>) => {
            state.isGenerating = action.payload;
        },
        updateIsDeploying: (state, action: PayloadAction<boolean>) => {
            state.isDeploying = action.payload;
        }

    },
    extraReducers(builder: ActionReducerMapBuilder<any>) {
        builder.addCase(generateNFTCollectionContract.fulfilled, (state: CollectionContractState, action) => {
            console.log("Generate contract here", action.payload);
            state.isGenerating = false;
        })
        builder.addCase(deployNFTCollectionContract.fulfilled,  (state: CollectionContractState, action) => {
            console.log("Deploy contract here");
            state.isDeploying = false;
            if (action.payload.result) {
                state.contractAddress = action.payload.contractAddress;
                let ownerDeployedContracts: any = localStorage.getItem(action.payload.ownerAddress);
                if (ownerDeployedContracts) {
                    ownerDeployedContracts = JSON.parse(ownerDeployedContracts);
                    ownerDeployedContracts.push({
                        ...state.form,
                        contractAddress:  action.payload.contractAddress,
                        template: "NFTCollection",
                        network: action.payload.network
                    });
                    localStorage.setItem(action.payload.ownerAddress, JSON.stringify(ownerDeployedContracts));
                } else {
                    localStorage.setItem(action.payload.ownerAddress, JSON.stringify([
                        {
                            ...state.form,
                            contractAddress:  action.payload.contractAddress,
                            template: "NFTCollection",
                            network: action.payload.network
                        }
                    ]));
                }
            } else {
                state.contractAddress = null;
            }

        })
    }

})

export const {updateAttribute, updatePayoutAddress, updateIsGenerating, updateIsDeploying } = collectionContractSlice.actions;
export default collectionContractSlice.reducer;