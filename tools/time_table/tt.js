var at = document.getElementById("add_time");

var awtd = document.getElementById("add_wtd")

var clst = document.getElementById("cls_t");

var clsw = document.getElementById("cls_w");

var save_t = document.getElementById("add_t_b");

var mode_s = document.getElementById("mode");

var type_setting; //模式
var unit_setting; //小時單位
var rest_setting; //短休息

function start_loop() {
    setInterval(update_diff,100);
}

function update_diff() {
    let diff_table = ["簡單","容易","普通","困難","超難"];
    document.getElementById("diff_dis").innerHTML = diff_table[parseInt(document.getElementById("diff").value)-1];
}

function add_time() {
    at.style.display = "block";
}

function add_wtd() {
    awtd.style.display = "block";
}

function select_mode() {
    mode_s.style.display = "block";
}

function close_entry() {
    at.style.display = "none";
    awtd.style.display = "none";
    mode_s.style.display = "none";
}  

function save_time() {
    let tm1 = document.getElementById("add_t1");
    let tm2 = document.getElementById("add_t2");
    let warning = document.getElementById("time_w");
    let storage = localStorage.getItem("tt_times");
    let check = true;
    let storage_val;
    if (tm1.value != "" && tm2.value != "") {
        if (tm1.value < tm2.value) {
            if (storage != null){
                storage_val = storage.split(",")
                for (let i=0;i<storage_val.length;i+=2) {
                    if ((tm1.value > storage_val[i] && tm1.value < storage_val[i+1]) || (tm2.value > storage_val[i] && tm2.value < storage_val[i+1]) || (tm1.value < storage_val[i] && tm2.value > storage_val[i+1])) {
                        warning.innerHTML = "時間不能重複";
                        check = false
                        break;
                    }
                }
            }
            if (check) {
                warning.innerHTML = "";
                let lst = tm1.value+","+tm2.value
                let ind;
                if (storage == null || storage == "") {
                    localStorage.setItem("tt_times",lst);
                }else{
                    for (let i=0;i<storage_val.length;i+=2) {
                        if (tm2.value<=storage_val[i]) {
                            storage_val = [...storage_val.slice(0,i),tm1.value,tm2.value,...storage_val.slice(i)];
                            break;
                        }else if (i == storage_val.length-2){
                            storage_val = [...storage_val.slice(0,i+2),tm1.value,tm2.value,...storage_val.slice(i+2)];
                            break;
                        }
                    }
                    localStorage.setItem("tt_times",storage_val);
                }
                update_time_table();
                tm1.value = "";
                tm2.value = "";
            }
        }else{
            warning.innerHTML = "請確認時間先後順序";
        }
    }else{
        warning.innerHTML = "請輸入完整";
    }
}

function update_time_table() {
    let table = document.getElementById("tt");
    let storage = localStorage.getItem("tt_times") != null && localStorage.getItem("tt_times") != "" ? localStorage.getItem("tt_times").split(",") : ["",""];
    let code = "<tr><th>時間</th><th>刪除</th></tr>";
    for (let i=0;i<storage.length;i+=2) {
        code += `<tr><td>${storage[i]}-${storage[i+1]}</td><td class="delete" onclick="del_time(${i});">🗑️</td></tr>`;
    }
    table.innerHTML = code;
}

function del_time(index) {
    let storage_val = localStorage.getItem("tt_times").split(",");
    if (confirm(`確定刪除 ${storage_val[index]}-${storage_val[index+1]}?`)) {
        storage_val = [...storage_val.slice(0,index),...storage_val.slice(index+2)];
        localStorage.setItem("tt_times",storage_val);
        update_time_table();
    }
}

function save_wtd() {
    let name = document.getElementById("add_wtd_in");
    let diff = document.getElementById("diff");
    let warning = document.getElementById("wtd_w");
    let storage = localStorage.getItem("tt_wtd");
    let check = true;
    if (name.value != "") {
        warning.innerHTML = "";
        if (storage != null && storage != "") {
            let storage_val = storage.split(",");
            console.log(storage_val)
            for (let i=0;i<storage_val.length;i+=2) {
                if (name.value == storage_val[i]) {
                    check = confirm(`${name.value}已經存在，是否繼續添加?`);
                    break;
                }
            }

            if (check) {
                for (i=0;i<storage_val.length;i+=2) {
                    if (diff.value<=storage_val[i+1]) {
                        storage_val = [...storage_val.slice(0,i),name.value,diff.value,...storage_val.slice(i)];
                        break;
                    }else if (i == storage_val.length-2){
                        storage_val = [...storage_val.slice(0,i+2),name.value,diff.value,...storage_val.slice(i+2)];
                        break;
                    }
                }
                localStorage.setItem("tt_wtd",storage_val);
            }
        }else{
            localStorage.setItem("tt_wtd",name.value+","+diff.value);
        }
        name.value = "";
        update_wtd_table();
    }else{
        warning.innerHTML = "事件名稱不得空白";
    }
}

function update_wtd_table() {
    let table = document.getElementById("wtd");
    let storage = localStorage.getItem("tt_wtd") != null && localStorage.getItem("tt_wtd") != "" ? localStorage.getItem("tt_wtd").split(",") : ["",""];
    let code = "<tr><th>事項</th><th>難度</th><th>刪除</th></tr>";
    for (let i=0;i<storage.length;i+=2) {
        code += `<tr><td>${storage[i]}</td><td>${storage[i+1]}</td><td class="delete" onclick="del_wtd(${i});">🗑️</td></tr>`;
    }
    table.innerHTML = code;
}

function del_wtd(index) {
    let storage_val = localStorage.getItem("tt_wtd").split(",");
    if (confirm(`確定刪除 ${storage_val[index]}?`)) {
        storage_val = [...storage_val.slice(0,index),...storage_val.slice(index+2)];
        localStorage.setItem("tt_wtd",storage_val);
        update_wtd_table();
    }
}

function read_option() {
    let order = document.getElementsByName("order");
    let rest = document.getElementsByName("rest");
    
}

function get_time_diff(time1,time2) {
    let tm1 = time1.split(":");
    let tm2 = time2.split(":");
    return (tm2[0]-tm1[0])*60+(tm2[1]-tm1[1]);
}

function add_on_time(time,delta) {
    //console.log(delta)
    let tm = time.split(":");
    tm = tm.map((x) => parseInt(x));
    tm[1] += parseInt(delta);
    if (tm[1] >= 60) {
        tm[0] += Math.floor(tm[1]/60);
        tm[1] = tm[1]%60;
    }
    tm[0] = tm[0]<10 ? "0" + new String(tm[0]) : tm[0]
    tm[1] = tm[1]<10 ? "0" + new String(tm[1]) : tm[1]
    return tm[0]+":"+tm[1];
}

function get_config() {
    let type_select = document.getElementsByName("type");
    let unit_select = document.getElementsByName("unit");
    let rest_select = document.getElementsByName("rest");
    for (let i=0;i<type_select.length;i++){
        if (type_select[i].checked) {
            type_setting = type_select[i].value; //模式
            break;
        }
    }
    for (let i=0;i<unit_select.length;i++) {
        if (unit_select[i].checked) {
            unit_setting = unit_select[i].value; //小時單位
            break;
        }
    }
    for (let i=0;i<rest_select.length;i++) {
        if (rest_select[i].checked) {
            rest_setting = rest_select[i].value; //休息
            break;
        }
    }
}

function calculate_time() {
    let all_time = 0;
    let all_task_diff = 0;
    let time_list = localStorage.getItem("tt_times").split(",");
    let task_list = localStorage.getItem("tt_wtd").split(",");
    let ptt = time_list[0];
    let result = document.getElementById("result");
    get_config();
    for (let i=0;i<time_list.length;i+=2) {
        all_time += get_time_diff(time_list[i],time_list[i+1]);
    }
    for (i=0;i<task_list.length;i+=2) {
        all_task_diff += parseInt(task_list[i+1]);
    }
    console.log(all_time);
    all_time -= (task_list.length-1)*rest_setting;
    console.log(all_time);
    //console.log("all task diff",all_task_diff);
    let res = "<tr><th>事項</th><th>時間</th></tr>"
    let unit_time = Math.floor(all_time/all_task_diff)
    for (i=0;i<task_list.length;i+=2) { //to be fixed
        //console.log(unit_time*parseInt(task_list[i+1]));
        res += `<tr><td>${task_list[i]}</td><td>${ptt+"-"+add_on_time(ptt,unit_time*parseInt(task_list[i+1]))}</td></tr>`
        //console.log(task_list[i]+": "+ptt+"-"+add_on_time(ptt,Math.floor((all_time/all_task_diff)*(0.8)*parseInt(task_list[i+1]))));
        ptt = add_on_time(ptt,unit_time*parseInt(task_list[i+1]));
        if (i < task_list.length-2) {
            res += `<tr><td class="rest">休息</td><td class="rest">${ptt+"-"+add_on_time(ptt,rest_setting)}</td></tr>`
            //console.log("休息: "+ptt+"-"+add_on_time(ptt,Math.floor((all_time/all_task_diff)*(0.2))));
            ptt = add_on_time(ptt,rest_setting);
        }
    }
    result.innerHTML = res;
}