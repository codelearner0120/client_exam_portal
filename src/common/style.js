import { makeStyles } from "@material-ui/core";
import { height } from "@mui/system";

export const useSignInStyles=makeStyles((theme)=>({
    // root:{
    //     marginTop:'20px',
    //     height:'80vh',
    //     justifyContent:'center'
    // },
    // image:{
    //     backgroundImage:'',
    //     backgroundRepeat:'no-repeat',
    //     backgroundColor:
    //     theme.palette.type==='light'?theme.palette.grey[50] : theme.palette.grey[900],
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center'
    // },
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    avatar:{
        margin:theme.spacing(1),
        backgroundColor:theme.palette.secondary.main,
    },
    form:{
        width:'100%',
        marginTop:theme.spacing(1)
    },
    submit:{
        margin:theme.spacing(3,0,2)
    }
}))