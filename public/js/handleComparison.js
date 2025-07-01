async function handleComparison() {
  try {
    // Get raw input from textareas
    const rawFollowers = document.getElementById("followers").value.match(/[^\r\n]+/g) || [];
    const rawFollowing = document.getElementById("following").value.match(/[^\r\n]+/g) || [];
    
    //Sending to backedd
    const response = await fetch('/compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        rawFollowers, 
        rawFollowing 
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();

    showUnfollowers(result);
    
  } catch (error) {
    console.error("Error during comparison:", error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById("textarea-button");
  if (button) {
    button.addEventListener("click", handleComparison);
  } else {
    console.error("Button with ID 'textarea-button' not found");
  }
});