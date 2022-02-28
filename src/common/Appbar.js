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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { EmailOutlined } from '@mui/icons-material';
import LeftMenu from './LeftMenu';


function Appbar() {
    const history = useNavigate()
    const [toggle, setToggle] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleLogin = () => {
        return history('/login');
    }
    const handleRegister = () => {
        return history('/register')
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
                            Quiz Portal For geeks
                        </Typography>
                        <LeftMenu isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
                        <Button color="inherit" onClick={handleLogin}>Login</Button>
                        <Button color='inherit' onClick={handleRegister}>Register</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Appbar;
