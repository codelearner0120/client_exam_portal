import { Container, CssBaseline, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Notification from '../common/Notification'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { TextareaAutosize } from '@mui/material'
import { RegularButton } from '../common/Buttons'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom'
import {QUIZ,CATEGORY} from '../common/ApiEndPoints'
import { useAgent } from '../Forms/useAgent'

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
function AddQuiz(props) {
  const [notification, setNotification] = useState({ open: false, msg: "Sucsess", type: "success", hideDuration: 3000 })
  const classes = useStyles();
  const location = useLocation();
  const navigation = useNavigate()
  const requestHeader = useAgent().authToken()
  const [category,setCategory]=useState([])
  const [quiz,setQuiz]=useState({
    title:'',
    description:'',
    noOfQuestion:0,
    maxMarks:0,
    category:{
      cid:0
    }
  })
  const userInfo=useAgent();
  const handleChanges = (event) => {
    quiz.category.cid=event.target.value
  };

  useEffect(()=>{
    axios.get(CATEGORY,{
      headers:userInfo.authToken()
    }).then(response=>{
      console.log(response)
      setCategory(response.data)
    })
    if(props.update){
      let urlSplit = location.pathname.split('/');
      let quizId=urlSplit[urlSplit.length-1];
      axios.get(QUIZ+quizId,{ headers: requestHeader }).then(res=>{
        console.log(res.data)
        setQuiz(res.data)
        
      })
    }
  },[]);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setQuiz({
      ...quiz,[name]:value
    })
  }

  const updateQuiz=()=>{
    axios.put(QUIZ,quiz,{headers:userInfo.authToken()}).then(res=>{
      setNotification({open:true,msg:'Quiz updated successfully!',type:'success',hideDuration:3000})
      setTimeout(() => {
        navigation(-1)
      }, 1000)
    }).catch(error=>{
      console.log(error)
      setNotification({open:true,msg:'Something went wrong while updating quiz',type:'error',hideDuration:3000})
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(props.update){
      console.log(quiz)
      updateQuiz();
      return;
    }
    if(!quiz.category){
      setNotification({open:true,msg:'Please add category to quiz!',type:'error',hideDuration:3000})
      return;
    }
     axios.post(QUIZ,quiz,{headers:userInfo.authToken()}).then(res=>{
      setNotification({open:true,msg:'Quiz added successfully!',type:'success',hideDuration:3000})
      setTimeout(() => {
        navigation(-1)
      }, 1000)
    }).catch(error=>{
      console.log(error)
      setNotification({open:true,msg:'Something went wrong',type:'error',hideDuration:3000})
    })
  }
  return (
    <Container component={Paper} maxWidth="sm" elevation={3}>
      <Notification notification={notification} setNotification={setNotification} />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" sx={{ marginTop: '5px' }}>
         {props.update===true?"Update Quiz":"Add Quiz"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={quiz.title} onChange={handleChange}
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={quiz.description} onChange={handleChange}
            fullWidth
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            minRows={3}
            multiline={true} 
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              type="number"
              value={quiz.noOfQuestion} onChange={handleChange}
              id="question"
              label="No of Question"
              name="noOfQuestion"
            />
            <TextField
              variant="outlined"
              margin="normal"
              type="number"
              required
              value={quiz.maxMarks} onChange={handleChange}
              id="maxMarks"
              label="Marks Per Question"
              name="maxMarks"
            />
          </div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quiz.category.cid}
              name="category"
              label="Category"
              onChange={handleChanges}
            >
              {
                category.map(cat => {
                  return <MenuItem value={cat.cid}>{cat.title}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          <RegularButton type="submit" sx={{ marginTop: '15px' }}>{props.update===true?"update":"Add"}</RegularButton>
        </form>
      </div>
    </Container>
  )
}

export default AddQuiz