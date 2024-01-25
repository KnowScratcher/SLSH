setInterval(clock,1000)
let pause = 1;
let mode = 0;
let time = 1500; //1500
let auto_s = false;
let all_time = 0;
let load_done = false;
function clock() {
    c = document.getElementById("clock");
    s = document.getElementById("status");
    ding = document.getElementById("timeup");
    all_t = document.getElementById("all_time");
    if (pause == 0){
        if (time>0){
            time--;
            if (mode == 0) {
            all_time++;
            save_at(all_time);
            }
        }else{
            if (mode == 0){
                ding.play();
                mode = 1;
                time = 300; //300
                s.innerHTML = "休息時間"
            }else{
                ding.play();
                mode = 0;
                time = 1500;
                s.innerHTML = "專心時間"
            }
            if (!(auto_s)) {
                pause = 1;
            }
            
        }
        c.innerHTML = `${Math.floor(time/60)}:${time%60}`;
        all_t.innerHTML = `${Math.floor(all_time/60)}:${all_time%60}`;
    }
}

function save_at(v) {
    localStorage.setItem("all_time",v)
}

function load_at() {
    all_time = localStorage.getItem("all_time") != null ? parseInt(localStorage.getItem("all_time")) : 0;
    document.getElementById("all_time").innerHTML = `${Math.floor(all_time/60)}:${all_time%60}`;
}

function ps() {
    psb = document.getElementById("ps")
    if (pause == 0){
        pause = 1;
        psb.innerHTML = "開始";
    }else{
        pause = 0;
        psb.innerHTML = "暫停";
    }
}

function restart_session() {
    c = document.getElementById("clock");
    psb = document.getElementById("ps")
    pause = 1;
    if (mode == 0){
        time = 1500; //1500
        c.innerHTML = `${Math.floor(time/60)}:${time%60}`;
    }else{
        time = 300; //300
        c.innerHTML = `${Math.floor(time/60)}:${time%60}`;
    }
    psb.innerHTML = "開始"
}

function reset_all() {
    c = document.getElementById("clock");
    psb = document.getElementById("ps")
    pause = 1;
    mode = 0;
    time = 1500; //1500
    c.innerHTML = `${Math.floor(time/60)}:${time%60}`;
    psb.innerHTML = "開始"
}

function auto_start() {
    ats = document.getElementById("autostart");
    if (auto_s) {
        auto_s = false;
        ats.innerHTML = "自動開始:關閉"
    }else{
        auto_s = true;
        ats.innerHTML = "自動開始:開啟"
    }
}

setInterval(volume,100)

function volume() {
    if (load_done) {
        vol = document.getElementById("vol").value;
        document.getElementById("volume").innerHTML = vol;
        document.getElementById('timeup').volume = vol/100
        localStorage.setItem("tomato_vol",vol);
    }
}

function load_vol() {
    vol = localStorage.getItem("tomato_vol") != null ? parseInt(localStorage.getItem("tomato_vol")) : 100;
    document.getElementById("vol").value = vol
    document.getElementById("volume").innerHTML = vol;
    document.getElementById('timeup').volume = vol/100
    load_done = true;
}