import styles from "./Add.module.css";
import "./Add.css";
import React, { useState, Fragment, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addDataActions } from "../../store/addData";


import useHttp from "../../hooks/use-http";
import useValidate from "../../hooks/validate";

import TextForm from "../UI/TextForm";
import CardForm from "../UI/CardForm";
import OptionForm from "../UI/OptionForm.jsx";

export default function Add() {
  const { isLoading, error, sendRequest } = useHttp();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.addData);
  const type = data.type;
  const keywordValue = data.keyword;

  const [show, setShow] = useState(false);
  const [keywordInValid, setKeywordInValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState(<OptionForm />);
  const typeRef = useRef();
  const [validate] = useValidate();

  useEffect(() => {
    switch (type) {
      case "TEXT":
        setForm(<TextForm />);
        break;

      case "CARD":
        setForm(<CardForm />);
        break;

      case "OPTION":
        setForm(<OptionForm />);
        break;

      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    if (submit) {
      const requestConfig = {
        url: "http://127.0.0.1:5001/api/add-course",
        method: "POST",
      };

      const response = validate(data);
      if (response !== undefined) {
        requestConfig.body = structuredClone(response);
        sendRequest(requestConfig, dataInsertHandler);
      }
      setSubmit(false);
    }

  }, [submit, sendRequest, data, dataInsertHandler, validate]);

  function dataInsertHandler(data) {
    console.log(data);
    dispatch(addDataActions.clearMessage());
  }

  function handleClose() {
    setShow(false);
  }

  function handleSubmitForm() {
    setSubmit(true);
  }

  function clickHandler() {
    setShow(true);
    dispatch(addDataActions.setAddType("OPTION"));
  }

  function keywordChangeHandler(e) {
    if (e.target.value !== "") {
      setKeywordInValid(false);
    } else {
      setKeywordInValid(true);
    }

    dispatch(addDataActions.setAddKeyword(e.target.value));
  }

  function clearMessage(e) {
    e.preventDefault();
    dispatch(addDataActions.clearMessage());
  }

  function saveMessage(e) {
    e.preventDefault();
    if (keywordValue !== "") {
      setKeywordInValid(false);
    } else {
      setKeywordInValid(true);
    }
  }

  function typeChangeHandler() {
    dispatch(addDataActions.setAddType(typeRef.current.value));
  }



  return (
    <>
      <button
        onClick={clickHandler}
        className={`${styles.btn} btn btn-primary`}
      >
        +
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Bot Message </Modal.Title>{" "}
        </Modal.Header>{" "}
        <Modal.Body style={{ overflowY: "scroll" }}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Keyword </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Javascript"
                value={keywordValue}
                onChange={keywordChangeHandler}
                autoFocus
                requried
              />
              {keywordInValid && <p> Invalid </p>}
            </Form.Group>

            <Form.Label> Select type </Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={typeChangeHandler}
              ref={typeRef}
            >
              <option value="OPTION"> Option </option>
              <option value="TEXT"> Text </option>
              <option value="CARD"> Card </option>
            </Form.Select>

            <br />

            {form}

            <br />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>

            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitForm}>

            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
