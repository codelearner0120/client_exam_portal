import { Container, Paper, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import Card from '@mui/material/Card';
import { quizData } from '../Data/quiz'
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';

const QuizCard = ({ quiz }) => {
  const [checked,setChecked]=useState(false)
  console.log(checked)
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color={'CaptionText'} align='left' >
          {quiz.title}
          <Typography  variant="subtitle2" color={'GrayText'} align='left'>
          {quiz.category.title}
        </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary" align='left'>
          {quiz.description}
        </Typography>
      </CardContent>
      <CardActions sx={{mt:-2.5}}>
        <Button size="small" variant='contained' >Questions </Button>
        <Button size="small">Max Marks :{quiz.maxMarks}</Button>
        <Button size='small'> Published
        <Switch
          checked={checked}
          onChange={()=>{setChecked(!checked)}}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </Button>
        <Button size="small">Question :{quiz.noOfQuestion}</Button>
        <Button variant='contained'>Update</Button>
      </CardActions>
    </Card>
  )
}

function Quizes() {
  return (
    <>
      <Container maxWidth="md">
        <Grid container direction='column' spacing={1}>
          {
            quizData.map((quiz, index) => {
              return (
                <Grid item>
                  <QuizCard quiz={quiz} key={index} />
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </>
  )
}

export default Quizes