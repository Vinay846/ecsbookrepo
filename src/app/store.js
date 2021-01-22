import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {ecsSlice} from './ecsSlice'

const rootReducer = combineReducers({
  bookStore: ecsSlice.reducer,
})

export default configureStore({
  reducer: rootReducer
});
