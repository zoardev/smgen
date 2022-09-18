import {Box, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {useAppSelector} from "../../controller/hooks";

export default function DeployedContracts() {
    const account = useAppSelector((state) => state.account);
    return (
        <Box className={"contract-list"}>
            <Typography variant="h5" fontWeight={"bold"} letterSpacing={1}  gutterBottom>
                Deployed Contracts
            </Typography>
            <Typography variant="body1" fontStyle={"italic"} gutterBottom>
                Your deployed smart contracts based on available templates.
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{letterSpacing: "1px"}}><strong>Name</strong></TableCell>
                            <TableCell align="left">Template</TableCell>
                            <TableCell align="left">Contract Address</TableCell>
                            <TableCell align="left">Network</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {localStorage.getItem(account.address) ? JSON.parse(localStorage.getItem(account.address)).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" sx={{letterSpacing: "1px"}}>
                                    <strong>{row.name}</strong>
                                </TableCell>
                                <TableCell align="left">{row.template}</TableCell>
                                <TableCell align="left">{row.contractAddress}</TableCell>
                                <TableCell align="left">{row.network}</TableCell>
                                <TableCell align="left">{"Deployed"}</TableCell>
                            </TableRow>
                        )) : <TableRow></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}