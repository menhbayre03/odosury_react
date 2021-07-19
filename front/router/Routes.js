import Main from "../components/Main";
import Home from "../components/Home";
import Lesson from "../components/lesson/Lesson";
import ListEish from "../components/lesson/ListEish";
import List from "../components/lesson/List";
import DoubleLogin from "../components/lesson/DoubleLogin";
import ListAudio from "../components/audio/ListAudio";
import Audio from "../components/audio/Audio";
import ViewAreaAudio from "../components/audio/ViewAreaAudio";
import ViewArea from "../components/lesson/ViewArea";
// import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Eish from "../components/Eish";
import Premium from "../components/Premium";
import Profile from '../components/profile/Profile';
import Wishlist from '../components/profile/Wishlist';
import Lessons from '../components/profile/Lessons';
import History from '../components/profile/History';
import About from '../components/About';
import Faq from '../components/Faq';
import Careers from "../components/Careers";
import Partner from "../components/Partner";
import Policy from "../components/Policy";
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
                component: Home,
                path: '/api/reset/password/:token',
                exact: true
            },
            // {
            //     component: Login,
            //     path: '/login',
            //     exact: true
            // },
            {
                component: Premium,
                path: '/premium',
                exact: true
            },
            {
                component: Eish,
                path: '/eishPage',
                exact: true
            },
            // {
            //     component: Login,
            //     path: '/verify/:token',
            //     exact: true
            // },
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
                component: Policy,
                path: '/policy',
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
                component: About,
                path: '/about',
                exact: true
            },
            {
                component: Faq,
                path: '/faq',
                exact: true
            },
            {
                component: Careers,
                path: '/careers',
                exact: true
            },
            {
                component: Partner,
                path: '/partner',
                exact: true
            },
            {
                component: DoubleLogin,
                path: '/warning',
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
