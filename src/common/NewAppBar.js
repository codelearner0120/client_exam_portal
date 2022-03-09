import React, { useState } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar } from "@mui/material";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { style } from "../Styles/MenuStyles";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import LeftMenu from "./LeftMenu";
import { useAgent } from "../Forms/useAgent";
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

function NewAppBar(props) {
    const history = useNavigate()
    const userInfo=useAgent();
    const isLoggedIn=userInfo.isLoggedIn();
    const [state, setState] = useState({
        open: false
    });

    const handleDrawerOpen = () => {
        setState({ open: !state.open });
    };

    const handleLogin = () => {
        return history('/login');
    }
    const handleRegister = () => {
        return history('/register')
    }

    const { classes } = props;
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={classes.appBar}
                foojon={classNames(classes.appBar, {
                    [classes.appBarShift]: state.open
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
                                root: state.open
                                    ? classes.menuButtonIconOpen
                                    : classes.menuButtonIconClosed
                            }}
                        />
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                        noWrap
                    >
                        Quiz Portal for geeks
                    </Typography>
                    {!isLoggedIn&&
                    <>
                    <Button color="inherit" onClick={handleLogin}>Login</Button>
                    <Button color='inherit' onClick={handleRegister}>Register</Button>
                    </>
                    }
                    {
                        isLoggedIn&&
                        <Avatar sx={{ bgcolor: deepOrange[500] ,marginRight:'5px'}}>A</Avatar>
                    }       
                </Toolbar>
            </AppBar>
            <LeftMenu open={state.open} />
        </div>
    );
}



// export default withStyles(styles, { withTheme: true })(MiniDrawer);
export default withStyles(style)(NewAppBar);
