/* eslint-disable react/prop-types */
// src/pages/Home.js
import { useState } from 'react';
import {
    Typography,
    Button,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { getAdminValueCookies } from '../helper/cookies';
import { onLogout } from '../Authentication/auth';
const drawerWidth = 240;

const Layout = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(true);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {getAdminValueCookies() === true ? (
                <List>
                    <ListItem button component={Link} to="/Post">
                        <ListItemText primary="Post" />
                    </ListItem>
                    <ListItem button component={Link} to="/User">
                        <ListItemText primary="User" />
                    </ListItem>
                </List>
            ) : (
                <List>
                    <ListItem button component={Link} to="/Post">
                        <ListItemText primary="Post" />
                    </ListItem>
                </List>
            )}
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(false)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/logout"
                        startIcon={<LogoutIcon />}
                        onClick={() => {
                            onLogout();
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ backgroundColor: 'whitesmoke' }}
            >
                {drawerList()}
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    padding: 10,
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
