import React from 'react'
import { Container } from "constate";
import { loginRequestApi, logoutRequestApi } from './../helpers/API';
import { navigate } from '@reach/router'

const AuthContainer = props => (
    <Container
        initialState={{ isAuth: localStorage.getItem('isAuth') ? true : false }}
        actions={{
            proAction   : amount => state => ({ isState: state.count + amount })

        }}

        effects={{
            loginEffect: (params) => ({ setState }) => {

                (async () => {
                    try {
                        const data = await loginRequestApi(params.email, params.pass).then(res => res).catch(err => err);
                        const r = { ...data };
                        
                        if (typeof (r.data.user.stsTokenManager.access_token) !== undefined) {
                            console.log('data', r.data.user.stsTokenManager.accessToken);
                            let token = r.data.user.stsTokenManager.accessToken;
                            localStorage.setItem('isAuth', true);
                            localStorage.setItem('userToken', token);
                            setState({
                                isAuth: true,
                                userToken: r.data.user.stsTokenManager.access_token
                            })
                        }
                        
                    } catch (error) {
                        console.log('Error', error);
                    }

                })()

            },
            logoutEffect: () => ({ setState }) => {
                (async () => {
                    const logout = await logoutRequestApi().then(res => res.data);
                    console.log('Logout= ', logout)
                    if (logout.success) {
                        console.log('entro logout')
                        setState({
                            isAuth: false,
                            userToken: null
                        }, () => {
                            localStorage.clear();
                            navigate('/')
                        })

                    }
                })();
            }

        }}
        {...props}
    />
);

export default AuthContainer;