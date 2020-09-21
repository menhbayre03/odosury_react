import Login from "../components/Login";
import NotFound from "../components/NotFound";
export default [
    {
        component: Login,
        path: '/admin',
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
];