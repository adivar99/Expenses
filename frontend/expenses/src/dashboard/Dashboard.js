import {
    React,
    makeStyles,
    Grid,
    useSelector,
    Container
} from '../component';

import CategoryPie from './cards/CategoryPie';

const useStyles = makeStyles((theme) => ({

    container: {
        padding: theme.spacing(3, 0, 2),
    },

}));

function Dashboard() {
    const classes = useStyles()

    const {user} = useSelector(state => state.auth)

    console.log("in dashboard")

    return (
        <React.Fragment>
            <Container component="main" className={classes.container}>
                <Grid>
                    <CategoryPie />
                </Grid>
            </Container>
        </React.Fragment>
    )
}

export default Dashboard
