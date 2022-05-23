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
import { useLocation } from 'react-router-dom'
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
  const [age, setAge] = React.useState('');
  const requestHeader = useAgent().authToken()
  let [category,setCategory]=useState([])
  const userInfo=useAgent();
  const handleChange = (event) => {
    setAge(event.target.value);
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
        // setNotification({open:true,msg:'Quiz updated successfully!',type:'success',hideDuration:3000})
      })
    }
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let quiz = {
      title: formData.get('title'),
      description: formData.get('description'),
      noOfQuestion: formData.get('question'),
      maxMarks: formData.get('marks'),
      category: {
        cid: age
      }
    }
     axios.post(QUIZ,quiz,{headers:userInfo.authToken()}).then(res=>{
      setNotification({open:true,msg:'Quiz added successfully!',type:'success',hideDuration:3000})
      // setQuiz(null);
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
              id="question"
              label="No of Question"
              name="question"
            />
            <TextField
              variant="outlined"
              type='number'
              margin="normal"
              required
              id="maxMarks"
              label="Marks Per Question"
              name="marks"
            />
          </div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              name="category"
              label="Category"
              onChange={handleChange}
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