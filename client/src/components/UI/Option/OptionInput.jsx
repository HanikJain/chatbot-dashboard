import React, { Fragment, useEffect, useState } from 'react'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import styles from './OptionForm.module.css';

import { useDispatch, useSelector } from "react-redux";
import { addDataActions } from "../../../store/addData";
import { modalDataActions } from "../../../store/modalData";
import useInsert, { useFind, useUpdate } from "../../../hooks/api/menu";
import config from '../../../hooks/config';


export default function OptionInput() {
    const data = useSelector((state) => state.addData.optionData);
    const [printData, setPrintData] = useState([]);
    const [keywordEvent, keywordEventHandler] = useState();
    const [urlEvent, urlEventHandler] = useState();


    const dispatch = useDispatch();
    const [insert] = useInsert();
    const [find] = useFind();
    const { update } = useUpdate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const e = keywordEvent;
            const [type, id] = e.target.id.split('_')
            type.toUpperCase();
            if (type === 'TEXT') {
                let data = find(id);
                data.text = e.target.value;
                update(id, data);
            }



        }, 500);

        return () => {
            clearTimeout(timer);
        }

    }, [keywordEvent])


    function clickHandler(e) {
        e.preventDefault()
        const d = find(e.target.id);

        if (d.count >= config.maxlimit) {
            const message = `Max limit of ${config.maxlimit} reached`
            dispatch(modalDataActions.setShowModal(message));

        } else {
            let cloneData = structuredClone(data);
            let updatedData = insert(e.target.id, cloneData);
            dispatch(addDataActions.setAddOption(updatedData));
        }
    }

    function keywordChangeHandler(e) {
        keywordEventHandler(e)

    }

    function checkboxChangeHandler(e) {
        const checked = e.target.checked;
        const checkboxId = e.target.id;
        const id = checkboxId.split('_')[1];
        const data = find(id);

        if (checked) {
            if (data.optionExists) {
                const message = `Can't add link`
                dispatch(modalDataActions.setShowModal(message));
                e.target.checked = false;
            } else {
                data.checked = true;
            }
        } else {
            data.checked = false;
        }

        update(id, data);
    }

    function radioChangeHandler(e) {
        const checked = e.target.checked;
        const radioId = e.target.id;
        const arr = radioId.split('_')
        const id = arr[1];
        const type = arr[0];
        const data = find(id);

        if (type === 'API') {
            if (checked) {
                data.api = true;
                data.href = false;
            } else {
                data.api = false;
                data.href = true;
            }
        }
        else {
            if (checked) {
                data.api = false;
                data.href = true;
            } else {
                data.api = true;
                data.href = false;
            }
        }

        update(id, data);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const e = urlEvent;
            const [type, id] = e.target.id.split('_')
            type.toUpperCase();
            const data = find(id);
            if (type === 'URL') {
                data.url = e.target.value;
                update(id, data);
            }



        }, 500);

        return () => {
            clearTimeout(timer);
        }

    }, [urlEvent])


    function urlChangeHandler(e) {
        urlEventHandler(e)
    }



    useEffect(() => {

        function formInput(data, child = []) {
            const id = data.id;
            const inputId = "TEXT_" + id;
            const urlId = "URL_" + id;
            const checkboxId = "CHECKBOX_" + id;
            const hrefId = "HREF_" + id;
            const apiId = "API_" + id;

            const sr_no = id.split(".").slice(1).join(".");
            const checked = data.checked;
            const apiChecked = data.api;
            const hrefChecked = data.href;

            const printChild = (data) => {
                return data;
            }

            const urlForm =
                <Fragment>
                    <div>
                        <Form.Check
                            type="radio"
                            id={hrefId}
                            label="href"
                            name={id}
                            onChange={radioChangeHandler}
                            checked={hrefChecked}
                        />
                        <Form.Check
                            type="radio"
                            id={apiId}
                            label="api"
                            name={id}
                            onChange={radioChangeHandler}
                            checked={apiChecked}
                        />

                    </div>

                    <Form.Group className="mb-3" controlId={urlId} >
                        <Form.Label> {'Url'} </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={'url'}
                            key={data.id}
                            name={data.id}
                            onChange={urlChangeHandler}
                            requried

                        />

                    </Form.Group>
                </Fragment>



            const form =
                <Form key={data.id} className="mx-2 my-3 py-3 px-3 border border-dark">
                    <Button
                        className={`${styles.btn} btn btn-primary`}
                        id={data.id}
                        onClick={clickHandler}
                        disabled={checked}
                    >
                        +
                    </Button>

                    <Form.Group className="mb-3" controlId={inputId} >
                        <Form.Label> {sr_no}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={'Type something'}
                            key={data.id}
                            name={data.id}
                            onChange={keywordChangeHandler}
                            autoFocus
                            requried
                            onClick={(e) => { e.preventDefault(); }}

                        />

                    </Form.Group>

                    <br />

                    <Form.Check
                        type="switch"
                        id={checkboxId}
                        label={`Add link`}
                        onChange={checkboxChangeHandler}
                        disabled={false}
                        checked={checked}
                    />

                    {checked && urlForm}





                    {child.map(printChild)}

                </Form>

            return form;
        }


        function print(data) {
            let array = [];

            if (data.count > 0) {
                for (let x = 1; x <= data.count; x++) {

                    if (data[x].optionExists) {
                        let d = print(data[x]);
                        array.push(formInput(data[x], d));
                    } else {
                        array.push(formInput(data[x]));
                    }
                }

            }

            return array;
        }


        let x = print(data);
        setPrintData(x);

    }, [data, setPrintData]);

    return (
        <Fragment>
            {printData.map((data) => {
                return data;
            })}
        </Fragment>
    )
}
