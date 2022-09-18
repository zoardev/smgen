import React, {useCallback} from "react";
import {Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "src/controller/hooks";
import {updateAttribute} from "../../../controller/collectionContractSlice";
export default function Constraints() {
    const dispatch = useAppDispatch();
    const {form} = useAppSelector((state) => state.collectionContract)
    const handleUpdateAttribute = useCallback((key: string, value: any) => {
        dispatch(updateAttribute({key: key, value: value}));
    }, [])
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        helperText={"Specify the maximum number of NFTs that can be minted per transaction. This can be updated at any time after deployment."}
                        value={form.mintPerTransaction}
                        onChange={(event) => handleUpdateAttribute("mintPerTransaction", event.target.value)}
                        required
                        id="mintPerTransaction"
                        name="mintPerTransaction"
                        label="Mint per Transaction"
                        fullWidth
                        autoComplete="mint-per-transaction"
                        variant="standard"
                        type={"number"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        helperText={"This is the total number of NFTs in your collection. You cannot change this once deployed."}
                        required
                        value={form.tokenSupply}
                        onChange={(event) => handleUpdateAttribute("tokenSupply", event.target.value)}
                        id="tokenSupply"
                        name="tokenSupply"
                        label="Token Supply"
                        fullWidth
                        autoComplete="token-supply"
                        variant="standard"
                        type={"number"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        helperText={"Set the base price (in «MATIC») of your NFTs. Type «0» if you want them to be free of charge. This can be updated at any time after deployment."}
                        required
                        value={form.mintPrice}
                        onChange={(event) => handleUpdateAttribute("mintPrice", event.target.value)}
                        id="mintPrice"
                        name="mintPrice"
                        label="Mint Price"
                        fullWidth
                        autoComplete="mint-price"
                        variant="standard"
                        type={"number"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        helperText={"Specify the maximum number of NFTs that can be minted per wallet. This can be updated at any time after deployment."}
                        required
                        value={form.walletMintLimit}
                        onChange={(event) => handleUpdateAttribute("walletMintLimit", event.target.value)}
                        id="walletMintLimit"
                        name="walletMintLimit"
                        label="Wallet mint Limit"
                        fullWidth
                        autoComplete="wallet-mint-limit"
                        variant="standard"
                        type={"number"}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}