// Retrieve the messages from the database
const getMessages = () => {
 const messagesRef = firebase.database().ref('/messages');
 messagesRef.on('value', (snapshot) => {
     const data = snapshot.val();
     console.log(data);
     // Find message

     findMessage(data);
 });
}

const findMessage = (messages) => {
    const passcodeAttempt = document.querySelector('#passcode').value;
    const hashPass = new Hashes.SHA1().hex(passcodeAttempt);
    console.log("Hashed pass: " + hashPass);      
    for (message in messages) {
        const messageData = messages[message];
        if (messageData.passcode === hashPass) {
            // Code to hide input form, and render message as HTML
            renderMessageAsHtml(messageData.message);
        }
    }
}

const renderMessageAsHtml = (message) => {
    // Hide the passcode view
    
    const passcodeInput = document.querySelector('#passcodeInput');
    passcodeInput.style.display = 'none';
    
    // Show the message
    
    const messageDiv = document.querySelector('#message');
    messageDiv.innerHTML = message;
}