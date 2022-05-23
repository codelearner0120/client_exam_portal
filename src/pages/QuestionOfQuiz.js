import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QUESTION_OF_QUIZ, QUIZ, QUESTION } from '../common/ApiEndPoints';
import { useAgent } from '../Forms/useAgent';
import { Container, Grid, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import Notification from '../common/Notification';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';
import { DeleteButton, RegularButton } from '../common/Buttons';
import Popup from '../common/Popup';
import AddorUpdateQuestion from './AddorUpdateQuestion';

function QuestionOfQuiz() {
  const userInfo = useAgent();
  const location = useLocation();
  let quizId = location.pathname.split('/').pop();
  const path = useNavigate()
  const [open, setOpen] = useState(false)
  const [selectedOption,setSelectedOption]=useState(null)
  const requestHeader = userInfo.authToken();
  const [questionList, setQuestionList] = useState([])
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
  useEffect(() => {
    getAllQuestionOfQuiz()
  }, [])
  const getAllQuestionOfQuiz = () => {
    axios.get(QUESTION_OF_QUIZ + quizId, {
      headers: requestHeader
    }).then(res => {
      setQuestionList(res.data)
    }).catch(error => {
      console.log('errors find!')
    })
  }

  const handleClose = () => setOpen(false)
  const updateQuestion = (quesId) => {
    let updateQuestionUrl = "/updatequestion/" + quesId + "/quiz/" + quizId;
    path(updateQuestionUrl)
  }
  const addQuestion = () => {

  }
  const handleAddQuestion = () => {
    path("/addquestion/quiz/" + quizId)
  }
  const deleteQuestion = () => {
    let url = QUESTION + selectedOption
    axios.delete(url, { headers: requestHeader }).then(response => {
      setNotification({open:true,msg:"question deleted succesfully",type:'success',hideDuration:3000})
      getAllQuestionOfQuiz()
      setOpen(false)
    }).catch(error => {
      setNotification({open:true,msg:"Something went wrong!",type:'error',hideDuration:3000})
    })
  }
  const QuestionCard = ({ question }) => {
    return (
      <Container component={Paper} maxWidth="md" elevation={1}>
        <div style={{ display: 'flex', marginLeft: '5px', marginBottom: '5px', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 'bold' }}>{question.content}</div>
          <div>1. {question.option1}</div>
          <div>2. {question.option2}</div>
          <div>3. {question.option3}</div>
          <div>4. {question.option4}</div>
        </div>
        <RegularButton sx={{ marginRight: '10%', marginBottom: '10px' }}
          onClick={() => { updateQuestion(question.quesId) }}
        >Update</RegularButton>
        <DeleteButton sx={{ marginLeft: '10%', marginBottom: '10px' }}
          onClick={() => {setOpen(true); setSelectedOption(question.quesId) }}
        >Delete</DeleteButton>
      </Container>
    )
  }

  return (
    <>
      <Container maxWidth="md">
        <Notification notification={notification} setNotification={setNotification} />
        {open && <Popup
          open={open}
          handleOk={deleteQuestion}
          body={<div>Are You sure,you want to delete this question?</div>}
          handleClose={handleClose}
        />}
        <Grid container direction='column' spacing={1}>
          {
            questionList.map((question, index) => {
              return (
                <Grid item>
                  <QuestionCard question={question}></QuestionCard>
                </Grid>
              )
            })
          }
        </Grid>
        <RegularButton sx={{ marginTop: '5px' }} onClick={handleAddQuestion}>Add Question</RegularButton>
      </Container>
    </>
  )
}

export default QuestionOfQuiz