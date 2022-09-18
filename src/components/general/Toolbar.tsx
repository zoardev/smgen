import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';

import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

import SignIn from "./SignIn";
import {Badge} from "@mui/material";
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color={"secondary"}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <img src="/imgs/logo.png" alt="logo" height="30" />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            size={"small"} aria-label="documents" color="inherit">

                            <DocumentScannerIcon />

                        </IconButton>
                        <IconButton
                            sx={{display: { xs: 'none', sm: "inline-flex"}}}
                            size="large" aria-label="show 4 new mails" color="inherit">

                            <GitHubIcon />

                        </IconButton>
                        <IconButton
                            sx={{display: { xs: 'none', sm: "inline-flex"}}}
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            sx={{display: { xs: 'none', sm: "inline-flex"}}}
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <YouTubeIcon />
                        </IconButton>
                        <SignIn />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
