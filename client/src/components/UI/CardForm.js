import React, { useState, useRef } from 'react'
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addDataActions } from "../../store/addData";

export default function CardForm() {
    const data = useSelector(state => state.addData.cardData);
    const dispatch = useDispatch()


    const [dataInValid, setDataInValid] = useState({
        name: false,
        description: false,
        price: false,
        rating: false,
        totalRatings: false
    });


    function dataChangeHandler(e) {

        switch (e.target.name) {
            case "name":

                if (e.target.value === "") {
                    setDataInValid(prevState => { return { ...prevState, name: true } })
                }
                else {
                    setDataInValid(prevState => { return { ...prevState, name: false } })
                }

                dispatch(addDataActions.setAddName(e.target.value));
                break;

            case "description":


                if (e.target.value === "") {
                    setDataInValid(prevState => { return { ...prevState, description: true } })
                }
                else {
                    setDataInValid(prevState => { return { ...prevState, description: false } })
                }
                dispatch(addDataActions.setAddDescription(e.target.value));
                break;

            case "price":


                if (e.target.value === "") {
                    setDataInValid(prevState => { return { ...prevState, price: true } })
                }
                else {
                    setDataInValid(prevState => { return { ...prevState, price: false } })
                }

                dispatch(addDataActions.setAddPrice(e.target.value));
                break;

            case "rating":

                if (e.target.value === "") {
                    setDataInValid(prevState => { return { ...prevState, rating: true } })
                }
                else {
                    setDataInValid(prevState => { return { ...prevState, rating: false } })
                }

                dispatch(addDataActions.setAddRating(e.target.value));
                break;

            case "totalRatings":


                if (e.target.value === "") {
                    setDataInValid(prevState => { return { ...prevState, totalRatings: true } })
                }
                else {
                    setDataInValid(prevState => { return { ...prevState, totalRatings: false } })
                }

                dispatch(addDataActions.setAddTotalRatings(e.target.value));
                break;

            default:
                break;
        }
    }

    return (
        <>
            <Form.Group className="mb-3" controlId="nameForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Javascript: zero to hero"
                    value={data.name}
                    onChange={dataChangeHandler}
                    name="name"
                    requried

                />
                {dataInValid.name && <p>Invalid</p>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="descriptionForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="This course is for beginners."
                    value={data.description}
                    onChange={dataChangeHandler}
                    name="description"
                    requried
                />
                {dataInValid.description && <p>Invalid</p>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="price.ControlInput1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="999"
                    value={data.price}
                    onChange={dataChangeHandler}
                    name="price"
                    requried
                />
                {dataInValid.price && <p>Invalid</p>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="rating.ControlInput1">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="4.4"
                    value={data.rating}
                    onChange={dataChangeHandler}
                    name="rating"
                    requried
                />
                {dataInValid.rating && <p>Invalid</p>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="totalRatings.ControlInput1">
                <Form.Label>Total Ratings</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="3321"
                    value={data.totalRatings}
                    onChange={dataChangeHandler}
                    name="totalRatings"
                    requried
                />
                {dataInValid.totalRatings && <p>Invalid</p>}

            </Form.Group>
        </>
    )
}
