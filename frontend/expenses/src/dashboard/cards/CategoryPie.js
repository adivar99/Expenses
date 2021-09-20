import {
    React,
    makeStyles,
    Chart,
    PieSeries,
    Title,
    Container,
    Paper,
    useSelector,
} from '../../component'

import { getCategoryPieData } from '../cardDispatcher';
import { appNotification } from '../../shared/notification/app-notification'

const useStyles = makeStyles((theme) => ({

    container: {
        padding: theme.spacing(3, 0, 2),
    },
    chart: {

    }

}));

function callObservable(subscriberMethod, callback) {
    subscriberMethod
        .subscribe((response) => {
            callback(response)
        }, (error => {
            appNotification.showError(error.toString())
        }))
}

function getChartData() {
    // const chartData = callObservable(getCategoryPieData(), (response)=> {
    //     return response;
    // });
    const chartData = getCategoryPieData();
    console.log("Chart Data: ")
    console.log(chartData)
    return chartData
}

function CategoryPie() {
    const classes = useStyles()

    const {user} = useSelector(state => state.auth)

    const chartData = getChartData();

    return (
        <Paper>
            <Chart maxWidth="xs" data={chartData} className={classes.chart}>
                <PieSeries valueField="category" argumentField="sum" />
                <Title text="Categories" />
            </Chart>
        </Paper>
    )
}

export default CategoryPie