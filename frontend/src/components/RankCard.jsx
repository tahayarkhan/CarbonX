import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import { Droplet, Zap, Car } from "lucide-react";

import profile from "../assets/profile/profile.png";

const RankCard = () => {
  return (
    <>
      <div className="card flex flex-row align-items-center p-3">
        <div className="d-flex flex-column align-items-center mr-3">
          <img
            src={profile}
            className="rounded-circle"
            alt="profile"
            style={{ width: "100px", height: "100px" }}
          />
          <h5 className="card-title mt-2 fs-4 text-center">Taha Yar Khan</h5>
        </div>
        <div className="flex-grow-1 flex-column  mx-5">
          <h6 className="  fs-5">Goal: Taking public transit!</h6>
          <div className="d-flex flex-wrap gap-4 mt-3">
            <div className=" d-flex flex-row gap-1 align-content-center">
              <Droplet size={30} />
              <p className="fs-5">100 L</p>
            </div>
            <div className=" d-flex flex-row gap-1  align-content-center">
              <Zap size={30} />
              <p className="fs-5">50 kW</p>
            </div>
            <div className=" d-flex flex-row  gap-1  align-content-center">
              <Car size={30} />
              <p className="fs-5"> 10 L</p>
            </div>
          </div>
        </div>
        <a href="" className="btn btn-primary ml-3">
          View Data
        </a>
      </div>
    </>
  );
};

export default RankCard;
