import React from 'react'
import { Route, Routes } from 'react-router-dom';
import DashBoard from '../DashBoards/DashBoard';
import Home from '../component/Home';
import LoginForm from '../Forms/LoginForm';
import RegistrationForm from '../Forms/RegistrationForm';
import NewUserForm from '../component/NewUserForm';
import AddQuiz from '../pages/AddOrUpdateQuiz';
import Quizes from '../pages/Quizes';
import ViewCategories from '../pages/ViewCategories';
import AddCategory from '../pages/AddOrUpdateCategory'
import Profile from '../pages/Profile';
import UserDeshboard from '../DashBoards/UserDeshboard';
import QuestionOfQuiz from '../pages/QuestionOfQuiz';
import AddorUpdateQuestion from '../pages/AddorUpdateQuestion';

function AppRoute() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<DashBoard />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/home" element={<UserDeshboard />}></Route>
        <Route exact path="/login" element={<LoginForm />}></Route>
        <Route exact path="/register" element={<RegistrationForm />}></Route>
        <Route exact path="/newuser" element={<NewUserForm />}></Route>
        <Route exact path="/addquiz" element={<AddQuiz />}></Route>
        <Route exact path="/quiz" element={<Quizes update={false} />}></Route>
        <Route exact path="/quiz/update/:quizId" element={<AddQuiz update={true} />}></Route>
        <Route exact path="/categories" element={<ViewCategories />}></Route>
        <Route exact path="/addcategory" element={<AddCategory />}></Route>
        <Route exact path="/updatecategory/:categoryId" element={<AddCategory update={true} />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/questions/quiz/:quizId" element={<QuestionOfQuiz />}></Route>
        <Route exact path="/addquestion/quiz/:quizId" element={<AddorUpdateQuestion update={false} />}></Route>
        <Route exact path="/updatequestion/:quesId/quiz/:quizId" element={<AddorUpdateQuestion update={true} />}></Route>
      </Routes>
    </>
  )
}

export default AppRoute