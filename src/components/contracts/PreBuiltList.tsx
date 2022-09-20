import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useCallback} from "react";
import {Box, Button, Typography} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
function createData(
    icon: string,
    name: string,
    key: string,
    description: string,
    version: string,
    releaseBy: any,
    status: any,
) {
    return { icon, name, key, description, version, releaseBy, status };
}

const rows = [
    createData("", 'NFT Collection',"NFTCollection", "ERC721 mintable NFTs", "1.0.0", <Button variant={"outlined"}>zoar.dev</Button>, <CheckCircleOutlineIcon aria-label={"ready"} color={"success"} />),
    createData("", 'NFT Marketplace',"NFTCollection1", "Marketplace for ERC721/ERC1155 NFTs", "1.0.0", <Button variant={"outlined"}>zoar.dev</Button>,  <CheckCircleOutlineIcon aria-label={"ready"} color={"success"} />),
    createData("", 'NFT Drop', "NFTCollection2","One NFT, one owner", "1.0.0", <Button variant={"outlined"}>zoar.dev</Button>,  <PendingIcon color={"info"} />),
    createData("", 'SocialFi', "SocialFi","A set of smart contracts implementing social finance", "1.0.0", <Button variant={"outlined"}>zoar.dev</Button>,  <PendingIcon color={"info"} />),
    createData("", 'Vote', "NFTCollection3","On-chain ERC20-based voting", "1.0.0", <Button variant={"outlined"}>zoar.dev</Button>,  <PendingIcon color={"info"} />),
    createData("", 'Donation',"NFTCollection4", "ERC721 mintable NFTs", "1.0.0", <Button variant={"outlined"}>zoar.dev</Button>,  <PendingIcon color={"info"}/>),
];

export default function PreBuiltList({router}) {
    const handleClickOnRow = useCallback((rowName) => {
        if (rowName === "NFTCollection") {
            router.push("/contracts/nft-collection");
        }
    }, [])
    return (
        <Box className={"contract-list"}>
            <Typography variant="h5" fontWeight={"bold"} letterSpacing={1} gutterBottom>
                Contract Templates
            </Typography>
            <Typography variant="body1" fontStyle={"italic"} gutterBottom>
                A list of solidity contract templates compatible with most of evm-supported blockchains.
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{letterSpacing: "1px"}}><strong>Name</strong></TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Version</TableCell>
                            <TableCell align="left">Release By</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.name} onClick={() => handleClickOnRow(row.key)} sx={{cursor:  ([0,1].indexOf(index) !== -1 ? "pointer" : "default")}}>
                                <TableCell component="th" scope="row" sx={{letterSpacing: "1px"}}>
                                    <strong>{row.name}</strong>
                                </TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.version}</TableCell>
                                <TableCell align="left">{row.releaseBy}</TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}
