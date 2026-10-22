import FormLayout from '../../layouts/Form';
import Register from './Register';
import Login from './Login';
import redirectIfLoggedIn from '@/middlewares/redirectIfLoggedIn';

export default [
    {
        Component: FormLayout,
        middleware: [redirectIfLoggedIn],
        children: [
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/login',
                Component: Login,
            }
        ],
    }
];