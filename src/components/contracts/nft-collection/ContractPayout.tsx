import React, {useCallback} from "react";
import {Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "src/controller/hooks";
import {updateAttribute} from "../../../controller/collectionContractSlice";
export default function ContractPayout() {
    const dispatch = useAppDispatch();
    const {form} = useAppSelector((state) => state.collectionContract)
    const handleUpdateAttribute = useCallback((key: string, value: any) => {
        dispatch(updateAttribute({key: key, value: value}));
    }, [])
    return (
        <React.Fragment>
            {
                form.payoutAddresses.map((item, index) => {
                    return <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                helperText={"This is the list of addresses who will be paid out from your contract. You can withdraw the MATIC in your contract at any time and it will be paid out according to the table defined here."}
                                value={form.payoutAddresses[index].address}
                                required
                                id={`payoutAddresses${index}`}
                                name={`payoutAddresses${index}`}
                                label="Address"
                                fullWidth
                                autoComplete={`payoutAddresses${index}`}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={form.payoutAddresses[index].percentage}
                                required
                                id={`percentage${index}`}
                                name={`percentage${index}`}
                                label="Percentage"
                                fullWidth
                                autoComplete={`percentage${index}`}
                                variant="standard"
                            />
                        </Grid>

                    </Grid>
                })
            }

            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                />
            </Grid>
        </React.Fragment>
    )
}