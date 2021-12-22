import { combineReducers } from 'redux';
import userReducer from './userReducer';
import configReducer from './configReducer';

const rootReducer = combineReducers({ userReducer, configReducer });

export default rootReducer;
