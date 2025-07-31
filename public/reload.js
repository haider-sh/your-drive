const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", reloadPage);

const fileInput = document.querySelector("#file");

function reloadPage() {
    if (fileInput.value == "") {
        history.back();
    }
    else {
        fileInput.value = "";
    }
}