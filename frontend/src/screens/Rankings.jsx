import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import RankCard from "../components/RankCard";
import Navbar from '../components/Navbar';


const Rankings = () => {
  return (
  
    <div className="d-flex justify-content-center vh-100 vw-100">
      <Navbar />
      <div style={{ paddingTop: "70px" }}> {/* Adjust padding to match Navbar height */}
      
          <h1 className="mt-4 mb-4 text-center">Friend Rankings</h1>
          <RankCard />
      
      </div>
    </div>

  );
};

export default Rankings;
