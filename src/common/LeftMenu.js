import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles,Drawer } from '@mui/material';

const useStyles = makeStyles({
    drawer: {
        zIndex:200,
        width: 250
    }
});

function LeftMenu(props) {
    const classes = useStyles()
    const [isDrawerOpen, setIsDrawerOpen]=[props.isDrawerOpen,props.setIsDrawerOpen]
    return(
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List className={classes.drawer}>
            <ListItem button>
                <ListItemText primary="Home" />
            </ListItem>

            <ListItem button>
                <ListItemText primary="About" />
            </ListItem>

            <ListItem button>
                <ListItemText primary="Contact" />
            </ListItem>

            <ListItem button>
                <ListItemText primary="Services" onClick={()=>alert('service')} />
            </ListItem>
        </List>
    </Drawer>
    )
}

export default LeftMenu