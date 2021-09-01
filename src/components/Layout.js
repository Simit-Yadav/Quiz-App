import React, { useState, useEffect } from 'react';
import { Typography, Container } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useHistory,useLocation } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';

var drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex',
			backgroundColor: '#E2C391',
			minHeight: '100vh',
		},
		toolbar: theme.mixins.toolbar,
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
			textAlign: "center",
		},
		drawerPaper: {
			width: drawerWidth,
			backgroundColor: '#E2C391'
		},
		appBar: {
			[theme.breakpoints.up('sm')]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
			backgroundColor: '#414361'
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		headerTitle: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			textAlign: 'center',
			display: 'block',
			fontSize: '2rem',
			textDecoration: 'none',
			color: '#311847'
		},
		active: {
			background: '#f9f9f9',
		},
		content: {
			// width: '100vw',
			marginLeft: 'auto',
			marginRight: 'auto',
			padding: theme.spacing(3)
  		},
		title: {
			flexGrow: 1,
		},
		drawerColor: {
			backgroundColor: '#E2C391',
			// height: '100vh',
			color: '#311847',
		},
		divider: {
			height: '2px',
			borderRadius: '2.5rem'
		}
	}
})



const Layout = ({children}) => {
	const classes = useStyles();
	const theme = useTheme();
	const history = useHistory();
	const location = useLocation();
	const path = location.pathname !== "/" ? location.pathname.slice(1).toUpperCase() : "Welcome";
	const [mobileOpen, setMobileOpen] = useState(false);
	const [currentLanguage,setCurrentLanguage] = useState(path);
	const [list,setList] = useState([]);


	useEffect(() => {
			axios.get("https://reviseapi.herokuapp.com/api/v1/questions")
			.then(res => setList(res.data));			
	},[])

	const handleDrawerToggle = () => {
    	setMobileOpen(!mobileOpen);
  	};

	  
	const handleListClick = (item) => {
		if(path !== 'add'){
			setCurrentLanguage(item !== "" ? item.toUpperCase() : "Welcome")
		}

		history.push(`/${item}`);
	}

	


	const drawer =  (
		<div className={classes.drawerColor}>
			<Typography component={Link} to="/" onClick={() => handleListClick("")} className={classes.headerTitle}>
				Lets's Revise
			</Typography>
			<List>
				{list.length && list.map((item) => {
						return( 
							<>
							<ListItem button key={item} onClick={() => handleListClick(item)}>
							<ListItemText primary={item.replace(/^\w/, c => c.toUpperCase())} />
							</ListItem>
							<Divider className={classes.divider}/>
							</>
						)
				})}
			</List>
		</div>
	);



	return (
		<div className={classes.root}>
			<CssBaseline/>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton color="inherit" aria-label="open drawer" edge="start"
					onClick={handleDrawerToggle} className={classes.menuButton}>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" noWrap className={classes.title}>
						{location.pathname === '/add' ? "Add Something New" : currentLanguage}
					</Typography>
					<AddCircleIcon onClick={() => handleListClick('add')}/>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="Programming Language">
				<Hidden smUp implementation="css">
				<Drawer
					variant="temporary"
					anchor={theme.direction === 'rtl' ? 'right' : 'left'}
					open={mobileOpen}
					onClose={handleDrawerToggle}
					classes={{
					paper: classes.drawerPaper,
					}}
					ModalProps={{
					keepMounted: true, // Better open performance on mobile.
					}}
				>
					{drawer}
				</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
						paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main style={{width: '100%'}}>
				<div className={classes.toolbar}/>
				<Container className={classes.content}>
					{children}
				</Container>
			</main>
		</div>
	)
}


export default Layout;