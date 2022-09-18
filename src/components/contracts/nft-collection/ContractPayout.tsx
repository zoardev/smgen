import React, {useCallback} from "react";
import {Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "src/controller/hooks";
import {
    updateAttribute,
    updatePayoutAddress,
    updatePayoutPercentage
} from "src/controller/collectionContractSlice";
export default function ContractPayout() {
    const dispatch = useAppDispatch();
    const {form} = useAppSelector((state) => state.collectionContract)

    return (
        <React.Fragment>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                helperText={"This is address who has permission to withdraw token from your smart contract. This feature supports native token of selected chain."}
                                value={form.payoutAddresses.address}
                                onChange={(event) => dispatch(updatePayoutAddress(event.target.value))}
                                required
                                id={`payoutAddresses`}
                                name={`payoutAddresses$`}
                                label="Address"
                                fullWidth
                                autoComplete={`payoutAddresses`}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={form.payoutAddresses.percentage}
                                onChange={(event) => dispatch(updatePayoutPercentage(parseFloat(event.target.value)))}
                                required
                                id={`percentage`}
                                name={`percentage`}
                                label="Percentage"
                                fullWidth
                                autoComplete={`percentage`}
                                variant="standard"
                                type={"number"}
                            />
                        </Grid>

                    </Grid>

        </React.Fragment>
    )
}