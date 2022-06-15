import {
    React,
    makeStyles,
    Grid,
    useSelector,
    Container
} from '../component';

import CategoryPie from './cards/CategoryPie';
import DateLine from './cards/DateLine';

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
                {/* <CategoryPie period={7} /> */}
                {/* <DateLine period={7} /> */}
            </Container>
        </React.Fragment>
    )
}

export default Dashboard
