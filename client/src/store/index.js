import { configureStore } from '@reduxjs/toolkit';
import addDataSlice from './addData';


const store = configureStore({
    reducer: {
        addData: addDataSlice.reducer
    }
})

export default store;