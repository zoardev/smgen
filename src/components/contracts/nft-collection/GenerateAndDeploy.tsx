import React, {useCallback} from "react";
import {Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "src/controller/hooks";
import {generateNFTCollectionContract} from "src/controller/thunks/generateContract";
import {deployNFTCollectionContract} from "src/controller/thunks/deployContract";
import LoadingButton from '@mui/lab/LoadingButton';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import ConstructionIcon from '@mui/icons-material/Construction';
import {updateIsDeploying, updateIsGenerating} from "../../../controller/collectionContractSlice";
export default function GenerateAndDeploy() {
    const {form, isGenerating, isDeploying, contractAddress} = useAppSelector((state) => state.collectionContract)
    const account = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const handleGenerate = useCallback(async () => {
        dispatch(updateIsGenerating(true));
        await dispatch(generateNFTCollectionContract());
    }, [])

    const handleDeploy = useCallback(async () => {
        dispatch(updateIsDeploying(true));
        await dispatch(deployNFTCollectionContract());
    }, [])

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <h4 style={{letterSpacing: "1px"}}>Generate {form.name} Contract</h4>
                    <p>You need to generate smart contract before you can deploy it.</p>
                    <LoadingButton
                        disabled={!account.address}
                        loading={isGenerating}
                        loadingPosition="start"
                        startIcon={<DataSaverOnIcon color={"action"} />}
                        variant="contained"
                        onClick={() => handleGenerate()}>
                        { account.address ? "Generate" : "Please Login with Metamask"}
                    </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                    <h4 style={{letterSpacing: "1px"}}> Deploy Contract to {account.network}</h4>

                    <Typography variant={"body2"}>
                        {contractAddress ?  <p>Deployed Contract Address: <span style={{fontStyle: "italic"}}>{contractAddress}</span></p> : <></>}
                    </Typography>
                    <LoadingButton
                        disabled={!account.address}
                        loading={isDeploying}
                        loadingPosition="start"
                        startIcon={<ConstructionIcon  color={"action"} />}
                        variant="contained"
                        onClick={() => handleDeploy()}>
                        { account.address ? "Deploy" : "Please Login with Metamask" }
                    </LoadingButton>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}