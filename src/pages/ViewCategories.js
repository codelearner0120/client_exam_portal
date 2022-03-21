import React, { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, Container } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { categoryData } from '../Data/quiz'
import { RegularButton } from '../common/Buttons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL,CATEGORY,ADD_CATEGORY, ALL_CATEGORIES } from '../common/path'
import { useAgent } from '../Forms/useAgent'

function ViewCategories() {
    const navigation=useNavigate();
    const [category,setCategory]=useState([]);
    const userInfo=useAgent();
    const addcategory=()=>{
        navigation("/addcategory")
    }
    let url=BASE_URL+"/"+CATEGORY+"/"+ALL_CATEGORIES;
    let token=userInfo.getJwtToken();
    useEffect(()=>{
          axios.get(url,{ headers: userInfo.authToken() }).then(res=>{
            setCategory(res.data)
            console.log(userInfo.getUser())
        }).catch(error=>{
            alert('error found!');
        })
    },[])
    console.log(category)
    return (
        <>
        <Container maxWidth="md">
            <Accordion expanded={true} >
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h4>All categories</h4>
                </AccordionSummary>

            </Accordion>
            {
                category.map(({ title, description }, index) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>{title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Typography >
                                    <div style={{marginLeft:'5px'}}>{description}</div>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
            <RegularButton 
            style={{marginTop:'20px'}}
            onClick={addcategory}
            >
                Add category</RegularButton>
                </Container>
        </>
    )
}

export default ViewCategories