import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function FileCoin() {
    return (
        <Card sx={{ maxWidth: 345 }} className={"ipfs-suggestion"}>
            <CardMedia
                component="img"
                image="/imgs/filecoin.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                   Filecoin is a decentralized storage network design to store humanity's most important information.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"  onClick={() => window.open("https://hackathons.filecoin.io/", "_blank")}>Get started</Button>
            </CardActions>
        </Card>
    );
}