/**
 * Displays the list of unfollowers inside the HTML element with ID "unfollowers",
 * applying Animate.css classes for entry animations.
 *
 * @param {Object} comparatorResult - The result object from the comparator containing:
 *   - followers: string[] — cleaned list of followers
 *   - following: string[] — cleaned list of accounts being followed
 *   - difference: string[] — accounts that don't follow back
 *
 * Behavior:
 * - If the container or input is invalid, logs an error and exits.
 * - If both followers and following are empty, shows a prompt to paste data.
 * - If there are no unfollowers, shows a success message.
 * - Otherwise, displays a list of unfollowers as clickable Instagram links.
 * - Animations (using Animate.css) are applied to the messages/lists.
 *
 * Uses a helper function `updateContainer()` to update content and apply animation classes.
 */
function showUnfollowers(comparatorResult) {
  const container = document.getElementById("unfollowers");
  
  if (!container || !comparatorResult) {
    console.error("Invalid input or missing container");
    return;
  }

  if (
    comparatorResult.followers.length === 0 &&
    comparatorResult.following.length === 0
  ) {
    return updateContainer(container, "Please, paste your info above", "animate__bounceIn");
  }

  if (comparatorResult.difference.length === 0) {
    return updateContainer(container, "You don't have any unfollowers", "success animate__bounceIn");
  }

  const listItems = comparatorResult.difference.map(user => 
    `<li><a href="https://www.instagram.com/${user}" target="_blank">${user}</a></li>`
  ).join("");

  updateContainer(container, `You have ${comparatorResult.difference.length} unfollowers`, "animate__bounceIn", listItems);
}

function updateContainer(container, message, animationClass, list = "") {
  container.innerHTML = `<h2 class="${animationClass}">${message}</h2>${list ? `<ul id="unfollowersAccounts">${list}</ul>` : ""}`;
}

