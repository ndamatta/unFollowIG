function showUnfollowers(unfollowers) {
  const container = document.getElementById("unfollowers");

  if (unfollowers.length == 0) {
    let html = `<h2>You don't have any unfollowers</h2>`;
    container.innerHTML = html;
    
  } else {
    let html = `<h2>You have ${unfollowers.length} unfollowers</h2>`;
    unfollowers.forEach((user) => {
      html += `
            <a href="https://www.instagram.com/${user}" target="_blank">
                ${user}
            </a><br>
            `;
    });

    container.innerHTML = html;
  }
}
