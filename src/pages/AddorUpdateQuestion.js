import React, { useEffect, useState } from 'react'
import { Container, Grid, CssBaseline, Paper, TextField } from '@mui/material';
import Notification from '../common/Notification';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { RegularButton } from '../common/Buttons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAgent } from '../Forms/useAgent'
import axios from 'axios'
import { QUESTION } from '../common/ApiEndPoints'

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
function AddorUpdateQuestion(props) {
  const classes = useStyles();
  const location = useLocation();
  const navigation = useNavigate()
  let quizId = location.pathname.split('/').pop();
  const requestHeader = useAgent().authToken()
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
  const [question, setQuestion] = useState({
    quesId: '',
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {
      quizId: quizId
    }
  })
  const optionList = [question.option1, question.option2, question.option3, question.option4]
  useEffect(() => {
    if (props.update === false) return;
    let urlSplit = location.pathname.split('/')
    let quesId = urlSplit[urlSplit.length - 3]
    setQuestion({ ...question, [quesId]: quesId })
    let url = QUESTION + quesId
    axios.get(url, { headers: requestHeader }).then(res => {
      setQuestion(res.data)
    })
  }, [])

  const updateQuestion = () => {
    axios.put(QUESTION, question, { headers: requestHeader }).then(res => {
      setNotification({ open: true, msg: "Question updated Sucsessfully!", type: "success", hideDuration: 3000 })
      navigation(-1)
    }).catch(error => {
      setNotification({ open: true, msg: "Something went wrong", type: "error", hideDuration: 3000 })
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (props.update) {
      updateQuestion();
      return;
    }
    let questionObject = Object.keys(question).
      filter((key) => key !== 'quesId').
      reduce((cur, key) => { return Object.assign(cur, { [key]: question[key] }) }, {});
    console.log(questionObject)
    axios.post(QUESTION, questionObject, { headers: requestHeader }).then(res => {
      if (res.status === 200) {
        console.log('everything okkk')
        setNotification({ open: true, msg: "Question added Sucsessfully!", type: "success", hideDuration: 3000 })
        navigation(-1)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setQuestion({
      ...question,
      [name]: value
    })
  }

  return (
    <Container component={Paper} maxWidth="sm" elevation={3}>
      <Notification notification={notification} setNotification={setNotification} />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" sx={{ marginTop: '5px' }}>
          Add Question
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={question.content}
            onChange={handleChange}
            id="content"
            label="Question"
            name="content"
            autoComplete="content"
            autoFocus
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="option1"
              value={question.option1}
              onChange={handleChange}
              label="Option-1"
              name="option1"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="option2"
              value={question.option2}
              onChange={handleChange}
              label="Option-2"
              name="option2"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="option3"
              label="Option-3"
              value={question.option3}
              onChange={handleChange}
              name="option3"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="option4"
              value={question.option4}
              onChange={handleChange}
              label="Option-4"
              name="option4"
            />
          </div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Answer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Answer"
              name='answer'
              value={question.answer}
              onChange={handleChange}
            >
              {
                optionList.map((option, index) => {
                  return <MenuItem value={option}>{option}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          <RegularButton type="submit" sx={{ marginTop: '15px' }}>Add</RegularButton>
        </form>
      </div>
    </Container>
  )
}

export default AddorUpdateQuestion