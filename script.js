


const dateInput = document.getElementById('dateInput');
const commitInput = document.getElementById('commitInput');
const commitBtn = document.getElementById('commitBtn');



function setBtnLoadingState(isLoading){
    commitBtn.disabled = isLoading;
    commitBtn.textContent = isLoading ? "Committing..." : "Commit";
    commitBtn.style.backgroundColor = isLoading ? "#ccc" : "";
}


async function commitToPast(){
    const message = commitInput.value.trim();
    const dateValue =dateInput.value;


     if (!message){
        alert("Please enter a commit message!");
        return;
    }


    if (!dateValue){
        alert("Please select a date!");
        return;
    }
    
   
    
    const date = moment(dateValue).format();
    setBtnLoadingState(true);

    try {
        //logic to connect to server 
       const response = await fetch('http://localhost:8081/commit', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({message, date})
        });
        const result = await response.json();

        console.log("Server returned:", result);
        if (result.success){
            alert("Commit successful!");
            commitInput.value = "";
            dateInput.value = "";
        }else{
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error(error);
        alert("Network Error: Make sure the server is running!");
    } finally{
        setBtnLoadingState(false);
    }
}



commitBtn.addEventListener('click', commitToPast);




