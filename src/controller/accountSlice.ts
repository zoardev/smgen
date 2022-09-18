import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {Account} from "./types/Account";



const initialState: Account = {
    network: "",
    balance: "",
    symbol: "",
    address: "",
    chainId: 0
}

export const accountSlice = createSlice({
    name: 'collectionContract',
    initialState,
    reducers: {
        updateAttribute: (state, action: PayloadAction<{key: string, value: any}> ) => {
            state[action.payload.key] = action.payload.value;
        },

    }
})

export const { updateAttribute } = accountSlice.actions;
export default accountSlice.reducer;