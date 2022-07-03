import * as path from './path'
import { Home,Quiz,UpcomingIcon,ExitToApp, Category, Queue,Help,Timeline} from '@mui/icons-material'
import { ListItemIcon,List,ListItem,ListItemText} from '@mui/material';
import { AddBox } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Button } from '@material-ui/core';
import { useAgent } from '../Forms/useAgent';
import { useEffect,useState } from 'react';

const leftMenu=[
    {
        name:'Home',
        path:'home',
        icon:<Home/>,
        access:['NORMAL','ADMIN']
    },
    {
        name:'Profile',
        path:'profile',
        icon:<AccountCircle />,
        access:['NORMAL','ADMIN']
    },
    {
        name:'Quiz',
        path:'quiz',
        icon:<Quiz/>,
        access:['NORMAL','ADMIN']
    },
    {
        name:'Add quiz',
        path:'addquiz',
        icon:<AddBox/>,
        access:['ADMIN']
    },
    {
        name:'category',
        path:'categories',
        icon:<Category/>,
        access:['NORMAL','ADMIN']
    },
    {
        name:'Add category',
        path:'addcategory',
        icon:<Queue />,
        access:['ADMIN']
    },
    {
        name:'Progress',
        path:'progress',
        icon:<Timeline />,
        access:['NORMAL']
    },
    {
        name:'Help',
        path:'help',
        icon:<Help />,
        access:['NORMAL']
    }
]

export default function LeftMenuItems(){
    const url=useNavigate();
    const {logout,isAuthorized,isLoggedIn}=useAgent();
    let isLogged=isLoggedIn()
    const [leftBar,setLeftBar]=useState([])
    const refreshLeftMenu=()=>{
        console.log(isLogged)
        let new_menu=leftMenu.filter(item=>{
            let authorize=isAuthorized(item.access);
            return authorize;
        })
        console.log(new_menu)
        setLeftBar(new_menu)
    }
    useEffect(()=>{
        refreshLeftMenu()
    },[isLogged])
    const redirect=(path)=>{
        url('/'+path)
    }
    const logOut=()=>{
        logout();
        url(path.BASE)
        refreshLeftMenu()
    }
    return(
        <List>
            {leftBar.map((text, index) => (
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