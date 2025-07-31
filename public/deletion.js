const deleteButton = document.querySelector("#file-deletion");
deleteButton.addEventListener("click", deleteFile);

function deleteFile(event) {
    const confirmation = confirm("Are you sure you want to delete this file?");
    if (!confirmation) {
        event.preventDefault();
    }
    else {
        alert("Your file has been deleted.")
    }
}