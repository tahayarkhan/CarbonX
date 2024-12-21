import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import FootprintForm from "./screens/FootprintForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { getTest } from "./functions/test";
import Rankings from './screens/Rankings'
const App = () => {
  const [data, setData] = useState("Hello World");

  useEffect(() => {
    getTest()
      .then((res) => {
        setData(res.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    
    <Router>
      <Container>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/dashboard' element={<DashboardScreen />} />
          <Route path='/footprintform' element={<FootprintForm />} />
          <Route path='/rankings' element={<Rankings />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
