function validatePassword() {
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;

    if(password !== password2) {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}