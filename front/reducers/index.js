import { combineReducers } from 'redux';
import main from "./main";
import auth from "./auth";
import home from "./home";
import lesson from "./lesson";
export default combineReducers({
    main: main,
    auth: auth,
    home: home,
    lesson: lesson,
});