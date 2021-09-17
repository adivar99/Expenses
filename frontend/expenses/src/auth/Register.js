import {
    Button,
    Checkbox,
    Container,
    Grid,
    Link,
    makeStyles,
    React,
    TextField,
    Typography,
    useHistory,
    useState
} from "../component";
import { appNotification } from "../shared/notification/app-notification";
import { doRegisterUser } from "./authDispatcher";
import { LOGIN } from "./authStore";
import {useDispatch} from "react-redux";
import { FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Register() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()

    const [username, setUsername] = useState('jdoe21');
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState('jdoe21@example.com');
    const [password, setPassword] = useState('password');
    const [cpassword, setCPassword] = useState('password');

    const [isAgreed, setIsAgreed] = useState(false);


    function callObservable(subscriberMethod, callback) {
        subscriberMethod
            .subscribe((response) => {
                callback(response)
            }, (error => {
                appNotification.showError(error.toString())
            }))
    }

    function registerUser(payload) {
        callObservable(doRegisterUser(payload), (response)=>{
            const currentUser = response.user
            const token = response.token

            appNotification.showSuccess("Successfully Registered")
            dispatch({type: LOGIN, "payload": response});
            history.push("/profile")

        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        const payload = {
            name,
            username,
            email,
            password,
            cpassword
        }

        if(!isAgreed){
            appNotification.showError("Please agree to the terms and conditions")
            return;
        }
        if(cpassword !== password) {
            appNotification.showError("Passwords do not match")
            return;
        }

        registerUser(payload);
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Register Here
                        <hr/>
                    </Typography>

                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    value={name}
                                    onInput={e => setName(e.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="username"
                                    value={username}
                                    onInput={e => setUsername(e.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    value={email}
                                    onInput={e => setEmail(e.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    value={password}
                                    onInput={e => setPassword(e.target.value)}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    value={cpassword}
                                    onInput={e => setCPassword(e.target.value)}
                                    required
                                    fullWidth
                                    name="cpassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="cpassword"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    id="agreecondition"
                                    control={<Checkbox checked={isAgreed} onChange={e => {
                                        setIsAgreed(e.target.checked)
                                    }} value="allowExtraEmails" color="primary" />}
                                    label="I agree to the Terms and Conditions."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Register
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default Register