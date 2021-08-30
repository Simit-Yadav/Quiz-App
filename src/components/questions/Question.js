import React,{useState,useEffect} from 'react';
import {Typography,Button,Grid,Paper} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import WbIncandescentSharpIcon from '@material-ui/icons/WbIncandescentSharp';
import CodeIcon from '@material-ui/icons/Code';

const questions = {
	question: 'Size of int?',
	language: 'python',
	options: [
		{
			option: 1,
		},
		{
		option: 2,
		},
		{
		option: 3,
		},
		{
			option: 4
		}
	]
}

const useStyles = makeStyles((theme) => {
	return {
		container: {
			backgroundColor: '#FEEAFA',
			borderRadius: '1.5rem',
			width: '100%',
			marginBottom: '1.5rem',
		},
		content: {
			padding: '1rem',
		},
		button: {
			width: '100%',
			padding: theme.spacing(1.5),
			textAlign: 'center',
			color: '#FBF9FF',
			backgroundColor: '#B3B7EE',
			borderRadius: '1.5rem',
			'&:hover': {
				backgroundColor: '#A2A3BB',
			},
			'&:disabled':{
				color: '#311847',
			},
			fontSize: '1.2rem',
			border: '0px',
			color: '#311847',
			// lineHeight: '25px'
		},
		para: {
			paddingBottom: '1rem',
		},
		pad: {
			paddingTop: '11px'
		},
	}
})

const Question = ({item}) => {
	const {question,language,options,correct} = item;
	const classes = useStyles();
	const [selected,setSelected] = useState();
	const [right,setRight] = useState(false);


	const handleClick = (e) => {
		setSelected(e)
	}

	const setClass = (e) => {
		if(selected === e && selected == correct){
			return 'correct'
		}
		
		if(selected === e && selected !== correct){
			return 'wrong'
		}
		
		if(e ===  correct){
			return 'correct'
		}
		
		return ''
	}

	return (
		<div className={classes.container}>
			<div className={classes.content}>
				<Typography variant="h6">
					<WbIncandescentSharpIcon fontSize="large" className={classes.pad}/> {question.replace(/^\w/, c => c.toUpperCase())}
				</Typography>

				<p className={classes.para}><CodeIcon fontSize="large" className={classes.pad}/>   {language.toUpperCase()}</p>

				<Grid container spacing={3}>
					{options.map(option => {
						return <Grid item key={option.option} xs={12} md={6}>
							<Button disableElevation value={option.option} variant="contained" className={`${classes.button} ${selected && setClass(option.option)}`} onClick={() => handleClick(option.option)} disabled={selected}> {option.option}</Button>
						</Grid>
					})}
				</Grid>
			</div>
		</div>
	)
}

export default Question;