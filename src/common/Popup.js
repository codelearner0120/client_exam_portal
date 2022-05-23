import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({open,body,title,handleClose,okButtonName,
  closeButtonName,handleOk,handleCancel}) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {body}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel||handleClose}>{closeButtonName||'cancel'}</Button>
          <Button onClick={handleOk||handleClose} autoFocus>{okButtonName||'ok'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
