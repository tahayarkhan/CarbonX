import React from 'react';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getTest} from './functions/test';

const App = () => {
  const [data, setData] = useState("Hello World");

  useEffect(() => {

    getTest()
    .then((res) => {
      setData(res.message);
    })
    .catch(err => console.log(err))

  }, []);

  return (
    // <Router>
    //   <Container>
    //     <Routes>
    //       <Route path='/' element={<HomeScreen />} exact />
    //       <Route path='/register' element={<RegisterScreen />} />
    //       <Route path='/login' element={<LoginScreen />} />
    //       <Route path='/dashboard' element={<DashboardScreen />} />
    //     </Routes>
    //   </Container>
    // </Router>
    <div className='App'>
      <h1>{data}</h1>
    </div>

  );
};

export default App;