import { IFood } from "../interfaces/food.interface";
import { groupBy } from "lodash"

export const sortByDateTime = (foodList: IFood[]) => {
    return foodList.sort(function (a, b) { return b?.datetime?.toDate()?.getTime() - a?.datetime?.toDate()?.getTime() });
}

export const filterFoodByPeriod = (foodList: IFood[], startDate: any, endDate: any): IFood[] => {
    let filteredList = foodList;
    if (startDate && endDate) {
        filteredList = filteredList.filter(
            (food) =>
                food?.datetime?.toDate()?.getTime() > new Date(startDate).getTime() &&
                food?.datetime?.toDate()?.getTime() < new Date(endDate).getTime()
        );
    }
    return filteredList;
};

export const groupFoodByUser = (foodList: IFood[]) => {
    return groupBy(foodList, "uid")
}

export const resetHours = (date: Date): Date => new Date(date.setHours(0, 0, 0, 0))

export const getDateOfDaysAgo = (numberDays: number): Date => {
    const currentDate = new Date()
    return resetHours(new Date(currentDate.setDate(currentDate.getDate() - numberDays)))
}

export const getDateRangeArray = (startDate: Date, endDate: Date) => {
    let dateOne = new Date(startDate);
    let dateTwo = new Date(endDate);
    const dates = []
    for (var i = dateOne; i <= dateTwo; i.setDate(i.getDate() + 1)) {
        dates.push(new Date(i))
    }
    return dates
}

export const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
