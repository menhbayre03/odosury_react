import { combineReducers } from "redux";
import main from "./main";
import lesson from "./lesson";
import lessonLevel from "./lessonLevel";
import user from "./user";
import teacher from "./teacher";
import category from "./category";
import bundle from "./bundle";
import media from "./media";
import purchase from "./purchase";
import audio from "./audio";
import audioLevel from "./audioLevel";
import audioCategory from "./audioCategory";
import teacherRequest from "./teacherRequest";
import feedBack from "./feedBack";
import jobPost from "./jobPost";
import promo from "./promo";
import test from "./test";
import partner from "./partner";
import knowledge from "./knowledge";
import knowledgeCategory from "./knowledgeCategory";
export default combineReducers({
	main: main,
	lesson: lesson,
	lessonLevel: lessonLevel,
	teacher: teacher,
	user: user,
	category: category,
	bundle: bundle,
	media: media,
	purchase: purchase,
	audio: audio,
	audioLevel: audioLevel,
	audioCategory: audioCategory,
	teacherRequest: teacherRequest,
	feedBack: feedBack,
	jobPost: jobPost,
	promo: promo,
	test: test,
	knowledge: knowledge,
	knowledgeCategory: knowledgeCategory,
	partner: partner
});
