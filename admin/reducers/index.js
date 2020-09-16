import { combineReducers } from 'redux';
import main from "./main";
import lesson from "./lesson";
export default combineReducers({
    main: main,
    lesson: lesson,
});