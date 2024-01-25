setInterval(clock,1000)
function clock() {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth();
    let day = time.getDate();
    let hour =  time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let status = "";
     /*am_pm = "AM";
 
    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }*/

    month += 1
    month = month < 10 ? "0" + month : month
    day = day < 10 ? "0" + day : day

    if (hour >= 5 && hour < 8){
        status = "morning"
    }
    else if (hour >= 8 && hour < 17) {
        status = "day"
    }
    else if (hour >= 17 || hour < 5){
        status = "night"
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = `${year}/${month}/${day}  ${hour}:${min}:${sec}`
 
    document.getElementById("clock")
            .innerHTML = currentTime;
    document.getElementById("clock")
            .className = status
            
            
}
clock();
