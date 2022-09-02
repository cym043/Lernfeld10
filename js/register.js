const axios = require('axios');

let camera_button = document.querySelector("#start-camera");
let start_button = document.querySelector('#start-record');
let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");
let textInput = document.querySelector('#username');
let submit_button = document.querySelector('#send_data');

let imgArray = [];

camera_button.addEventListener('click', async function() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    camera_button.style.display = 'none';
    start_button.style.display = 'block';
});

let captureImage = function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image
    imgArray.push(image_data_url);
}

let stopCapture = function(interval) {
    clearInterval(interval);
    console.log("Stop capturing");
    console.log(imgArray);  
    start_button.firstChild.data = 'Capture again';
}

start_button.addEventListener('click', async function() {
    let captureImages = setInterval(captureImage, 100);
    console.log("Start capturing");
    setTimeout(function() {
        stopCapture(captureImages);
    }, 3000);
});

let checkIfEntry = function() {
    if(textInput.value.length > 0 && imgArray != 0) {
        submit_button.style.display = 'block';
    } else if(textInput.value.length = 0 && imgArray != 0) {
        submit_button.style.display = 'none';
    }
}

textInput.onfocus = function() {
    checkIfEntry();
}

let checkIfEmpty = function() {
    if(textInput.value.length = 0 && imgArray != 0) {
        submit_button.style.display = 'none';
    } else if(textInput.value.length > 0 && imgArray != 0) {
        submit_button.style.display = 'block';
    }
}

textInput.onblur= function() {
    checkIfEmpty();
}

submit_button.addEventListener('click', async function() {
    let username = textInput.value;
    let data = {
        bilder: imgArray,
        username: username
    }

    axios.post('register/newUser', data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(data);
});