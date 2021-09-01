import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

const Submit = withStyles({
	root: {
		backgroundColor: '#2AEDD7',
		'&:hover': {
			backgroundColor: '#48EA46',
		}
	}
})(Button);

const useStyles = makeStyles((theme) => {
	return {
		content: {
			// width: '50%',
			marginLeft: 'auto',
			marginRight: 'auto',
			// padding: theme.spacing(3),
			textAlign: 'center',
		},
		field: {
			marginTop: 20,
			marginBottom: 20,
			border: '1px solid #311847',
			borderRadius: '5px',
			// display: "block"
		},
		title: {
			textDecoration: 'underline',
		},
		error: {
			color: '#ffffff',
			backgroundColor: 'rgba(250, 58, 58, 0.945)',
			padding: '0.5rem',
			fontSize: '1.2rem',
			borderRadius: '1.5rem'
		}
	}
})


const AddQuestion = () => {
	const classes = useStyles();
	const [error,setError] = useState("");
	const [language,setLanguage] = useState('');
	const [question,setQuestion] = useState('');
	const [option1,setOption1] = useState('');
	const [option2,setOption2] = useState('');
	const [option3,setOption3] = useState('');
	const [option4,setOption4] = useState('');
	const [correct,setCorrect] = useState('');
	const [credit,setCredit] = useState('');
	const [success,setSuccess] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		var valid = true;

		if(language === '' || language === undefined){
			setError("Enter the programming language");
			valid = false;
		}else if(question === '' || question === undefined){
			setError("Enter the question.");
			valid = false;

		}else if(option1 === '' || option1 === undefined){
			setError("Enter option1")
			valid = false;

		}else if(option2 === '' || option2 === undefined){
			setError("Enter option2")
			valid = false;

		}else if(option3 === '' || option3 === undefined){
			setError("Enter option3")
			valid = false;

		}else if(option4 === '' || option4 === undefined){
			setError("Enter option4")
			valid = false;

		}else if(correct === '' || correct === undefined){
			setError("Enter correct answer");
			valid = false;
		}else if(credit === '' || credit === undefined){
			setError("Please enter the creditor");
		}else if(correct !== option1 && correct !== option2 && correct !== option3 && correct !== option4){
			setError("Correct answer should match with options")
			valid = false;

		}else{
			setError('');
		}

		if(valid){
			const data = {
				language: language.toLowerCase(),
				question: question.toLowerCase(),
				options: [{option: option1.toLowerCase()},{option: option2.toLowerCase()},{option: option3.toLowerCase()},{option: option4.toLowerCase()}],
				correct: correct.toLowerCase(),
				credit: credit.toLowerCase()
			}
			
			axios.post("https://reviseapi.herokuapp.com/api/v1/questions/add",data).then(data => setSuccess(data.data)).catch(err => setSuccess(err));
			// axios.post("https://quiz-api.sy94.repl.co/api/v1/questions/add",data).then(data => setSuccess(data.data)).catch(err => setSuccess(err));

			setLanguage('');
			setQuestion('');
			setOption1('')
			setOption2('')
			setOption3('')
			setOption4('')
			setCorrect('');
			setCredit('');

			document.getElementById("input-form").reset();

		}
	}


	return (
		<Container className={`text ${classes.content}`}>
			{success.msg && <Alert severity="success">{success.msg}</Alert>}

			<Typography 
			variant="h6"
			color="textSecondary"
			component="h2"
			gutterBottom
			className={classes.title}
			>
				Add a new question.
			</Typography>

			{error && <div className={classes.error}>
				{error}
			</div>}

			<form id="input-form">

				<TextField 
				onChange={(e) => setLanguage(e.target.value)}
				className={classes.field}
				label="Language"
				multiline
				variant="outlined"
				fullWidth
				required/>

				<TextField 
				onChange={(e) => setQuestion(e.target.value)}
				className={classes.field}
				label="Question"
				multiline
				variant="outlined"
				fullWidth
				required/>

				<TextField 
				onChange={(e) => setOption1(e.target.value)}
				className={classes.field}
				label="Option1"
				multiline
				variant="outlined"
				fullWidth
				required/>

				<TextField 
				onChange={(e) => setOption2(e.target.value)}
				className={classes.field}
				label="Option2"
				multiline
				variant="outlined"
				fullWidth
				required/>

				<TextField 
				onChange={(e) => setOption3(e.target.value)}
				className={classes.field}
				label="Option3"
				multiline
				variant="outlined"
				fullWidth
				required/>

				<TextField 
				onChange={(e) => setOption4(e.target.value)}
				className={classes.field}
				label="Option4"
				multiline
				variant="outlined"
				fullWidth
				required/>

				<TextField 
				onChange={(e) => setCorrect(e.target.value)}
				className={classes.field}
				label="Correct Answer"
				multiline
				helperText="Make sure correct answer exist in options and match exactly."
				variant="outlined"
				fullWidth
				required/>

				<TextField 
				onChange={(e) => setCredit(e.target.value)}
				className={classes.field}
				label="Credit To"
				variant="outlined"
				fullWidth
				required/>

				<Submit variant="contained"  onClick={(e) => handleSubmit(e)}>Add Question</Submit>
			</form>
		</Container>
	)
}

export default AddQuestion;