import { combineReducers } from 'redux';
import main from "./main";
import lesson from "./lesson";
import lessonLevel from "./lessonLevel";
import user from "./user";
import teacher from "./teacher";
import category from "./category";
import bundle from "./bundle";
import media from "./media";
export default combineReducers({
    main: main,
    lesson: lesson,
    lessonLevel: lessonLevel,
    teacher: teacher,
    user: user,
    category: category,
    bundle: bundle,
    media: media,
});