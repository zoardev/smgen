import React, {useCallback} from "react";
import {Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import {useAppSelector, useAppDispatch} from "src/controller/hooks";
import {updateAttribute} from "src/controller/collectionContractSlice";
export default function ContractMetadata() {
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
                        helperText={"This is the name of your project. It will appear wherever your collection is mentioned."}
                        value={form.name}
                        onChange={(event) => handleUpdateAttribute("name", event.target.value)}
                        required
                        id="contractName"
                        name="contractName"
                        label="Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        helperText={"This is the token symbol for your projects token. For example: «MATIC», «NFT», «TKN»."}
                        required
                        value={form.tokenSymbol}
                        onChange={(event) => handleUpdateAttribute("tokenSymbol", event.target.value)}
                        id="tokenSymbol"
                        name="tokenSymbol"
                        label="Token Symbol"
                        fullWidth
                        autoComplete="token-symbol"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        helperText={"This is the description of your project. You can change it anytime."}
                        required
                        value={form.description}
                        onChange={(event) => handleUpdateAttribute("description", event.target.value)}
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        autoComplete="contract-description"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        helperText={"This is the % royalties you will collect on secondary sales."}
                        value={form.royalty}
                        onChange={(event) => handleUpdateAttribute("royalty", event.target.value)}
                        id="royalty"
                        name="royalty"
                        label="Royalty (%)"
                        fullWidth
                        autoComplete="token-royalty"
                        variant="standard"
                        type={"number"}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}