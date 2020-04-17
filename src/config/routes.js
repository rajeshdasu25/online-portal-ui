import Contact from '../components/contact';
import Dashboard from '../components/dashboard';
import Users from '../components/users/viewAllUsers';
import Products from '../components/products';
import Queries from '../components/queries/viewAllQueries';
import Login from '../components/login/';
import Signup from '../components/login/signup';
import UserProfile from '../components/login/profile';

export const AppRoutes = [
    {
        component: Login,
        path: '/login',
    },
    {
        component: Signup,
        path: '/signup',
    },
    {
        component: UserProfile,
        path: '/profile',
    },
    {
        component: Dashboard,
        path: '/',
    },
    {
        component: Users,
        path: '/users',
    },
    {
        component: Contact,
        path: '/contact',
    },
    {
        component: Products,
        path: '/products',
    },
    {
        component: Queries,
        path: '/queries',
    }
];