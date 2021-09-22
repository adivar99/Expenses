import http from "../shared/services/http-service"
import environment from '../environment';
// import {concatMap, map} from "rxjs/operators";

export const getCategoryPieData = () => {
    const url = environment.baseUrl + "/expense/getSummary"

    console.log("In dispatcher")
    const data = http.get(url)
        // .pipe(
        //     concatMap((data) => {
        //         return data
        //     })
        // );
    console.log(data)
    return data
}

export const getDateLineData = (period) => {
    const url = environment.baseUrl + "/expense/getByDate/" + period.toString()

    console.log("In dispatcher")
    const data = http.get(url)
        // .pipe(
        //     concatMap((data) => {
        //         return data
        //     })
        // );
    console.log(data)
    return data
}