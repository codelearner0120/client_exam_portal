import { Container, Paper, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import { quizData } from '../Data/quiz'
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';
import AddQuiz from './AddOrUpdateQuiz'
import { useNavigate } from 'react-router-dom';
import { QUIZ } from '../common/ApiEndPoints';
import axios from 'axios';
import { useAgent } from '../Forms/useAgent';
import Notification from '../common/Notification';
import Popup from '../common/Popup';
import AuthorisedComponent from '../common/AuthorisedComponent'
import * as portal_roles from '../common/CommonConstants'

let marks_per_question = 5;

function Quizes() {
  const [allQuiz, setAllQuiz] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
  const userInfo = useAgent();
  const path = useNavigate()
  const handleClose = () => setOpen(false)
  useEffect(() => {
    axios.get(QUIZ, { headers: userInfo.authToken() }).then(response => {
      setAllQuiz(response.data)
    })
  }, [])

  const handleUpdateQuiz = (quiz) => {
    let updatationUrl = "update/" + quiz.quizId
    console.log(updatationUrl)
    path(updatationUrl)
  }
  const handleDeleteQuiz = () => {
    let url = QUIZ + selectedQuiz.toString()
    axios.delete(url, { headers: userInfo.authToken() }).then(response => {
      setNotification({ open: true, msg: "deleted quiz successfully!", type: "success", hideDuration: 3000 })
      window.location.reload()
    }).catch(error => {
      setNotification({ open: true, msg: "Something went wrong!", type: "error", hideDuration: 3000 })
    })
  }

  const QuizCard = ({ quiz }) => {
    const path = useNavigate()
    const [checked, setChecked] = useState(false)
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color={'CaptionText'} align='left' >
            {quiz.title}
            <Typography variant="subtitle2" color={'GrayText'} align='left'>
              {quiz.category.title}
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" align='left'>
            {quiz.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container sx={{ justifyContent: 'center' }}>
            <AuthorisedComponent roles={[portal_roles.ADMIN_ROLE]}>
              <Grid item xs={12} sm={6} md={4}>
                <Button size="small" variant='contained' onClick={
                  () => { path("/questions/quiz/" + quiz.quizId.toString()) }
                }>Questions </Button>
              </Grid>
            </AuthorisedComponent>
            <AuthorisedComponent roles={[portal_roles.USER_ROLE]}>
              <Grid item xs={12} sm={6} md={4}>
                <Button variant='contained'
                  onClick={() => { path("/startquiz/"+quiz.quizId.toString()) }}
                >Start Quiz</Button>
              </Grid>
            </AuthorisedComponent>
            <AuthorisedComponent roles={[portal_roles.ADMIN_ROLE]}>
              <Grid item xs={12} sm={6} md={4}>
                <Button variant='contained'
                  onClick={() => { handleUpdateQuiz(quiz) }}
                >Update</Button>
              </Grid>
            </AuthorisedComponent>
            <AuthorisedComponent roles={[portal_roles.ADMIN_ROLE]}>
              <Grid item xs={12} sm={6} md={4}>
                <Button variant='contained' onClick={() => { setOpen(true); setSelectedQuiz(quiz.quizId) }} color='error'>
                  DELETE
                </Button>
              </Grid>
            </AuthorisedComponent>
            <AuthorisedComponent roles={[portal_roles.ADMIN_ROLE, portal_roles.USER_ROLE]}>
              <Grid item xs={12} sm={6} md={4}>
                <Button size="small">Max Marks :{Number(quiz.noOfQuestion * quiz.maxMarks)}</Button>
              </Grid>
            </AuthorisedComponent>
            <AuthorisedComponent roles={[portal_roles.ADMIN_ROLE]}>
              <Grid item xs={12} sm={6} md={4}>
                <Button size='small'> Published
                  <Switch
                    checked={checked}
                    onChange={() => { setChecked(!checked) }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Button>
              </Grid>
            </AuthorisedComponent>
            <AuthorisedComponent roles={[portal_roles.ADMIN_ROLE, portal_roles.USER_ROLE]}>
              <Grid item xs={12} sm={6} md={4}>
                <Button size="small">Question :{quiz.noOfQuestion}</Button>
              </Grid>
            </AuthorisedComponent>
          </Grid>
        </CardActions>
      </Card>
    )
  }
  return (
    <>
      <Container maxWidth="md">
        <Notification notification={notification} setNotification={setNotification} />
        {open && <Popup
          open={open}
          handleOk={handleDeleteQuiz}
          body={<div>Are You sure,you want to delete this quiz?</div>}
          handleClose={handleClose}
        />}
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