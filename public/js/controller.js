const { token } = query;
const serverURL = `${window.location.protocol}//${window.location.host}/action`;

function onGrossMarginPress() {
    let data = {
        token: token,
        actions: [
            {
                action: "filter",
                value: "GrossMargin",
                ts: new Date().getTime()
            }
        ]
    };
    addMessageToQueue(data);
}

function addMessageToQueue(data) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) console.log("Message Sucessfully sent");
        else console.error("Message failed to send");
    };
    xhttp.open("POST", serverURL, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}