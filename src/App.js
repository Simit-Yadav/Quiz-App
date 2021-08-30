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
					<div style={{fontSize: '2rem'}}>
					Hey Everyone,
					This is a small quiz app in which you can add questions for your revision. The app is completely responsive and made keeping in mind the ease of use. Try, it and share with your friends. Giving a small feedback and some features to update on sim5394yadav@hotmail.com with will be a very great contribution.

					Thanks
					:)
					..
					</div>
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
