export const SentimentAnalysis = `

// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
var firebaseConfig = {
  apiKey: "AIzaSyBOMl_ye0hjQ8aJ1rDmrYQq_BzpRZdjKOQ",
  authDomain: "delta-hack-fee63.firebaseapp.com",
  databaseURL: "https://delta-hack-fee63.firebaseio.com",
  projectId: "delta-hack-fee63",
  storageBucket: "delta-hack-fee63.appspot.com",
  messagingSenderId: "443785495075",
  appId: "1:443785495075:web:8fae76a1aa2703e4222796",
  measurementId: "G-7N8JTSMFLX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var divRoot = $("#affdex_elements")[0];
var width = 640;
var height = 480;
var file = [];
// audio file 
var url;
// JSON object to be sent to db
var sentFile = {
  "joy" : 0,
  "sadness" : 0,
  "disgust" : 0,
  "contempt" : 0,
  "anger" : 0,
  "fear" : 0,
  "surprise" : 0,
  "engagement" : 0
};
// grab snapshot of user emotion status ever specified time interval
var timer = 0; 
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);
// emotions 
var joy = 0;
var sadness = 0;
var disgust = 0;
var contempt = 0;
var anger = 0;
var fear = 0;
var surprise = 0;
var engagement = 0;
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var test;

//Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();
detector.detectAllExpressions();
//detector.detectAllEmojis();
detector.detectAllAppearance();

//Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener("onInitializeSuccess", function() {
  //log('#logs', "The detector reports initialized");
  //Display canvas instead of video feed because we want to draw the feature points on it
  $("#face_video_canvas").css("display", "block");
  $("#face_video").css("display", "none");
});

function log(node_name, msg) {
  $(node_name).append("<span>" + msg + "</span><br />")
}

//function executes when Start button is pushed.
function onStart() {
  if (detector && !detector.isRunning) {
    $("#logs").html("");
    detector.start();
  }
  startRecording();
  //log('#logs', "Clicked the start button");
  timer = 0;
}

//function executes when the Stop button is pushed.
function onStop() {
  //log('#logs', "Clicked the stop button");
  if (detector && detector.isRunning) {
    detector.removeEventListener();
    detector.stop();
    averageEmotionsArray();
    stopRecording();
  }
}

//function executes when the Reset button is pushed.
function onReset() {
  //log('#logs', "Clicked the reset button");
  if (detector && detector.isRunning) {
    detector.reset();

    $('#results').html("");
  }
}

function onUpload () {

}

//Add a callback to notify when camera access is allowed
detector.addEventListener("onWebcamConnectSuccess", function() {
  //log('#logs', "Webcam access allowed");
});

//Add a callback to notify when camera access is denied
detector.addEventListener("onWebcamConnectFailure", function() {
  //log('#logs', "webcam denied");
  //console.log("Webcam access denied");
});

//Add a callback to notify when detector is stopped
detector.addEventListener("onStopSuccess", function() {
  //log('#logs', "The detector reports stopped");
  $("#results").html("");
});

//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
  $('#results').html("");
  log('#results', "Timestamp: " + timestamp.toFixed(2));
  if (faces.length > 0) {
    log('#results', "Emotions: " + JSON.stringify(faces[0].emotions, function(key, val) {
      return val.toFixed ? Number(val.toFixed(0)) : val;
    }));
    //log('#results', "Expressions: " + JSON.stringify(faces[0].expressions, function(key, val) {
    //  return val.toFixed ? Number(val.toFixed(0)) : val;
    //}));
    if($('#face_video_canvas')[0] != null)
      drawFeaturePoints(image, faces[0].featurePoints);
    timer++; 
    file.push(faces[0].emotions);
  }
});

function averageEmotionsArray () {
  for (var i = 0; i < file.length; i++) {
    var emo = file[i];
    joy = joy + emo.joy;
    sadness = sadness + emo.sadness;
    disgust = disgust + emo.disgust;
    contempt = contempt + emo.contempt;
    anger = anger + emo.anger;
    fear = fear + emo.fear;
    surprise = surprise + emo.surprise;
    engagement = engagement + emo.engagement;
  }
  sentFile.joy = joy/timer;
  sentFile.sadness = sadness/timer;
  sentFile.disgust = disgust/timer;
  sentFile.contempt = contempt/timer;
  sentFile.anger = anger/timer;
  sentFile.fear = fear/timer;
  sentFile.surprise = surprise/timer;
  sentFile.engagement = engagement/timer;
  console.log(JSON.stringify(sentFile));
  //downloadObjectAsJson();
}

// temporary function to test values in json 
function downloadObjectAsJson(){
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sentFile));
  var a = document.createElement('a');
  a.href = 'data:' + data;
  a.download = 'data.json';
  a.innerHTML = 'download JSON';

  var container = document.getElementById('stop');
  container.appendChild(a);
}

//Draw the detected facial feature points on the image
function drawFeaturePoints(img, featurePoints) {
  var contxt = $('#face_video_canvas')[0].getContext('2d');

  var hRatio = contxt.canvas.width / img.width;
  var vRatio = contxt.canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);

  contxt.strokeStyle = "#FFFFFF";
  for (var id in featurePoints) {
    contxt.beginPath();
    contxt.arc(featurePoints[id].x,
      featurePoints[id].y, 2, 0, 2 * Math.PI);
    contxt.stroke();

  }
}

function startRecording() {      


    // simple constraints object
    var constraints = { audio: true, video:false }


   //   We're using the standard promise based getUserMedia() https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

    /*
      create an audio context after getUserMedia is called
      sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
      the sampleRate defaults to the one set in your OS for your playback device
    */
    audioContext = new AudioContext();
    //update the format 
    document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"
    console.log("woo3");
    /*  assign to gumStream for later use  */
    gumStream = stream;
    console.log("woo2");
    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);
    console.log("woo");
    /* 
      Create the Recorder object and configure to record mono sound (1 channel)
      Recording 2 channels  will double the file size
    */
    rec = new Recorder(input,{numChannels:1})

    //start the recording process
    rec.record();
    console.log(rec==undefined);
    console.log("Recording started");

  }).catch(function(err) {
  });
}

function stopRecording() {
  console.log("stopButton clicked");
  console.log(rec==undefined);
  //tell the recorder to stop the recording
  rec.stop();

  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
  var random = Math.random();
  var storageRef = firebase.storage().ref().child(random);
  storageRef.put(blob).then(function(snapshot) {
    snapshot.ref.getDownloadURL().then(function(downloadURL) {
      localStorage.setItem("myAudio", downloadURL);
    });
  });
  url = URL.createObjectURL(blob);
  function getData(audioFile, callback) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var data = event.target.result.split(',')
        , decodedImageData = btoa(data[1]);                    // the actual conversion of data from binary to base64 format
        callback(decodedImageData);
    };
    reader.readAsDataURL(audioFile);
  }

  function displayData(data){
    // localStorage.setItem("myAudio", data);
  }

  getData(blob, displayData);
  var au = document.createElement('audio');
  var li = document.createElement('li');
  var link = document.createElement('a');

  //name of .wav file to use during upload and download (without extendion)
  var filename = new Date().toISOString() + "Audio";

  //add controls to the <audio> element
  au.controls = true;
  au.src = url;

  //save to disk link
  link.href = url;
  link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
  link.innerHTML = "Save to disk";

  //add the new audio element to li
  li.appendChild(au);
  
  //add the filename to the li
  li.appendChild(document.createTextNode(filename+".wav "))

  //add the save to disk link to li
  li.appendChild(link);

  //add the li element to the ol
  recordingsList.appendChild(li);
}



        const startBtn = document.querySelector("#start");
        const stopBtn = document.querySelector("#stop");
        // const restartBtn = document.querySelector("#restart");
        startBtn.addEventListener('click', onStart);
        stopBtn.addEventListener('click', onStop);
        // restartBtn.addEventListener('click', onReset);


        
       function uploadJson() {
         const date = new Date().toString
         client.auth
           .loginWithCredential(new stitch.AnonymousCredential());
         db.collection("entry")
           .insertOne(sentFile);   
       }
       function uploadAudioBin () {
         client.auth
           .loginWithCredential(new stitch.AnonymousCredential());
         db.collection("audio")
         .insertOne({
           "audio" : localStorage.getItem("myAudio"),
           "date" : new Date().toISOString()
         });
       }
       const stopButton = document.querySelector('#stop');
       stopButton.addEventListener('click', function(){
         // uploadJson();
         setTimeout(() => {
           // uploadAudioBin();
           console.log("fuck u")
           console.log(localStorage.getItem("myAudio"))
         }, 5000);
       });
`