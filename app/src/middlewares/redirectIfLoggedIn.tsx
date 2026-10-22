// import { AuthenticationContext } from '@/contexts/Authentication';
// import { store } from '@/store';
// import { useContext } from 'react';
import { redirect } from 'react-router';

export default async function ({ request }: any, next: any) {
        // let token = null;

        // store.subscribe(function () {
        //         const state = store.getState();

        //         token = state.authentication.token;

        //         console.log(token);
        //         if (token) throw redirect('/login');
        // });

        // const { token } = useContext(AuthenticationContext);

        const token = localStorage.getItem('token');

        if (token) throw redirect('/dashboard');

        await next();
}