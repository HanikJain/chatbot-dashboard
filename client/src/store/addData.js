import { createSlice } from '@reduxjs/toolkit';

const textData = { text: "" };
const cardData = {
    name: '',
    description: '',
    price: '',
    rating: '',
    totalRatings: '',
};

const initialState = {
    type: 'TEXT',
    keyword: '',
    textData,
    cardData
}

const addDataSlice = createSlice({
    name: 'addData',
    initialState: initialState,
    reducers: {
        setaddData(state, action) {
            state.addData = action.payload;
        },

        setAddText(state, action) {
            state.textData.text = action.payload;
        },

        setAddName(state, action) {
            state.cardData.name = action.payload;
        },

        setAddDescription(state, action) {
            state.cardData.description = action.payload;
        },

        setAddPrice(state, action) {
            state.cardData.price = action.payload;
        },

        setAddRating(state, action) {
            state.cardData.rating = action.payload;
        },

        setAddTotalRatings(state, action) {
            state.cardData.totalRatings = action.payload;
        },

        setAddKeyword(state, action) {
            state.keyword = action.payload;
        },

        setAddType(state, action) {
            state.type = action.payload;
        },

        clearMessage(state) {
            state.keyword = "";
            state.type = "TEXT";
            state.textData = textData;
            state.cardData = cardData;
        }
    }
});

const addDataActions = addDataSlice.actions;


export default addDataSlice;
export { addDataActions }
