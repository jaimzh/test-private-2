// Configuration
const USERNAME = "Jaimz"; 

// DOM Elements
const commitBtn = document.getElementById('commitBtn');
const commitInput = document.getElementById('commitInput');
const dateInput = document.getElementById('dateInput');

// Main Logic
commitBtn.addEventListener('click', async () => {
    const message = commitInput.value;
    const dateVal = dateInput.value;
    
    if (!dateVal) {
        alert("Please select a date!");
        return;
    }

    // Format date using Moment.js
    const date = moment(dateVal).format();
    
    // UI Feedback
    commitBtn.disabled = true;
    commitBtn.textContent = "Committing...";
    commitBtn.style.backgroundColor = "#ccc";

    try {
        // Send request to our local server
        const response = await fetch('http://localhost:8081/commit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, message }),
        });

        const result = await response.json();
        
        if (result.success) {
            alert("Success! Commit pushed to the past.");
            // Clear inputs
            commitInput.value = "";
        } else {
            alert("Error: " + result.error);
        }
    } catch (err) {
        console.error(err);
        alert("Network Error: Make sure the server is running! (node server.js)");
    } finally {
        // Reset UI
        commitBtn.disabled = false;
        commitBtn.textContent = "Commit";
        commitBtn.style.backgroundColor = "";
    }
});
