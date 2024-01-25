var modal = document.getElementById("sleep");

var span = document.getElementsByClassName("close")[0];

window.onclick = function() {
    modal.style.display = "none";
}

window.addEventListener("keydown",close);

function close(event) {
    if (event.code == "Escape"){
        modal.style.display = "none";
    }
}

function check_time() {
    let time = new Date();
    h = time.getHours();
    last_show = localStorage.getItem("last_sleep_w");
    if (time.getDate() != last_show && (h > 22 || h < 6)) {
        modal.style.display = "block";
        localStorage.setItem("last_sleep_w",time.getDate());
    }
}




/*
// Get the modal
var modal = document.getElementById("sleep");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.addEventListener("keydown",close);

function close(event) {
    console.log(event.code)
    if (event.code == "Escape"){
        modal.style.display = "none";
    }
}*/