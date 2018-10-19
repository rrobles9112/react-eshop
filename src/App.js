import React, { Component } from 'react';
import './App.css';
import { Router } from '@reach/router';
import Loadable from 'react-loadable';
import { Provider } from 'constate';
import AuthStore from './models/AuthStore';
import withAuth from './helpers/WithAuth';

const AsyncLogin = Loadable({
	loader: () => import('./routes/LoginPage'),
	loading: () => <p>Loading... </p>
});
const HomePage = Loadable({
	loader: () => import('./routes/HomePage'),
	loading: () => <p>Loading Home... </p>
});

const ProtectedHomeRoute = withAuth(HomePage);

class App extends Component {
	state = {};
	render() {
		return (
			<Provider devtools={true}>
				<AuthStore context="Auth" pure>
					{(state) => (
						<Router>
							<AsyncLogin path="/" authStore={state} />
							<ProtectedHomeRoute path="home/*" isAuth={state.isAuth} />
						</Router>
					)}
				</AuthStore>
			</Provider>
		);
	}
}

export default App;
