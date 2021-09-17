import { Button, Container, Link, CssBaseline, Grid, TextField, Typography, makeStyles, useDispatch } from "../component";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";

import environment from "../environment";
import {clearAuthToken, doLogin} from "./authDispatcher";
import { LOGIN } from "./authStore";
import {appNotification} from "../shared/notification/app-notification";
// import { CssBaseline, Grid, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login(props) {

    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch()


    const [username, set_username] = useState("")
    const [password, set_password] = useState("")

    function callObservable(subscriberMethod, callback) {
        subscriberMethod
            .subscribe((response) => {
                callback(response)
            }, (error => {
                appNotification.showError(error.toString())
            }))
    }


    async function login(event) {
        event.preventDefault();
        console.log("userName", username)
        const loginRequest = {}
        
        loginRequest.username = username;
        loginRequest.password = password;

        const loginUrl = environment.baseUrl + "/auth/login"

        callObservable(doLogin(loginRequest), (response)=>{

                const currentUser = response.user
                const token = response.token

                console.log("response:");
                console.log(response);

                dispatch({type: LOGIN, "payload": response});
                history.push("/profile")
            })
        }

        return  (
            <Container component="main" maxwidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Login in
                    </Typography>
                    <form className={classes.form} onSubmit={login} noValidate>
                        <Grid item xs="12">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onInput={e => {
                                    set_username(e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs="12">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onInput={e => set_password(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs="12">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid container>
                            <Link href="#" to="/register" variant="body2">
                                {"Dont have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
}

export default Login