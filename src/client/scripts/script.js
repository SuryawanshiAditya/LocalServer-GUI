// components
let controlBtn = document.getElementById("control-btn");
let selectBtn = document.querySelector("input[type=file]");
let selectMessage = document.getElementById("choose-file-msg");

// set control button state
controlBtn.addEventListener("click", () => {
  let state = checkControlState("control-btn");
  if (state == "up") {
    terminateServer();
  } else if (state == "down") {
    startServer();
  }
});

//handle select file
selectBtn.addEventListener("change", (e) => {
  let selectedFile = selectBtn.files[0];
  console.log(selectedFile);
  let fileName = selectedFile.name;
  let fileSize = selectedFile.size;
  console.log(fileName);
  console.log(fileSize);
});

// helper functions
function checkControlState(id) {
  let controlBtn = document.getElementById(id);
  if (controlBtn.innerText == "Start Server") {
    return "down";
  } else if (controlBtn.innerText == "Terminate Server") {
    return "up";
  }
}

function startServer() {
  controlBtn.innerText = "Terminate Server";
  controlBtn.style.background = "#f36760";
}

function terminateServer() {
  controlBtn.innerText = "Start Server";
  controlBtn.style.background = "rgb(87, 205, 168)";
}

function handleSelectFile() {
  selectMessage.innerText = selectBtn.value;
}
