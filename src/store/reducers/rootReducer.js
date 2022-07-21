import { combineReducers } from "redux";

import { tasksReducer } from "./taskReducer";

const rootReducer = combineReducers({
    tasksReducer
})

export default rootReducer