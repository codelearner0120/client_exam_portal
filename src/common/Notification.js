import { IconButton, Snackbar } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

function Notification(props) {
  return (
      <>
      <Snackbar
      open={props.notification.open}
      autoHideDuration={props.notification.hideDuration}
      anchorOrigin={{
          vertical:'top',
          horizontal:'center',
          paddingTop:'100px'
      }}
      onClose={()=>props.setNotification({...props.notification,open:false})}
      >
            <Alert severity={props.notification.type}
            action={
                <IconButton aria-label='close' color='inherit' size='small' onClick={()=>props.setNotification({...props.notification,open:false})}>
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={{mb:2}}>
                {props.notification.msg}<strong>{props.notification.strongMsg}</strong>
            </Alert>
      </Snackbar>
      </>
  );
}

export default Notification;
