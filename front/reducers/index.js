import { combineReducers } from 'redux';
import main from "./main";
import auth from "./auth";
import home from "./home";
import lesson from "./lesson";
import lessonEish from "./lessonEish";
import profile from "./profile";
import audio from "./audio";
import payment from "./payment";
import jobPost from "./jobPost";
import requests from "./requests";
import test from "./test";
import bundle from "./bundle";
import testLaunch from "./testLaunch";
import Results from '../components/test/Results';
import testResultSingle from './testResultSingle';
import results from './results';
export default combineReducers({
    main: main,
    auth: auth,
    home: home,
    lesson: lesson,
    lessonEish: lessonEish,
    profile: profile,
    audio: audio,
    payment: payment,
    jobPost: jobPost,
    requests: requests,
    bundle: bundle,
    test,
    testLaunch,
    testResultSingle,
    results,
    Results: Results,
});
