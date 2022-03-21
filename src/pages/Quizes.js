import { Container, Paper, Grid } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import Card from '@mui/material/Card';
import { quizData } from '../Data/quiz'
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';
import AddQuiz from './AddQuiz'
import { useNavigate } from 'react-router-dom';
import { QUIZ } from '../common/ApiEndPoints';
import axios from 'axios';
import { useAgent } from '../Forms/useAgent';
import Notification from '../common/Notification';



function Quizes() {
  const [allQuiz,setAllQuiz]=useState([])
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
  const userInfo=useAgent();

  useEffect(() => {
    axios.get(QUIZ,{headers:userInfo.authToken()}).then(response=>{
      setAllQuiz(response.data)
    })
  }, [])

  const handleDeleteQuiz=(e)=>{
    let url=QUIZ+e.toString()
    axios.delete(url,{headers:userInfo.authToken()}).then(response=>{
      setNotification({open:true,msg:"deleted quiz successfully!",type:"success",hideDuration:3000})
      window.location.reload()
    }).catch(error=>{
      setNotification({open:true,msg:"Something went wrong!",type:"error",hideDuration:3000})
    })
  }

  const QuizCard = ({ quiz }) => {
    const path=useNavigate()
    const [checked,setChecked]=useState(false)
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
          <Button size="small" variant='contained' onClick={
            ()=>{path("/questions/quiz/"+quiz.quizId.toString())}
          }>Questions </Button>
          <Button size="small">Max Marks :{quiz.maxMarks}</Button>
          <Button size='small'> Published
          <Switch
            checked={checked}
            onChange={()=>{setChecked(!checked)}}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          </Button>
          <Button size="small">Question :{quiz.noOfQuestion}</Button>
          <Button variant='contained' 
            onClick={(e)=>{path('/addquiz')}}
          >Update</Button>
          <Button variant='contained' onClick={()=>{handleDeleteQuiz(quiz.quizId)}} color='error'>
            DELETE</Button>
        </CardActions>
      </Card>
    )
  }
  return (
    <>
      <Container maxWidth="md">
      <Notification notification={notification} setNotification={setNotification} />
        <Grid container direction='column' spacing={1}>
          {
            allQuiz.map((quiz, index) => {
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