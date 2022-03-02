import { Container, CssBaseline, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import Notification from '../common/Notification'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { TextareaAutosize } from '@mui/material'
import { RegularButton } from '../common/Buttons'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom:theme.spacing(2)
    },
}))
function AddCategory() {
    const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
    const classes = useStyles();
    const handleSubmit=(event)=>{
        event.preventDefault();
        const newCatogery=new FormData(event.currentTarget);
        alert("clicked "+newCatogery.get('title'))
    }
    return (
        <Container component={Paper} maxWidth="sm" elevation={3}>
            <Notification notification={notification} setNotification={setNotification} />
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add Category
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                    />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        minRows={3}
                        multiline={true}
                        autoFocus
                    />
                    <RegularButton type="submit">Add</RegularButton>
                </form>
            </div>
        </Container>
    )
}

export default AddCategory