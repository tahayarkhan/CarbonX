import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import RankCard from "../components/RankCard";
import Navbar from '../components/Navbar';

const Rankings = () => {
  return (
    <>
      <div>
      <Navbar/>
      <h1 className="p-1">Friend Rankings</h1>
      <RankCard />
      </div>
    </>
  );
};

export default Rankings;
