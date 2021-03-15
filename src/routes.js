import Home from './pages/home/home';
import ListMovie from './components/home/list-movie';
import DashBoard from './pages/admin/dash-board';
// import DetailMovie from './pages/home/detail-movie';

const routeHome = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/list-movie',
        exact: false,
        component: ListMovie,
    },
    // {
    //     path: '/detail-movie',
    //     exact: false,
    //     component: DetailMovie,
    // }
];
const routeAdmin = [
    {
        path: '/dash-board',
        exact: false,
        component: DashBoard,
    }
]

export { routeHome, routeAdmin };