import React, {useCallback} from "react";
import {Card, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "src/controller/hooks";
import {updateAttribute} from "src/controller/collectionContractSlice";
import FileCoin from "../ipfs/FileCoin";

import IPFS from "../ipfs/IPFS";
export default function MetadataStorage() {
    const dispatch = useAppDispatch();
    const {form} = useAppSelector((state) => state.collectionContract)
    const handleUpdateAttribute = useCallback((key: string, value: any) => {
        dispatch(updateAttribute({key: key, value: value}));
    }, [])
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item sx={{marginTop: "20px"}}>
                    <Typography variant={"body2"}>
                        Highly recommended Filecoin to store NFT files & metadata for your collection.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} sx={{display: "flex"}}>
                    <FileCoin />
                    <IPFS />
                </Grid>
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
                        helperText={"Choose sub-folder to store NFT metadata."}
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