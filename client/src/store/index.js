import { configureStore } from '@reduxjs/toolkit';
import addDataSlice from './addData';
import modalDataSlice from './modalData';


const store = configureStore({
    reducer: {
        addData: addDataSlice.reducer,
        modalData: modalDataSlice.reducer
    }
})

export default store;