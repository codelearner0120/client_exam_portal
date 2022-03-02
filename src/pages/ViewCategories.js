import React from 'react'
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { categoryData } from '../Data/quiz'
import { RegularButton } from '../common/Buttons'

function ViewCategories() {
    const addcategory=()=>{
        
    }
    return (
        <>
            <Accordion expanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h4>All categories</h4>
                </AccordionSummary>

            </Accordion>
            {
                categoryData.map(({ title, description }, index) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>{title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {description}
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
        </>
    )
}

export default ViewCategories