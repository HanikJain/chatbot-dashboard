import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addDataActions } from "../../store/addData";

export default function TextForm() {
    const [textInValid, setTextInValid] = useState(false);
    const dispatch = useDispatch()
    const text = useSelector(state => state.addData.textData.text);



    function textChangeHandler(e) {
        if (e.target.value !== "") {
            setTextInValid(false);
        } else {
            setTextInValid(true);
        }

        dispatch(addDataActions.setAddText(e.target.value));
    }


    return (
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Text</Form.Label>
            <Form.Control
                type="text"
                placeholder="Click the link"
                value={text}
                onChange={textChangeHandler}
                requried
            />
            {textInValid && <p>Invalid</p>}

        </Form.Group>
    )
}
