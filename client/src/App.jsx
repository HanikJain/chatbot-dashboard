import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';


import Add from "./components/Add/Add";
import { useDispatch, useSelector } from "react-redux";
import { modalDataActions } from "./store/modalData";

let styles = {
  width: "90%",
  margin: "auto",
  padding: "1rem",
};

function App() {
  const { show, message } = useSelector((state) => state.modalData);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(modalDataActions.setHideModal());
  }

  const alert =

    <Alert className="zIndex10000 alertStyle" variant="danger" onClose={handleClose} dismissible>
      <Alert.Heading style={{ fontSize: "16px", }}>{message}</Alert.Heading>
    </Alert>





  return (
    <div style={styles}>
      <Add />

      {show && alert}


    </div>
  );
}

export default App;
