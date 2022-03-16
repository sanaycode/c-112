prediction_1="";
prediction_2="";
Webcam.set({
    width:350,
    height: 300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'">';
    });
}
console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/h-bXExZS-/model.json', modelLoaded);
 function modelLoaded(){
     console.log("model loaded succesfully");
     
 }
 function speak(){
     var Synth=window.speechSynthesis;
     speak_data1="First prediction is "+ prediction_1;
     speak_data2=" and second prediction is "+ prediction_2;
     var Utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
     Utterthis.rate=0.5;
     Synth.speak(Utterthis);
     console.log("I am inside speak function");
 }
 function predict(){
     img=document.getElementById("captured_img");
     classifier.classify(img, gotResult);
     console.log("results recieved");
 }
 function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if(results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#x2639;";
        }
        if(results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }
        if(results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128512;";
        }
        if(results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#x2639;";
        }
        if(results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
    }

 }