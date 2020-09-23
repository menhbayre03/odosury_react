import Main from "../components/Main";
import Home from "../components/Home";
import Lesson from "../components/lesson/Lesson";
import NotFound from "../components/NotFound";
export default [
    {
        component: Main,
        routes: [
            {
                component: Home,
                path: '/',
                exact: true
            },
            {
                component: Lesson,
                path: '/lesson/:slug',
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
    },
];