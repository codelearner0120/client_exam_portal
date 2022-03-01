import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useStyle from "../Styles/MenuStyles";
import { style } from "../Styles/MenuStyles";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
const drawerWidth = 250;

function NewAppBar(props) {
    const history = useNavigate()
    const [state, setState] = useState({
        open: false
    });

    const handleDrawerOpen = () => {
        setState({ open: !state.open });
    };

    const handleDrawerClose = () => {
        setState({ open: false });
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
                    <Button color="inherit" onClick={handleLogin}>Login</Button>
                    <Button color='inherit' onClick={handleRegister}>Register</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: state.open,
                    [classes.drawerClose]: !state.open
                })}
                classes={{
                    paper: classNames({
                        [classes.drawerOpen]: state.open,
                        [classes.drawerClose]: !state.open
                    })
                }}
                open={state.open}
            >
                <div className={classes.toolbar} />
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1>This is DashBoard</h1>
                <Typography paragraph>foosd</Typography>
            </main>
        </div>
    );
}



// export default withStyles(styles, { withTheme: true })(MiniDrawer);
export default withStyles(style)(NewAppBar);
