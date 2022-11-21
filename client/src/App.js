import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './components/student/Register';
import Login from './components/student/Login';
import TeacherLogin from './components/teacher/Login';
import Home from './components/student/Home';
import TeacherHome from './components/teacher/Home';
import Quiz from './components/student/Quiz';
import Result from './components/student/Result';
import History from './components/student/History';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/register" exact component={Register}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/quiz" exact component={Quiz}/>
        <Route path="/result" exact component={Result}/>
        <Route path="/history" exact component={History}/>
        
        {/* Teacher */}
        <Route path="/teacher/login" exact component={TeacherLogin}/>
        <Route path="/teacher/" exact component={TeacherHome}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
