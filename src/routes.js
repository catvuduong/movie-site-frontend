import Home from './pages/home/home';
import ListMovie from './components/home/list-movie';
import DashBoard from './pages/admin/dash-board';
import DetailsMovie from './pages/home/details-movie';

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
    {
        path: '/details-movie/:id',
        exact: false,
        component: DetailsMovie,
    }
];
const routeAdmin = [
    {
        path: '/dash-board',
        exact: false,
        component: DashBoard,
    }
]

export { routeHome, routeAdmin };