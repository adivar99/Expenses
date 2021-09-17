import {
    Container,
    Grid,
    makeStyles,
    Paper,
    React,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    useSelector,
} from "../component"

const useStyles = makeStyles((theme) => ({

    heroContent: {
        padding: theme.spacing(3, 0, 2),
    },

}));

function Profile() {

    const classes = useStyles();

    const {user} = useSelector(state => state.auth);

    const profileData = [
        {
            label: "Name",
            value: user.name
        },
        {
            label: "Email",
            value: user.email
        },
        {
            label: "Username",
            value: user.username
        }
    ]

    return (
        <React.Fragment>
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <h1>
                    Hi {user.name}, your  Profile Details
            </h1>
                <hr />
            </Container>
            <Container maxWidth="md">
                <Grid justifyContent="center"
                    container>
                    <Grid md={8} item>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">

                                <TableBody>
                                    {profileData.map((row,index) => (
                                        <TableRow key={index}>

                                            <TableCell align="left">
                                                <strong>{row.label}</strong>
                                            </TableCell>

                                            <TableCell align="left">{row.value}</TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Grid>
                </Grid>
            </Container>

        </React.Fragment>
    )
}

export default Profile
