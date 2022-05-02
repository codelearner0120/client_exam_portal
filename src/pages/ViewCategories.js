import React, { useEffect, useState } from 'react'
import { Accordion, Paper, Typography, AccordionDetails, Grid, Container } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { categoryData } from '../Data/quiz'
import { RegularButton,DeleteButton } from '../common/Buttons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAgent } from '../Forms/useAgent'
import { CATEGORY } from '../common/ApiEndPoints'

function ViewCategories() {
    const navigation = useNavigate();
    const [category, setCategory] = useState([]);
    const userInfo = useAgent();
    const requestHeader=userInfo.authToken()
    const addcategory = () => {
        navigation("/addcategory")
    }
    let url = CATEGORY
    let token = userInfo.getJwtToken();
    useEffect(() => {
        axios.get(url, { headers: userInfo.authToken() }).then(res => {
            setCategory(res.data)
            console.log(res.data)
        }).catch(error => {
            alert('error found!');
        })
    }, [])
    const handleDelete=(category)=>{
        axios.delete(CATEGORY,{headers:requestHeader})
    }

    const CategoryCard = ({ category }) => {
        console.log(category)
        return (
            <Container component={Paper} maxWidth="md" elevation={1} sx={{marginTop:'5px'}} >
                <div style={{ display: 'flex', marginLeft: '5px', marginBottom: '5px', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ color: 'Highlight' }}>{category.title}</div>
                    <div style={{ color: 'GrayText' }}>{category.description}</div>
                    </div>
                    <RegularButton sx={{ marginRight: '10%', marginBottom: '10px' }}
                        onClick={() => {}}
                    >Update</RegularButton>
                    <DeleteButton sx={{ marginLeft: '10%', marginBottom: '10px' }}
                        onClick={() => {handleDelete(category)}}
                    >Delete</DeleteButton>
            </Container>
        )
    }
    return (
        <>
            <Container maxWidth="md" component={Paper} elevation={1}>
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