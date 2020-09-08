const serverURL = `${window.location.protocol}//${window.location.host}`;

function generateQRCode(token) {
    let qrcode = document.querySelector("img"),
        baseURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150",
        data = `${serverURL}\controller.html?token=${token}`;

    qrcode.src = `${baseURL}&data=${data}`;
}


window.onload = async function () {
    let token = await fetch(`${serverURL}/connect`)
        .then(response => response.json())
        .then(data => {
            let { token } = data;
            return token;
        })
        .catch(err => console.error(err));
    generateQRCode(token);
    window.poll = setInterval(async function () {
        let { actions } = await fetch(serverURL + `/action?token=${token}&keep=true`)
            .then(res => res.json());
        console.log("Polling Request sent");
        if (!actions.length) return;

        var action = actions.pop();
        window.top.postMessage(action.action + ":" + action.value, " https://sactrial-saceu10-e7imrcd69ivxk4fblyi8bf51.eu10.hanacloudservices.cloud.sap/");
        
    }, 1500);
}

window.onbeforeunload = function(){
    // clearInterval(window.poll);
}