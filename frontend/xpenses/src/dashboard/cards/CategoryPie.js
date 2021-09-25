import {
    React,
    makeStyles,
    Chart,
    PieSeries,
    Title,
    Card,
    useSelector,
    Animation,
} from '../../component'

import { getCategoryPieData } from '../cardDispatcher';
import { appNotification } from '../../shared/notification/app-notification'
import { of } from 'rxjs';

const useStyles = makeStyles((theme) => ({

    container: {
        padding: theme.spacing(3, 0, 2),
        backgroundColor: "#000000",
    },
    chart: {
        xs: 12,
        borderColor: "green"
    }

}));

const data = [
    { country: 'Russia', area: 12 },
    { country: 'Canada', area: 7 },
    { country: 'USA', area: 7 },
    { country: 'China', area: 7 },
    { country: 'Brazil', area: 6 },
    { country: 'Australia', area: 5 },
    { country: 'India', area: 2 },
    { country: 'Others', area: 55 },
  ];

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

    const chartData = of(data).forEach((response) => {
        const dataObject = {}

        dataObject.country = response.country
        dataObject.area = response.area

        return dataObject;
    })

    const classes = useStyles()

    const {user} = useSelector(state => state.auth)

    // const chartData = getChartData();
    console.log("data:", data)

    return (
        <Card>
            <Chart xs={12} data={getCategoryPieData()} className={classes.chart}>
                <PieSeries valueField="country" argumentField="area" />
                <Title text="Countries" />
                <Animation />
            </Chart>
        </Card>
    )
}

export default CategoryPie