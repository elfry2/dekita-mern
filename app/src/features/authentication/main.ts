import FormLayout from '../../layouts/FormLayout';
import Register from './Register';
import Login from './Login';

export default [
    {
        Component: FormLayout,
        loader: async function () {
            return {
                backUrl: null,
            };
        },
        children: [
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/login',
                Component: Login
            }
        ],
    },
]