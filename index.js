(()=>{
    const width = 320;
    let height = 0;

    let streaming = false;
    let video = null;
    let canvas = null;
    let photo = null;
    let startbutton = null;

    function showViewLiveResultButton(){
        if(window.self !== window.top){
            const button = document.createElement("button");
            button.textContent = "View live result of the example code above";
            document.body.append(button);
            button.addEventListener("click",()=> window.open(location.href));
            return true;
        }
        return false;
    }

    function startup(){
        if(showViewLiveResultButton()){return;}
        video = document.getElementById("video");
        canvas = document.getElementById("canvas");
        photo = document.getElementById("photo");
        startbutton = document.getElementById("startbutton");

        navigator.mediaDevices
            .getUserMedia({video: {facingMode: {exact: "environment"}}, audio: false})
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                alert(`An error occured: ${err}`);
            });
        
        video.addEventListener(
            "canplay", 
            (ev) => {
                if(!streaming){
                    height = video.videoHeight / (video.videoWidth / width);

                    if(isNaN(height)){
                        height = width / (4/3);
                    }

                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    streaming = true;
                }
            }, false
        );

        startbutton.addEventListener(
            "click", 
            (ev) => {
                takepicture();
                ev.preventDefault();
            }, false
        );
        clearphoto();

        }

        function clearphoto(){
            const context = canvas.getContext("2d");
            context.fillStyle = "#AAA";
            context.fillRect(0,0,canvas.width, canvas.height);
            const data = canvas.toDataURL("image/png");
            photo.setAttribute("src", data);
        }

        function takepicture(){
            const context = canvas.getContext("2d");
            if(width && height){
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video,0,0,width,height);

                const data = canvas.toDataURL("image/png");
                photo.setAttribute("src", data);
            }else{
                clearphoto();
            }
        }

        window.addEventListener("load", startup, false);
})