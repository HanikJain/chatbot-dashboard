import React, { useState, useEffect, Fragment } from 'react'
import styles from './OptionForm.module.css'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { addDataActions } from "../../store/addData";
import { modalDataActions } from "../../store/modalData";

import useInsert, { useUpdate } from "../../hooks/api/menu.js";
import OptionInput from './Option/OptionInput';
import config from '../../hooks/config';

export default function OptionForm() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.addData.optionData);
    const [insert] = useInsert();
    const { updateTitle } = useUpdate();
    const [keywordEvent, keywordEventHandler] = useState();



    function clickHandler(e) {
        e.preventDefault()
        if (data.count >= config.maxlimit) {
            const message = `Max limit of ${config.maxlimit} reached`
            dispatch(modalDataActions.setShowModal(message));

        } else {
            let cloneData = structuredClone(data);
            let updatedData = insert(e.target.id, cloneData);
            dispatch(addDataActions.setAddOption(updatedData));


        }
    }



    function keywordChangeHandler(e) {
        keywordEventHandler(e);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const e = keywordEvent;
            const text = e.target.value;
            updateTitle(text);

        }, 500);

        return () => {
            clearTimeout(timer);
        }

    }, [keywordEvent])




    return (
        <Fragment>
            <Button
                onClick={clickHandler}
                className={`${styles.btn} btn btn-primary`}
                id="0"
                disabled={false}
            >
                +
            </Button>


            <br />
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label> Title </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ex: What service you want?"
                        onChange={keywordChangeHandler}
                        requried
                    />

                </Form.Group>
                <OptionInput />
            </Form>

        </Fragment>

    )
}
