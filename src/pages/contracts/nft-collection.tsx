import Forms from "src/components/contracts/nft-collection/Forms";
import {
    Avatar,
    Box,
    Breadcrumbs, Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Link,
    Paper,
    Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import {useRouter} from "next/router";

export default function NftCollection() {
    const router = useRouter();
    return (
        <Box sx={{ width: '100%', mt: "10px", p: "20px"}}>
            <Breadcrumbs aria-label="breadcrumb">
                <Button variant={"text"} onClick={() => router.push("/")}>
                    Home
                </Button>
                <Typography color="text.primary">NFT Collection</Typography>
            </Breadcrumbs>
            <Paper sx={{ mt: "10px", p: "20px"}}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="NFT COLLECTION"
                        subheader="ERC721 mintable NFTs"
                    />
                    <CardContent>
                    <Divider variant="middle" />
                    <Forms />
                    </CardContent>
                </Card>

            </Paper>
        </Box>

    )
}