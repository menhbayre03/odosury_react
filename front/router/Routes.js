import Main from "../components/Main";
import Home from "../components/Home";
import Lesson from "../components/lesson/Lesson";
import ListEish from "../components/lesson/ListEish";
import List from "../components/lesson/List";
import ListAudio from "../components/audio/ListAudio";
import Audio from "../components/audio/Audio";
import ViewAreaAudio from "../components/audio/ViewAreaAudio";
import ViewArea from "../components/lesson/ViewArea";
import Login from "../components/Login";
import Bundle from "../components/Bundle";
import NotFound from "../components/NotFound";
import Profile from '../components/profile/Profile';
import Wishlist from '../components/profile/Wishlist';
import Lessons from '../components/profile/Lessons';
import History from '../components/profile/History';
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
                component: Login,
                path: '/login',
                exact: true
            },
            {
                component: Login,
                path: '/verify/:token',
                exact: true
            },
            {
                component: Lesson,
                path: '/lesson/:slug',
                exact: true
            },
            {
                component: Audio,
                path: '/audio/:slug',
                exact: true
            },
            {
                component: ListEish,
                path: '/eish',
                exact: true
            },
            {
                component: List,
                path: '/lessons/:slug',
                exact: true
            },
            {
                component: ListAudio,
                path: '/audios/:slug',
                exact: true
            },
            {
                component: ViewArea,
                path: '/lesson/view/:slug',
                exact: true
            },
            {
                component: ViewAreaAudio,
                path: '/audio/view/:slug',
                exact: true
            },
            {
                component: Bundle,
                path: '/bundle/:slug',
                exact: true
            },
            // {
            //     component: Card,
            //     path: '/card',
            //     exact: true
            // },
            {
                component: Profile,
                path: '/profile/info',
                exact: true
            },
            {
                component: History,
                path: '/profile/history',
                exact: true
            },
            {
                component: Wishlist,
                path: '/profile/wishlist',
                exact: true
            },
            {
                component: Lessons,
                path: '/profile/lessons',
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
