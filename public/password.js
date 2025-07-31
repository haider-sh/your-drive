const passwordIcon = document.querySelector("#password-icon");
passwordIcon.addEventListener("click", toggleState);

const passwordField = document.querySelector("#password");

let passwordState = true; //true -> hidden, false -> shown;

function toggleState() {
    if (passwordState) {
        passwordField.type = "text";
        passwordIcon.src = "/show-pass.png";
        passwordState = false;
    }
    else {
        passwordField.type = "password";
        passwordIcon.src = "/hide-pass.png";
        passwordState = true;
    }
}