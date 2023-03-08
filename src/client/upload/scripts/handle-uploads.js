const startServerBtn = document.querySelector("#control-btn");
const uploadForm = document.querySelector("#upload-form");
let linkWrapper = document.querySelector(".link-wrapper")

startServerBtn.addEventListener("click", e => {

    // upload the files
    e.preventDefault();

    // get the form data
    const formData = new FormData(uploadForm);

    // upload the file to the server
    fetch("/upload-file", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error('Error:', error));


    // get the link
    fetch("/generate-link")
        .then(response => response.json())
        .then(data => {
            // if the link is successfully generated
            if (data.status) {
                console.log(data);
                linkWrapper.innerHTML = `http://${data.link}/download`
            }
            // if there is an error to generate the link
            else {
                linkWrapper.innerHTML = `404`
            }
        });

});
