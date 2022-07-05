function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier('MobileNet', modelLoaded);

}

function preload(){}

function draw(){

  image(video, 0, 0, canvas.height, canvas.width);
  classifier.classify(video, gotResult);

}

function modelLoaded(){

  console.log("The model has been Loaded ! :)");

}

pr  = "";

function gotResult(error, results){
if(error){

console.error(error)

}
else{

  if((results[0].label >= 0.50 )&&(pr != results[0].label)){

    console.log(results);

    synth  = window.speechSynthesis
    speak_data = "The object recognised is " + results[0].label;
    utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    
    document.getElementById("object_name").innerHTML = results[0].label;
    per = results[0].confidence * 100;
    document.getElementById("acc").innerHTML  = per.toFixed(2) + " %";

  }

}


}
