import { combineReducers } from 'redux';
import main from "./main";
import lesson from "./lesson";
import lessonLevel from "./lessonLevel";
import teacher from "./teacher";
import category from "./category";
import bundle from "./bundle";
import media from "./media";
import purchase from "./purchase";
export default combineReducers({
    main: main,
    lesson: lesson,
    lessonLevel: lessonLevel,
    teacher: teacher,
    category: category,
    bundle: bundle,
    media: media,
    purchase: purchase,
});