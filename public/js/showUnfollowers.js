/**
 * Displays the list of unfollowers inside the HTML element with ID "unfollowers".
 *
 * @param {Object} comparatorResult - The result object from the comparator containing:
 *   - followers: array of cleaned followers
 *   - following: array of cleaned following
 *   - difference: array of users followed but not following back (unfollowers)
 *
 * Behavior:
 * - If both followers and following lists are empty, prompts the user to paste info.
 * - If no unfollowers found, shows a success message.
 * - Otherwise, displays a clickable list of unfollowers linking to their Instagram profiles.
 */
function showUnfollowers(comparatorResult) {
  const container = document.getElementById("unfollowers");

  if (
    comparatorResult.followers.length === 0 &&
    comparatorResult.following.length === 0
  ) {
    container.innerHTML = `<h2>Please, paste your info above</h2>`;
  } else if (comparatorResult.difference.length === 0) {
    container.innerHTML = `<h2 class="success">You don't have any unfollowers</h2>`;
  } else {
    let html = `<h2>You have ${comparatorResult.difference.length} unfollowers</h2>`;
    html += `<ul id="unfollowersAccounts">`;

    comparatorResult.difference.forEach((user) => {
      html += `
        <li>
          <a href="https://www.instagram.com/${user}" target="_blank">${user}</a>
        </li>`;
    });

    html += `</ul>`;
    container.innerHTML = html;
  }
}
