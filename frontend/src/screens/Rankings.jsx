import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import RankCard from "../components/RankCard";

const Rankings = () => {
  return (
    <>
      <div></div>
      <h1 className="p-1">Friend Rankings</h1>
      <RankCard />
    </>
  );
};

export default Rankings;
