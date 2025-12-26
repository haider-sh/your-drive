const deleteButton = document.querySelector("#file-deletion"); 
const deleteButton2 = document.querySelector("#folder-deletion"); 

if (deleteButton) {
    console.log("delete button 1 is ", deleteButton);
    deleteButton.addEventListener("click", deleteFile);
}
if (deleteButton2) {
    console.log("delete button 2 is ", deleteButton2);
    deleteButton2.addEventListener("click", deleteFile);
}

function deleteFile(event) {
    console.log("haider paglo");
    const confirmation = confirm("Are you sure you want to proceed to deletion?");
    if (!confirmation) {
        event.preventDefault();
    }
    else {
        alert("Deletion completed.")
    }
}

