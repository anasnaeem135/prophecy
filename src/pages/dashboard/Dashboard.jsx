import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

import Home from './components/home/home';
import Crypto from './components/crypto/crypto';
import Football from './components/football/football';
import Cricket from './components/cricket/cricket';
import useUserStore from 'stores/userStore';
import Header from 'components/header/header';
import Advertisment from './components/advertisment/advertisment';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    hiddenScroll: {
        overflowX: 'hidden',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0.4em',
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
        },
        display: 'flex',
        flex: 1,
    },
}));

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
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [showHome, setShowHome] = useState(true);
    const [showCrypto, setShowCrypto] = useState(false);
    const [showCricket, setShowCricket] = useState(false);
    const [showAdvertisment, setShowAdvertisment] = useState(false);
    const [showFootball, setShowFootball] = useState(false);

    const handleClickHome = () => {
        setShowHome(true);
        setShowCricket(false);
        setShowCrypto(false);
        setShowAdvertisment(false);
        setShowFootball(false);
    };

    const handleClickCrypto = () => {
        setShowCrypto(true);
        setShowHome(false);
        setShowCricket(false);
        setShowAdvertisment(false);
        setShowFootball(false);
    };

    const handleClickCricket = () => {
        setShowCrypto(false);
        setShowHome(false);
        setShowCricket(true);
        setShowAdvertisment(false);
        setShowFootball(false);
    };

    const handleClickAdvertisment = () => {
        setShowCrypto(false);
        setShowHome(false);
        setShowCricket(false);
        setShowAdvertisment(true);
        setShowFootball(false);
    };

    const handleClickFootball = () => {
        setShowCrypto(false);
        setShowHome(false);
        setShowCricket(false);
        setShowAdvertisment(false);
        setShowFootball(true);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogoutUser = () => {
        useUserStore.setState({ user: null });
        navigate('/', { replace: true });
    };

    const classes = useStyles();

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

                <List className={classes.hiddenScroll}>
                    <ListItem
                        disablePadding
                        sx={{
                            display: 'block',
                            flexDirection: 'column',
                            alignContent: 'space-evenly',
                        }}>
                        <ListItemButton
                            onClick={handleClickHome}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                height: '20%',
                            }}>
                            <ListItemIcon
                                sx={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    color: '#dc166c',
                                }}>
                                <AccountCircleIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Dashboard"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>

                        <ListItemButton
                            onClick={handleClickCrypto}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                height: '20%',
                            }}>
                            <ListItemIcon
                                sx={{
                                    alignSelf: 'center',
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    color: '#dc166c',
                                }}>
                                <CurrencyBitcoinIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Cryptocurrency"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>

                        <ListItemButton
                            onClick={handleClickCricket}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                height: '20%',
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    color: '#dc166c',
                                }}>
                                <SportsCricketIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Cricket"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>

                        <ListItemButton
                            onClick={handleClickFootball}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                height: '20%',
                            }}>
                            <ListItemIcon
                                sx={{
                                    // marginTop: 5,
                                    // marginBottom: 5,
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    color: '#dc166c',
                                }}>
                                <SportsSoccerIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Football"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>

                        <ListItemButton
                            onClick={handleClickAdvertisment}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                height: '20%',
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    color: '#dc166c',
                                }}>
                                <FeaturedVideoIcon />
                            </ListItemIcon>

                            <ListItemText
                                primary="Advertisment"
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
                    onClick3={handleLogoutUser}
                />
                {showHome ? <Home /> : null}
                {showCrypto ? <Crypto /> : null}
                {showCricket ? <Cricket /> : null}
                {showFootball ? <Football /> : null}
                {showAdvertisment ? <Advertisment /> : null}
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Dashboard;
