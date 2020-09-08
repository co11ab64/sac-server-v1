function generateQRCode(token) {
    let qrcode = document.querySelector("img"),
        baseURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150",
        data = `${window.location.protocol}//${window.location.host}/controller.html?token=${token}`;

    qrcode.src = `${baseURL}&data=${data}`;
}


window.onload = async function () {
    await fetch("http://localhost:3000/connect")
        .then(response => response.json())
        .then(data => {
            let { token } = data;
            generateQRCode(token);
        })
        .catch(err => console.error(err));
}