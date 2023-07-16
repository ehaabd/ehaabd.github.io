const submitBtn = document.getElementById("submitButton");

submitBtn.addEventListener("click", function(){
    const fName = document.getElementById('fname').value;
    const lName = document.getElementById('lname').value;
    
    if(fName === 'Bobby' && lName === 'Dhaliwal'){
        const videoContainer = document.createElement("div");
        videoContainer.className = "container";
        
        const videoText = document.createElement("p");
        videoText.textContent = "Hey, what's this? Oh, looks like you have a message!";
        videoText.className = "center white slate";

        const spanThing = document.createElement("span");
        spanThing.className = "container";
        spanThing.style.height = "50px";
        
        videoContainer.appendChild(videoText);
        videoContainer.appendChild(spanThing);
        
        videoContainer.innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/your_video_id" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        
        document.body.appendChild(videoContainer);
    }
});
