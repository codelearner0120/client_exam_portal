import React from 'react';
import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import useStyle from '../Styles/MenuStyles';
import { CssBaseline } from '@mui/material';
import Menu from "@material-ui/core/Menu";
import classNames from "classnames";
import clsx from 'clsx';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Drawer } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Divider } from '@mui/material';
import { Home } from '@mui/icons-material'

function Appbar() {
    const history = useNavigate()
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const classes = useStyle()

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        return history('/login');
    }
    const handleRegister = () => {
        return history('/register')
    }

    return (
        <>
            {/* <Box sx={{ flexGrow: 1 }}> */}
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    // className={classes.appBar}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={true}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            className={classes.menuButton}
                        >
                            <MenuIcon
                                classes={{
                                    root: open
                                        ? classes.menuButtonIconOpen
                                        : classes.menuButtonIconClosed
                                }}
                            />
                        </IconButton>
                        <Typography variant="h6"
                            color="inherit"
                            className={classes.grow}
                            noWrap>
                            Quiz Portal For geeks
                        </Typography>
                        {/* <Button color="inherit" onClick={handleLogin}>Login</Button>
                        <Button color='inherit' onClick={handleRegister}>Register</Button> */}
                    </Toolbar>
                    </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })
                    }}
                    open={open}
                >
                    <div className={classes.toolbar} />
                    <List>
                        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <Home /> : <Home />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <Home /> : <Home />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                {/* <LeftMenu open={open} setOpen={setOpen} /> */}
            </div>
            {/* </Box> */}
        </>
    );
}

export default Appbar;
