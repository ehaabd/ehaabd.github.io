const submitBtn = document.getElementById("submitButton");

submitBtn.addEventListener("click", function(){
    const fName = document.getElementById('fname').value;
    const lName = document.getElementById('lname').value;
    
    if(fName === 'Bobby' && lName === 'Dhaliwal'){
        window.location.href = "next.html";
    }
});
