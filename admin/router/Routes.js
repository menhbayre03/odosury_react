import index from "../components/index";
import Home from "../components/home/Home";
import Students from "../components/students/Students";
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
            {
                component: Students,
                path: '/admin/students',
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