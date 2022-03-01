import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Drawer } from '@mui/material';
import useStyle from '../Styles/MenuStyles';
import { ListItemIcon} from '@mui/material';
import { Divider,Typography } from '@mui/material';
import {Home} from '@mui/icons-material'
import classNames from 'classnames';
import DashBoard from '../DashBoards/DashBoard'
function LeftMenu(props) {
    const classes = useStyle()
    const {open, setOpen}=props;
    return(
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: classNames({
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
    // <main className={classes.content}>
    //       <div className={classes.toolbar} />
    //       <DashBoard />
    //       <Typography paragraph>foo</Typography>
    //     </main>
    // </>
    )
}

export default LeftMenu