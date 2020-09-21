import { combineReducers } from 'redux';
import main from "./main";
import lesson from "./lesson";
import teacher from "./teacher";
import category from "./category";
export default combineReducers({
    main: main,
    lesson: lesson,
    teacher: teacher,
    category: category,
});