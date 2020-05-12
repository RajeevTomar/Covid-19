export default class Utils {

    static monthArr = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    static monthShortArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul",
    "Aug","Sep","Oct","Nov","Dec"];

    
    static getFormattedDateStr(dateStr)
    {
        let dateArr = dateStr.split('-'); 
        return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0];
    }

    static getFormattedDate(date,delimiter) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var newDate = dd + delimiter + mm + delimiter + yyyy;
        return newDate;
    }


    static getMonth(date)
    {
        var month = date.getMonth();
        return this.monthArr[month];
    }

    static getMonthStr(monthInt)
    {
        return this.monthShortArr[monthInt];
    }


    static stringToDate(date,format,delimiter)
    {
            var formatLowerCase=format.toLowerCase();
            var formatItems=formatLowerCase.split(delimiter);
            var dateItems=date.split(delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
    }

}