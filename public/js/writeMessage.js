let alerted = false;

const submitMessage = () => {
    const passcode = document.querySelector("#passcode").value;
    const message = document.querySelector("#message").value;
    let uppercase = false, number = false;

    if (message.length > 20) {
        alert("Message cannot be longer than 20 characters");
        document.querySelector("#message").value = "";
    } else {
        console.log("Passcode " + passcode);
        for (var i = 0; i < passcode.length; i++) {
            letter = passcode.charAt(i);
            console.log("CHECKING LETTER " + letter);
            if (letter == letter.toUpperCase()){
                console.log("uppercase is true");
                uppercase = true;
            }
            if (letter >= '0' && letter <= '9') {
                number = true;
            }
        }

        var hashPass = new Hashes.SHA1().hex(passcode);
        console.log("Hashed pass: " + hashPass);        
        if (uppercase && number) {
            firebase.database().ref("/messages").push({
            passcode: hashPass,
            message: message
            });       
        } else {
            alert("Passcode must contain an uppercase letter and a number");
        }
    }
    document.querySelector("#passcode").value = "";
    document.querySelector("#message").value = "";
}

const messageField = document.querySelector("#message");
messageField.addEventListener("keydown", e => {
    const message = document.querySelector("#message").value;
    console.log(message);
    if (message.length > 20 && !alerted) {
        alert("Message cannot be longer than 20 characters");
        alerted = true;
    }
})
