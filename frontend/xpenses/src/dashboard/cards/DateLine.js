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
import environment from '../../environment';
import { getToken } from '../../auth/authDispatcher';

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
    // const chartData = callObservable(getDateLineData(period), (response)=> {
    //     return JSON.parse(response);
    // });
    const chartData = getDateLineData(period);
    console.log("Chart Data: ", chartData)
    return chartData
}

function DateLine(props) {
    const classes = useStyles()

    const {user} = useSelector(state => state.auth)

    const chartData = getChartData(90);

    return (
        <Card>
            <Chart data={getDateLineData} className={classes.chart}>
                <ArgumentAxis tickFormat={format} />
                <ValueAxis />
                <LineSeries
                    name="Spending"
                    valueField="sum"
                    argumentField="date"
                />
                <Title text="Spending over Time Period" />
                <Animation />
            </Chart>
        </Card>
    )
}

export default DateLine;