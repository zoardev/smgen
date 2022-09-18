import React, {useCallback} from "react";
import {Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "src/controller/hooks";
import {updateAttribute} from "src/controller/collectionContractSlice";
export default function MetadataStorage() {
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
                        helperText={"Provide CID for your content folder."}
                        value={form.cid}
                        onChange={(event) => handleUpdateAttribute("cid", event.target.value)}
                        required
                        id="cid"
                        name="cid"
                        label="CID"
                        fullWidth
                        autoComplete="cid"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        helperText={"Choose file extension to your project content."}
                        value={form.folderName}
                        onChange={(event) => handleUpdateAttribute("folderName", event.target.value)}
                        required
                        id="folderName"
                        name="folderName"
                        label="Folder Name"
                        fullWidth
                        autoComplete="folder-name"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}