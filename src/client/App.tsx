import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/public/Login';
import ChatWindow from './components/private/ChatWindow/index';
import Register from './components/public/Register';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<main className="container"> 
				<Switch>
					<Route exact path="/"><h1>hello</h1></Route>
					<Route exact path="/login"><Login /></Route>
					<Route exact path="/register"><Register /></Route>
					<Route exact path="/chat_window/:chatid"><ChatWindow /></Route>
				</Switch>
			</main>
		</BrowserRouter>
	);
};

export default App;
