import { combineReducers } from 'redux';
import main from "./main";
import auth from "./auth";
import home from "./home";
import lesson from "./lesson";
import lessonEish from "./lessonEish";
import bundle from "./bundle";
import profile from "./profile";
import audio from "./audio";
import card from "./card";
export default combineReducers({
    main: main,
    auth: auth,
    home: home,
    lesson: lesson,
    lessonEish: lessonEish,
    bundle: bundle,
    profile: profile,
    audio: audio,
    card: card,
});
