import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import RankCard from "../components/RankCard";

const Rankings = () => {
  const [footprints, setFootprints] = useState([]);

  useEffect(() => {
    const fetchFootprints = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/users", config);
      setFootprints(data);
    };
    fetchFootprints();
  }, []);

  console.log(footprints);
  return (
    <>
      <h1 className="p-1">Friend Rankings</h1>
      <div className="gap-5 m-1">
        {footprints.map((footprint, index) => (
          <RankCard key={index} index={index + 1} user={footprint} />
        ))}
      </div>
    </>
  );
};

export default Rankings;
