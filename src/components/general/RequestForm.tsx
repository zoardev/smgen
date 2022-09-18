import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    TextareaAutosize,
    Typography
} from '@mui/material';
import * as React from "react";
export default function RequestForm() {
    return (
        <Box className={"request-form"}>
            {/*<Typography variant="h5" fontWeight={"bold"} letterSpacing={1}  gutterBottom>*/}
            {/*    Request form*/}
            {/*</Typography>*/}
            <Typography variant="body1" fontStyle={"italic"} gutterBottom>
                Don't see the contract template you want? send a request to us!
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={10}>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="request-content">Write your request information in details</InputLabel>
                        <Input id="request-content" aria-describedby="my-helper-text" />
                        {/*<FormHelperText id="my-helper-text">Write your request information in details</FormHelperText>*/}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <FormControl>
                        <Button variant={"contained"} color={"info"}>Submit</Button>
                    </FormControl>
                </Grid>
            </Grid>


        </Box>
    )
}