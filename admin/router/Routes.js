import index from "../components/index";
// import Home from "../components/home/Home";
import User from "../components/user/User";
import Category from "../components/category/Category";
import AudioCategory from "../components/audioCategory/AudioCategory";
import Lessons from "../components/lesson/Lessons";
import Audios from "../components/audio/Audios";
import AudioLevels from "../components/audio/AudioLevels";
import LessonLevels from "../components/lesson/LessonLevels";
import Bundles from "../components/bundle/Bundles";
import Purchase from "../components/purchase/Purchase";
import NotFound from "../components/NotFound";
import TeacherRequest from "../components/TeacherRequest";
import Feedback from "../components/Feedback";
import JobPost from "../components/JobPost";
import Promo from "../components/Promo";
import Test from "../components/test/Test";
import TestSingle from "../components/test/TestSingle";
import Partner from "../components/partner/index";
import KnowledgeCategory from "../components/knowledge/KnowledgeCategory";
import Knowledge from "../components/knowledge/Knowledge";
export default [
	{
		component: index,
		routes: [
			{
				component: Purchase,
				path: "/admin",
				exact: true
			},
			// {
			//     component: Teachers,
			//     path: '/admin/teachers',
			//     exact: true
			// },
			{
				component: Knowledge,
				path: "/admin/knowledge",
				exact: true
			},
			{
				component: KnowledgeCategory,
				path: "/admin/knowledgeCategory",
				exact: true
			},
			{
				component: User,
				path: "/admin/user",
				exact: true
			},
			{
				component: Category,
				path: "/admin/category",
				exact: true
			},
			{
				component: AudioCategory,
				path: "/admin/audioCategory",
				exact: true
			},
			{
				component: Audios,
				path: "/admin/audios",
				exact: true
			},
			{
				component: AudioLevels,
				path: "/admin/audio/programs/:id",
				exact: true
			},
			{
				component: Lessons,
				path: "/admin/lessons",
				exact: true
			},
			{
				component: LessonLevels,
				path: "/admin/lessons/levels/:id",
				exact: true
			},
			{
				component: Bundles,
				path: "/admin/bundles",
				exact: true
			},
			{
				component: TeacherRequest,
				path: "/admin/teacherRequest",
				exact: true
			},
			{
				component: Feedback,
				path: "/admin/feedBack",
				exact: true
			},
			{
				component: JobPost,
				path: "/admin/jobpost",
				exact: true
			},
			{
				component: Promo,
				path: "/admin/Promo",
				exact: true
			},
			{
				component: Partner,
				path: "/admin/Partner",
				exact: true
			},
			{
				component: Test,
				path: "/admin/test",
				exact: true
			},
			{
				component: TestSingle,
				path: "/admin/test/single/:test",
				exact: true
			},
			// {
			//     component: Purchase,
			//     path: '/admin/purchases',
			//     exact: true
			// },
			{
				component: NotFound,
				path: "/not-found"
			},
			{
				component: NotFound,
				path: "*"
			}
		]
	}
	// {
	//     component: Main,
	//     path: '/:slug',
	//     routes: [
	//         {
	//             component: Sells,
	//             path: '/:slug',
	//             exact: true
	//         },
	//         {
	//             component: FoodOrder,
	//             path: '/:slug/FoodOrder',
	//             exact: true
	//         },
	//         // {
	//         //     component: Sells,
	//         //     path: '/:slug/Sells',
	//         //     exact: true
	//         // },
	//         {
	//             component: Category,
	//             path: '/:slug/menu/category',
	//             exact: true
	//         },
	//         {
	//             component: Food,
	//             path: '/:slug/menu/food',
	//             exact: true
	//         },
	//         {
	//             component: Members,
	//             path: '/:slug/members',
	//             exact: true
	//         },
	//         {
	//             component: NotFoundL,
	//             path: '/not-found'
	//         },
	//         {
	//             component: NotFoundL,
	//             path: '*'
	//         }
	//     ]
	// }
];
