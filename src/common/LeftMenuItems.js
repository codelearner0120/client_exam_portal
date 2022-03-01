import * as path from './path'
import { Home,Quiz,UpcomingIcon,ExitToApp } from '@mui/icons-material'
import { ListItemIcon,List,ListItem,ListItemText} from '@mui/material';
import { AddBox } from '@material-ui/icons';

const leftMenu=[
    {
        name:'Home',
        icon:<Home/>
    },
    {
        name:'Quiz',
        icon:<Quiz/>
    },
    {
        name:'Add quiz',
        icon:<AddBox/>
    },
    {
        name:'Logout',
        icon:<ExitToApp />
    }
]

export default function LeftMenuItems(){
    return(
        <List>
            {leftMenu.map((text, index) => (
              <ListItem button key={text.name}>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            ))}
        </List>
    )
}