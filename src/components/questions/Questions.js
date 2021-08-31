import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Question from './Question';

const Questions = () => {
	const {lang} = useParams();
	const [notFound,setNotFound] = useState(true);
	const [questions,setQuestions] = useState({});
	const [fetching,setFetching] = useState(true);

	const url = `https://reviseapi.herokuapp.com/api/v1/questions/${lang}`;

	const fetchQuestions = async () => {
		try{
			const res = await fetch(url);
			const data = await res.json();
			if('msg' in data){
				setNotFound(true);
				setQuestions({});
			}else{
				setQuestions(data);
				setNotFound(false);
				setFetching(false);
			}
		}catch(err){
			setFetching(false);
			console.log(err);
		}

	}

	useEffect(() => {
		fetchQuestions();
	},[lang])


	if(fetching){
		return (
			<h1>loading...</h1>
		)
	}

	if(notFound){
		return (
			<h1>No question found ...</h1>
		)
	}


	return (
		<div className="wrapper">
			{questions.map((item) => {
				return <Question item={item} key={item._id}/>
			})}
		</div>
	)

}

export default Questions;


// {questions.map((item) => {
// 			<Question item={item}/>
// 		})}

// function Language({lang}){
// 	const [language,setLanguage] = useState(lang);
// 	const [questions,setQuestions] = useState([]);
	
// 	useEffect(() => {
// 		fetch(`https://cors-anywhere.herokuapp.com/https://quiz-api.sy94.repl.co/api/v1/questions/${language}`)
// 		.then(response => response.json())
// 		.then(question => setQuestions(question))
// 	})


// 	return (
// 		<>
// 		{questions.map((ques) => {
// 					return (
// 						<Typography variant="h4">
// 							{ques.language}
// 							{ques.options.map(item => {
// 								return (
// 									<Typography variant="body1">
// 										{item.option}
// 									</Typography>
// 								)
// 							})}
// 						</Typography>				
// 					)
// 		})}
// 		</>
// 	)
// }