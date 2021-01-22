import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Home from './features/components/home';
import Cart from './features/components/cart';
import Header from './features/components/header';
import Confirm from './features/components/confirm';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header/>
			<Switch>
				<Route path="/confirm">
					<Confirm />
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
  );
}

export default App;
