import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    show: false,
    message: ''
}

const modalDataSlice = createSlice({
    name: 'modalData',
    initialState,
    reducers: {
        setShowModal(state, action) {
            state.show = true;
            state.message = action.payload;
        },

        setHideModal(state) {
            state.show = false;
            state.message = "";
        }
    }
})
const modalDataActions = modalDataSlice.actions;


export default modalDataSlice;
export { modalDataActions }