import { AppBar, Button, Link, React, ToolBar,useDispatch,useHistory,useSelector } from './index'
import {makeStyles} from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    '@global': {
        body: {
            backgroundColor: '#e6e6e6'
        },
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `3px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    activeLink: {
        margin: theme.spacing(1, 1.5),
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            color: '#3f51b5',
            backgroundColor: '#ffffff',
            border: '1px solid #3f51b5'
        },
    },
}))

function navbar(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    function logout() {
        doLogOut(dispatch, history)
    }

    const classes = useStyles();
    const {user, token, isLoggedIn, roles} = useSelector(state => state.auth);

    const isNotLoggedIn = !isLoggedIn

    const allMenus = [
        {url: "/dashboard"}
    ]
}

export default navbar