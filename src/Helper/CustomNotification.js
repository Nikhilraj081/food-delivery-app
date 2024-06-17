function customNotification(title, message, buttonText, onButtonClick) {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'custom-notification';
    notificationElement.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
        <button onclick="handleButtonClick()">${buttonText}</button>
        <button onclick="handleClose()">Close</button>
    `;

    document.body.appendChild(notificationElement);

    function handleClose() {
        document.body.removeChild(notificationElement);
    }

    function handleButtonClick() {
        handleClose(); // Close the notification
        if (typeof onButtonClick === 'function') {
            onButtonClick(); // Invoke the callback provided
        }
    }
}

export {customNotification}
