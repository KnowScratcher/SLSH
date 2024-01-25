setInterval(get_weather,43200000);//43200000
function get_weather() {
    if(document.readyState == 'complete'){
        const Http = new XMLHttpRequest();
        const url='https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-057?Authorization=CWA-FF78208A-EA07-4AB8-B696-2EA738026DD1&format=JSON&elementName=Wx,AT,T,PoP6h';
        let index = ""
        let datas = [[]];
        let indata = [];
        let out = '<colgroup><col span="1" style="background-color: #404040">';
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            document.getElementById("getting")
                    .innerHTML = "正在連線中央氣象<strong>署</strong>...(若一直停在這裡，請檢查網路連線)";
            let response = JSON.parse(Http.responseText);
            //console.log(response["records"]["locations"][0]["location"][0]["weatherElement"][2]["time"][0]["elementValue"][0]["value"])
            base = response["records"]["locations"][0]["location"][0]["weatherElement"];
            for (let i in base) {
                elementname = base[i]["elementName"];
                //console.log(elementname);
                times = base[i]["time"];
                if (elementname == "Wx" || elementname == "PoP6h") {
                    index = "startTime";
                }else if (elementname == "AT" || elementname == "T") {
                    index = "dataTime";
                }

                for (let j in times) {
                    //console.log(times[j][index]/*time*/+":"+times[j]["elementValue"][0]["value"]);
                    if (datas.length == 1) {
                        datas[0].push(times[j][index]);
                    }
                    indata.push(times[j]["elementValue"][0]["value"]);
                    if (elementname == "PoP6h"){
                        indata.push(times[j]["elementValue"][0]["value"]);
                    }
                }
                if (datas.length < 5){datas.push(indata);}
                indata = [];
            }
            console.log(datas)
            if (out.length <= 58){
                for (k in datas[0]) { //k = 0-31
                    out += `<tr><td>${datas[0][k]}</td><td>${datas[1][k]}</td><td>${datas[2][k]}</td><td>${datas[3][k]}</td><td>${datas[4][k]}</td>`;
                }
                out += "<tr><td>資料結尾</td></tr>";
            }
            
            document.getElementById("weather")
                    .innerHTML = out;
            document.getElementById("getting")
                    .innerHTML = "";


            const time_chart = datas[0]
            const feel_chart = datas[2]
            const temp_chart = datas[3]
            const rain_chart = datas[4]
            Chart.defaults.global.defaultFontColor = "#ffffff";
            new Chart("temp", {
                type: "line",
                data: {
                    labels: time_chart,
                    datasets: [{
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        data: temp_chart
                    }]
                },
                options: {
                    legend: {display: false},
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color:"rgba(255,255,255,0.3)"
                            }}],
                        yAxes: [{
                            gridLines: {
                                color:"rgba(255,255,255,0.3)"
                            }
                        }]
                    }
                }
            });

            new Chart("feel", {
                type: "line",
                data: {
                    labels: time_chart,
                    datasets: [{
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        data: feel_chart
                    }]
                },
                options: {
                    legend: {display: false},
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color:"rgba(255,255,255,0.3)"
                            }}],
                        yAxes: [{
                            gridLines: {
                                color:"rgba(255,255,255,0.3)"
                            }
                        }]
                    }
                }
            });

            new Chart("rain", {
                type: "line",
                data: {
                    labels: time_chart,
                    datasets: [{
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        data: rain_chart
                    }]
                },
                options: {
                    legend: {display: false},
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color:"rgba(255,255,255,0.3)"
                            }}],
                        yAxes: [{
                            gridLines: {
                                color:"rgba(255,255,255,0.3)"
                            }
                        }]
                    }
                }
            });

        }
    
    /* 
    weatherElement(list):
        (0)=Wx 天氣現象(dict):
            time(list):
                (n)=time'(dict):
                    **startTime**
                    elementValue(list):
                        (0)=value(dict):
                            **value**

        (1)=AT 體感溫度(dict):
            time(list):
                (n)=time(dict):
                    **startTime**
                    elementValue(list):
                        (0)=value(dict):
                            **value**

        (1)=T 溫度(dict):
            time(list):
                (n)=time(dict):
                    **startTime**
                    elementValue(list):
                        (0)=value(dict):
                            **value**

        (1)=PoP6h 6小時降雨機率(dict):
            time(list):
                (n)=time(dict):
                    **startTime**
                    elementValue(list):
                        (0)=value(dict):
                            **value**

        
    */
}
}