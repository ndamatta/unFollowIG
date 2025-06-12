function showUnfollowers(unfollowers) {
  const container = document.getElementById("unfollowers");

  if (unfollowers.length === 0) {
    const html = `<h2 class="success">You don't have any unfollowers</h2>`;
    container.innerHTML = html;
  } else {
    let html = `<h2>You have ${unfollowers.length} unfollowers</h2>`;
    html += `<ul id="unfollowersAccounts">`;

    unfollowers.forEach((user) => {
      html += `
        <li>
          <a href="https://www.instagram.com/${user}" target="_blank">${user}</a>
        </li>`;
    });

    html += `</ul>`;
    container.innerHTML = html;
  }
}