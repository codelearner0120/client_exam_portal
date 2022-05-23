import React, { useEffect, useState } from 'react'
import { Accordion, Paper, Typography, AccordionDetails, Grid, Container } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { categoryData } from '../Data/quiz'
import { RegularButton, DeleteButton } from '../common/Buttons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAgent } from '../Forms/useAgent'
import { CATEGORY } from '../common/ApiEndPoints'
import Notification from '../common/Notification'
import Popup from '../common/Popup'

function ViewCategories() {
    const navigation = useNavigate();
    const [category, setCategory] = useState([]);
    const userInfo = useAgent();
    const [open, setOpen] = useState(false)
    const requestHeader = userInfo.authToken()
    const [selectedOption, setSelectedOption] = useState(null);
    const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
    const addcategory = () => {
        navigation("/addcategory")
    }
    let url = CATEGORY
    let token = userInfo.getJwtToken();
    const getAllCategories=()=>{
        axios.get(url, { headers: userInfo.authToken() }).then(res => {
            setCategory(res.data)
            console.log(res.data)
        }).catch(error => {
            alert('error found!');
        })
    }
    useEffect(() => {
        getAllCategories()
    }, [])
    const handleClose = () => { setOpen(false) }
    const handleDelete = () => {
        console.log('sending for delection!!')
        console.log(selectedOption)
        setOpen(false)
        let url=CATEGORY+selectedOption.cid;
        console.log(url)
        axios.delete(url,{headers:requestHeader}).then(res=>{
            setNotification({open:true,type:'success',msg:'Category deleted successfully!',hideDuration:3000})
            getAllCategories();
        }).catch(error=>{
            setNotification({open:true,type:'error',msg:'something went wrong!',hideDuration:3000})
        })
    }
    const handleCategoryDelete = (category) => {
        console.log(category)
        setSelectedOption(category)
        setOpen(true)
    }

    const CategoryCard = ({ category }) => {
        return (
            <Container component={Paper} maxWidth="md" elevation={1} sx={{ marginTop: '5px' }} >
                <div style={{ display: 'flex', marginLeft: '5px', marginBottom: '5px', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ color: 'Highlight' }}>{category.title}</div>
                    <div style={{ color: 'GrayText' }}>{category.description}</div>
                </div>
                <RegularButton sx={{ marginRight: '10%', marginBottom: '10px' }}
                    onClick={() => {navigation("/updatecategory/"+category.cid)}}
                >Update</RegularButton>
                <DeleteButton sx={{ marginLeft: '10%', marginBottom: '10px' }}
                    onClick={() => {
                        handleCategoryDelete(category)
                    }}
                >Delete</DeleteButton>
            </Container>
        )
    }
    return (
        <>
            <Container maxWidth="md" component={Paper} elevation={1}>
                {open && <Popup
                    open={open}
                    handleOk={handleDelete}
                    body={<div>Are you sure, You want to delete this category?</div>}
                    handleClose={handleClose}
                />}
                <Notification notification={notification} setNotification={setNotification} />
                <Typography variant='h4'>All Categories</Typography>
                {
                    category.map(category => {
                        return <CategoryCard category={category}></CategoryCard>
                    })
                }
                <RegularButton
                    style={{ marginTop: '20px', marginBottom: '5px' }}
                    onClick={addcategory}
                >
                    Add category</RegularButton>
            </Container>
        </>
    )
}

export default ViewCategories