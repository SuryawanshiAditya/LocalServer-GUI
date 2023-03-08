// components
let controlBtn = document.getElementById("control-btn");
let selectBtn = document.querySelector("input[type=file]");
let selectMessage = document.getElementById("choose-file-msg");
let fileInfoContainer = document.querySelector(".selected-file");
let processingAnimation = document.getElementById("processing-animation");

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
  handleSelectFile();
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

async function startServer() {
  controlBtn.style.display = "none";
  processingAnimation.style.display = "flex";

  await sleep(5000);
  processingAnimation.style.display = "none";

  controlBtn.innerText = "Terminate Server";
  controlBtn.style.background = "#f36760";
  controlBtn.style.display = "flex";
}

function terminateServer() {
  // controlBtn.innerText = "Start Server";
  // controlBtn.style.background = "rgb(87, 205, 168)";
  location.reload();
}

function handleSelectFile() {
  // data
  let selectedFile = selectBtn.files[0];
  let fileName = selectedFile.name;
  let fileSize = selectedFile.size;
  fileSize = formatBytes(fileSize);

  // frontend
  let fileNameContainer = document.getElementById("displayFileName");
  let fileSizeContainer = document.getElementById("displayFileSize");
  fileNameContainer.innerText = fileName;
  fileSizeContainer.innerText = fileSize;
  fileInfoContainer.style.display = "flex";

  console.log(selectedFile);
  console.log(fileName);
  console.log(fileSize);
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return bytes + " bytes";
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + " MB";
  } else {
    return (bytes / 1073741824).toFixed(2) + " GB";
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
