import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

import './index.css';
import Layout from './components/Layout';
import AddQuestion from './components/AddQuestion';
import Questions from './components/questions/Questions';


function App() {
  return (
	  <Router>
		<Switch>
			<Layout>
				<Switch>
				<Route exact path="/">
					This is Home route
					
				</Route>
				<Route path="/add">
					<AddQuestion/>
				</Route>
				<Route path="/:lang" children={<Questions/>}/>
				</Switch>
			</Layout>
		</Switch>
	  </Router>
  );
}

export default App;
