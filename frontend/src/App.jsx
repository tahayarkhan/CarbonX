import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import FootprintForm from "./components/FootprintForm";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { getTest } from "./functions/test";
import Rankings from './screens/Rankings'
import PrivateRoute from './components/PrivateRoute.jsx';
import Settings from "./screens/Settings.jsx";



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
    
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardScreen />
            </PrivateRoute>
          }
          />
          <Route path='/footprintform' element={<FootprintForm />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/rankings' element={<Rankings />} />
        </Routes>
       
    </Router>
  );
};

export default App;
