import { Container, CssBaseline, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Notification from '../common/Notification'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { TextareaAutosize } from '@mui/material'
import { RegularButton } from '../common/Buttons'
import axios from 'axios'
import { CATEGORY } from '../common/ApiEndPoints'
import { useAgent } from '../Forms/useAgent'
import { useLocation, useNavigate } from 'react-router-dom'
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
        marginBottom: theme.spacing(2)
    },
}))
function AddCategory(props) {
    const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
    const classes = useStyles();
    const requestHeader = useAgent().authToken()
    const navigation = useNavigate()
    const userInfo = useAgent()
    const location = useLocation()
    const [category, setCategory] = useState({
        cid: '',
        title: '',
        description: ''
    })

    useEffect(() => {
        if (props.update) {
            let urlSplit = location.pathname.split("/");
            let cid = urlSplit[urlSplit.length - 1];
            let url = CATEGORY + cid;
            axios.get(url, { headers: requestHeader }).then(res => {
                setCategory(res.data);
            });
            setCategory({ ...category, [cid]: cid })
            console.log(category)
        }
    }, []);
    const updateCategory = () => {
        axios.put(CATEGORY, category, { headers: requestHeader }).then(res => {
            setNotification({ open: true, msg: "Category updated Sucsessfully!", type: "success", hideDuration: 3000 })
            setTimeout(() => {
                navigation(-1)
            }, 1000)
        }).catch(error => {
            setNotification({ open: true, msg: "Something went wrong", type: "error", hideDuration: 3000 })
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setCategory({
            ...category,
            [name]: value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (props.update) {
            updateCategory();
            return;
        }
        let url = CATEGORY;
        let token = userInfo.getJwtToken();
        axios.post(url, category, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
            setNotification({ open: true, msg: "category added succesfully!", type: 'success', hideDuration: 3000 })
            window.location.reload()
        }).catch(error => {
            setNotification({ open: true, msg: "Something went wrong!", type: 'error', hideDuration: 3000 })
        })
    }
    return (
        <Container component={Paper} maxWidth="sm" elevation={3}>
            <CssBaseline />
            <Notification notification={notification} setNotification={setNotification} />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {props.update ? "Update Category" : "Add Category"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        value={category.title}
                        onChange={handleChange}
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
                        value={category.description}
                        onChange={handleChange}
                        label="Description"
                        name="description"
                        autoComplete="description"
                        minRows={3}
                        multiline={true}
                    />
                    <RegularButton type="submit">{props.update ? "Update" : "Add"}</RegularButton>
                </form>
            </div>
        </Container>
    )
}

export default AddCategory