import * as path from './path'
import { Home,Quiz,UpcomingIcon,ExitToApp, Category, Queue } from '@mui/icons-material'
import { ListItemIcon,List,ListItem,ListItemText} from '@mui/material';
import { AddBox } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import { useAgent } from '../Forms/useAgent';

const leftMenu=[
    {
        name:'Home',
        path:'home',
        icon:<Home/>
    },
    {
        name:'Profile',
        path:'profile',
        icon:<AccountCircle />
    },
    {
        name:'Quiz',
        path:'quiz',
        icon:<Quiz/>
    },
    {
        name:'Add quiz',
        path:'addquiz',
        icon:<AddBox/>
    },
    {
        name:'category',
        path:'categories',
        icon:<Category/>
    },
    {
        name:'Add category',
        path:'addcategory',
        icon:<Queue />
    }
]

export default function LeftMenuItems(){
    const url=useNavigate();
    const userInfo=useAgent();
    const redirect=(path)=>{
        url('/'+path)
    }
    const logOut=()=>{
        userInfo.logout();
        url(path.BASE)
    }
    return(
        <List>
            {leftMenu.map((text, index) => (
              <ListItem button key={text.name} onClick={()=>redirect(text.path)}>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            ))}
            <ListItem button >
                <ListItemIcon>
                    <ExitToApp />
                </ListItemIcon>
                <Button variant='contained' 
                color='secondary' 
                size='small'
                onClick={logOut}
                >Logout</Button>
            </ListItem>
        </List>
    )
}