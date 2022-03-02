import * as path from './path'
import { Home,Quiz,UpcomingIcon,ExitToApp, Category, Queue } from '@mui/icons-material'
import { ListItemIcon,List,ListItem,ListItemText} from '@mui/material';
import { AddBox } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

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
    },
    {
        name:'Logout',
        path:'logout',
        icon:<ExitToApp />
    },
]

export default function LeftMenuItems(){
    const url=useNavigate();
    const redirect=(path)=>{
        url('/'+path)
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
        </List>
    )
}