import {Box, Typography} from "@mui/material";
import PreBuiltList from "src/components/contracts/PreBuiltList";
import {useRouter} from "next/router";
import DeployedContracts from "../components/contracts/DeployedContracts";
import RequestForm from "../components/general/RequestForm";

export default function Index() {
    const router = useRouter();
    return (
        <Box sx={{ width: '100%', mt: "10px"}}>
            <DeployedContracts />
            <PreBuiltList router={router} />
            <RequestForm />
        </Box>
    )
}