import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import User from 'images/user.png';
import Crypto from './components/crypto';
import Cricket from './components/cricket';

import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

import { theme } from 'styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import Header from 'components/header/header';

import styles from './Dashboard.module.css';
import Home from './components/home';
const drawerWidth = 240;

const openedMixin = theme => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const Dashboard = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [showHome, setShowHome] = useState(true);
    const [showCrypto, setShowCrypto] = useState(false);
    const [showCricket, setShowCricket] = useState(false);

    const handleClickHome = () => {
        setShowCricket(false);
        setShowCrypto(false);
        setShowHome(true);
    };

    const handleClickCrypto = () => {
        setShowHome(false);
        setShowCricket(false);
        setShowCrypto(true);
    };

    const handleClickCricket = () => {
        setShowCrypto(false);
        setShowHome(false);
        setShowCricket(true);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <ThemeProvider theme={theme}>
                <AppBar
                    position="fixed"
                    open={open}
                    color="primary"
                    sx={{
                        width: 65,
                        left: 0,
                        backgroundColor: '#dc166c',
                        height: 65,
                    }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            alignSelf: 'center',
                            ...(open && { display: 'none' }),
                        }}>
                        <MenuIcon />
                    </IconButton>
                </AppBar>
            </ThemeProvider>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleClickHome}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}>
                            <ListItemIcon
                                sx={{
                                    alignSelf: 'center',
                                    minWidth: 0,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#dc166c',
                                }}>
                                <AccountCircleIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Dashboard"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>

                        <ListItemButton onClick={handleClickCrypto}>
                            <ListItemIcon
                                sx={{
                                    alignSelf: 'center',
                                    marginTop: 5,
                                    marginBottom: 5,
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#dc166c',
                                }}>
                                <CurrencyBitcoinIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Cryptocurrency"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>

                        <ListItemButton onClick={handleClickCricket}>
                            <ListItemIcon
                                sx={{
                                    alignSelf: 'center',
                                    marginTop: 5,
                                    marginBottom: 5,
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#dc166c',
                                }}>
                                <SportsCricketIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Cricket"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon
                                sx={{
                                    alignSelf: 'center',
                                    marginTop: 5,
                                    marginBottom: 5,
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#dc166c',
                                }}>
                                <SportsSoccerIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Football"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Header
                    position="relative"
                    button1={false}
                    button2={false}
                    button3={{ show: true, title: 'Logout' }}
                />
                {showHome ? <Home /> : null}
                {showCrypto ? <Crypto /> : null}
                {showCricket ? <Cricket /> : null}
            </Box>
        </Box>
    );
};

export default Dashboard;
