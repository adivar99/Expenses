import http from "../shared/services/http-service"
import environment from '../environment';
// import {concatMap, map} from "rxjs/operators";
import { appNotification } from '../shared/notification/app-notification'

export const getCategoryPieData = () => {
    const url = environment.baseUrl + "/expense/getSummary"

    console.log("In dispatcher")
    const data = http.get(url)
        .subscribe((response) => {
            console.log("CategoryPieData:", response)
            appNotification.showSuccess("Data pull Success!")
        }
        );
    console.log("data:", data)
    return data
}

export const getDateLineData = (period) => {
    const url = environment.baseUrl + "/expense/getByDate/90"// + period.toString()

    console.log("In dispatcher")
    return http.get(url)
        .subscribe((response) =>{
            console.log("DateLineData:", response)
            appNotification.showSuccess("Data pull Success!")
        });
}