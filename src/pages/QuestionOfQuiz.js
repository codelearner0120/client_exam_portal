import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { QUESTION_OF_QUIZ, QUIZ } from '../common/ApiEndPoints';
import { useAgent } from '../Forms/useAgent';
import {Container,Grid} from '@mui/material';
import Notification from '../common/Notification';

function QuestionOfQuiz() {
  const userInfo = useAgent();
  const location = useLocation();
  const [questionList,setQuestionList]=useState([])
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
  useEffect(() => {
    let quizId = location.pathname.split('/').pop();
    axios.get(QUESTION_OF_QUIZ + quizId, {
      headers: userInfo.authToken()
    }).then(res => {
      setQuestionList(res.data)
    }).catch(error => {
      console.log('errors find!')
    })
  }, [])


  return (
    <>
      <Container maxWidth="md">
        <Notification notification={notification} setNotification={setNotification} />
        <Grid container direction='column' spacing={1}>
          {
            questionList.map((quiz, index) => {
              return (
                <Grid item>
                <QuestionCard></QuestionCard>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </>
  )
}

export default QuestionOfQuiz