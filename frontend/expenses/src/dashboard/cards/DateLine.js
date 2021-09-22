import {
    React,
    makeStyles,
    Chart,
    LineSeries,
    ArgumentAxis,
    ValueAxis,
    Title,
    Animation,
    Card,
    useSelector,
} from '../../component'

import { getDateLineData } from '../cardDispatcher';
import { appNotification } from '../../shared/notification/app-notification'

const format = () => tick => tick;

const useStyles = makeStyles((theme) => ({

    container: {
        padding: theme.spacing(3, 0, 2),
    },
    chart: {

    }

}));

const ValueLabel = (props) => {
    const { text } = props;
    return (
      <ValueAxis.Label
        {...props}
        text={`${text}%`}
      />
    );
  };

function callObservable(subscriberMethod, callback) {
    subscriberMethod
        .subscribe((response) => {
            callback(response)
        }, (error => {
            appNotification.showError(error.toString())
        }))
}

function getChartData(period) {
    // const chartData = callObservable(getCategoryPieData(), (response)=> {
    //     return response;
    // });
    const chartData = getDateLineData(period);
    console.log("Chart Data: ")
    console.log(chartData)
    return chartData
}

function CategoryPie(props) {
    const classes = useStyles()

    const {user} = useSelector(state => state.auth)

    const chartData = getChartData(7);

    return (
        <Card>
            <Chart maxWidth="xs" data={chartData} className={classes.chart}>
                <ArgumentAxis tickFormat={format} />
                <ValueAxis
                    max={50}
                    labelComponent={ValueLabel}
                />
                <LineSeries
                    name="Spending"
                    valueField="Sum"
                    argumentField="Date"
                />
                <Title text="Spending over Time Period" />
                <Animation />
            </Chart>
        </Card>
    )
}

export default CategoryPie