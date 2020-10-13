import { combineReducers } from 'redux';
import main from "./main";
import auth from "./auth";
import home from "./home";
import lesson from "./lesson";
import bundle from "./bundle";
import card from "./card";
export default combineReducers({
    main: main,
    auth: auth,
    home: home,
    lesson: lesson,
    bundle: bundle,
    card: card,
});