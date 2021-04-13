import { combineReducers } from 'redux';
import main from "./main";
import auth from "./auth";
import home from "./home";
import lesson from "./lesson";
import lessonEish from "./lessonEish";
import profile from "./profile";
import audio from "./audio";
import payment from "./payment";
export default combineReducers({
    main: main,
    auth: auth,
    home: home,
    lesson: lesson,
    lessonEish: lessonEish,
    profile: profile,
    audio: audio,
    payment: payment,
});
