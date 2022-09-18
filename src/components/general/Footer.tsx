import {Box, Container, Paper, Typography} from "@mui/material";
import {Image} from "@mui/icons-material";
import * as React from "react";


export default function Footer() {
    return (
        <Paper sx={{marginTop: '50px',
            bottom: 0,
            width: '100%',
            border: "0"
        }} component="footer" square variant={"outlined"}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 2,
                    }}
                >
                    <Typography variant="caption" color="initial">
                        ZoarDev © 2022
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
}