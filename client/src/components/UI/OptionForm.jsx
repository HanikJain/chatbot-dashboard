import React, { useState, Fragment } from 'react'
import styles from './OptionForm.module.css'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { addDataActions } from "../../store/addData";
import { modalDataActions } from "../../store/modalData";

import useInsert from "../../hooks/api/menu.js";
import OptionInput from './Option/OptionInput';
import config from '../../hooks/config';

export default function OptionForm() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.addData.optionData);
    const [insert] = useInsert();



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



            <Form>
                <OptionInput />
            </Form>

        </Fragment>

    )
}
