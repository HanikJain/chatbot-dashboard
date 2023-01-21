import styles from "./Add.module.css";
import "./Add.css";
import React, { useState, Fragment, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addDataActions } from "../../store/addData";
import useHttp from "../../hooks/use-http";

import TextForm from "../UI/TextForm";
import CardForm from "../UI/CardForm";

export default function Add() {
  const { isLoading, error, sendRequest } = useHttp();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.addData);
  const type = data.type;
  const keywordValue = data.keyword;

  const [show, setShow] = useState(false);
  const [keywordInValid, setKeywordInValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState(<TextForm />);
  const typeRef = useRef();

  useEffect(() => {
    switch (type) {
      case "TEXT":
        setForm(<TextForm />);
        break;

      case "CARD":
        setForm(<CardForm />);

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

      switch (data.type) {
        case "TEXT":
          requestConfig.body = {
            type: data.type,
            keyword: data.keyword.trim(),
            text: data.textData.text,
          };

          break;

        case "CARD":
          requestConfig.body = {
            type: data.type,
            keyword: data.keyword.trim(),
            name: data.cardData.name,
            description: data.cardData.description,
            price: data.cardData.price,
            rating: data.cardData.rating,
            totalRatings: data.cardData.totalRatings,
          };

          break;

        default:
          break;
      }

      sendRequest(requestConfig, dataInsertHandler);
      setSubmit(false);
    }
  }, [submit, sendRequest, data, dataInsertHandler]);

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
    dispatch(addDataActions.setAddType("TEXT"));
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
        {" "}
        +{" "}
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
              <option value="TEXT"> Text </option>
              <option value="CARD"> Card </option>
            </Form.Select>

            <br />

            {form}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            Close{" "}
          </Button>
          <Button variant="primary" onClick={handleSubmitForm}>
            {" "}
            Save Changes{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
