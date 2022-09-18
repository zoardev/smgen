import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function IPFS() {
    return (
        <Card sx={{ maxWidth: 345 }} className={"ipfs-suggestion"}>
            <CardMedia
                component="img"
                image="/imgs/ipfs.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    A peer-to-peer hypermedia protocol
                    designed to preserve and grow humanity's knowledge
                    by making the web upgradeable, resilient, and more open.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Get started</Button>
            </CardActions>
        </Card>
    );
}