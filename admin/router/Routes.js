import index from "../components/index";
import Home from "../components/home/Home";
import Teachers from "../components/teacher/Teachers";
import User from "../components/user/User";
import Category from "../components/category/Category";
import Lessons from "../components/lesson/Lessons";
import LessonLevels from "../components/lesson/LessonLevels";
import Bundles from "../components/bundle/Bundles";
import Purchase from "../components/purchase/Purchase";
import NotFound from "../components/NotFound";
export default [
    {
        component: index,
        routes: [
            {
                component: Home,
                path: '/admin',
                exact: true
            },
            // {
            //     component: Teachers,
            //     path: '/admin/teachers',
            //     exact: true
            // },
            {
                component: User,
                path: '/admin/user',
                exact: true
            },
            {
                component: Category,
                path: '/admin/category',
                exact: true
            },
            {
                component: Lessons,
                path: '/admin/lessons',
                exact: true
            },
            {
                component: LessonLevels,
                path: '/admin/lessons/levels/:id',
                exact: true
            },
            // {
            //     component: Bundles,
            //     path: '/admin/bundles',
            //     exact: true
            // },
            {
                component: Purchase,
                path: '/admin/purchases',
                exact: true
            },
            {
                component: NotFound,
                path: '/not-found'
            },
            {
                component: NotFound,
                path: '*'
            },
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