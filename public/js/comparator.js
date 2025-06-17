/**
 * Cleans an array of strings by splitting, trimming, lowercasing, and filtering out unwanted entries.
 *
 * @param {string[]} array - The input array of strings to clean.
 * @param {string[]} skipWords - An array of words; if an entry starts with any of them, it will be removed.
 * @returns {string[]} A new array with cleaned and filtered strings.
 *
 * Behavior:
 * - Each line is split by commas, so CSV-style entries are individually processed.
 * - Each part is trimmed and converted to lowercase.
 *
 * Filters out:
 * - Empty entries
 * - Entries starting with any of the skipWords
 * - Entries containing a 4-digit number (e.g., a year like 2024)
 * - Entries containing a time pattern (e.g., 12:30)
 *
 * Logs an error and returns an empty array if input is not valid.
 */
function cleanArray(array, skipWords) {
  //Basic verification to check if user input is an array.
  if (!Array.isArray(array) || !Array.isArray(skipWords)) {
    console.error("Invalid input to cleanArray: expected arrays.");
    return [];
  }

  return array
    .flatMap((line) => line.split(',').map((part) => part.trim().toLowerCase()))
    .filter((line) => {
      if (
        line === "" ||
        skipWords.some((word) => line.startsWith(word)) ||
        /\d{4}/.test(line) || // for years, example 2024
        /\d{1,2}:\d{2}/.test(line) // for time stamp, example 12:30
      ) {
        return false;
      }
      return true;
    });
}

/**
 * Compares two user lists (followers and following) to find users you follow
 * but who don't follow you back, after cleaning and filtering the input.
 *
 * @param {Object} skipWordsByLanguage - An object where each key is a language
 * and the value is an array of skip words. All words across languages are used
 * to filter out irrelevant lines (e.g., timestamps, headers).
 *
 * Steps:
 * - Reads user input from two textareas with IDs "followers" and "following".
 * - Splits input into lines and filters out noise using `cleanArray()`.
 * - Compares cleaned lists to find users in "following" but not in "followers".
 * - Passes the result to `showUnfollowers()` for display.
 *
 * If an error occurs during the process, it is caught and logged.
 */
function runComparator(skipWordsByLanguage) {
  try {
    const allSkipWords = Object.values(skipWordsByLanguage).flat();

    const raw_followers =
      document.getElementById("followers").value.match(/[^\r\n]+/g) || [];
    const raw_following =
      document.getElementById("following").value.match(/[^\r\n]+/g) || [];

    const cleaned_followers = cleanArray(raw_followers, allSkipWords);
    const cleaned_following = cleanArray(raw_following, allSkipWords);

    const difference = cleaned_following.filter(
      (user) => !cleaned_followers.includes(user)
    );

    const result = {
      followers: cleaned_followers,
      following: cleaned_following,
      difference: difference,
    };

    showUnfollowers(result);
    // console.log(`Users in following but not in followers:`, difference);
  } catch (error) {
    console.error("Error running comparator:", error);
  }
}

// Load skip words from JSON and attach event listener to run comparator on click
fetch("../json/skipWords.json")
  .then((response) => response.json())
  .then((data) => {
    document
      .getElementById("textarea-button")
      .addEventListener("click", () => runComparator(data));
  })
  .catch((error) => {
    console.error("Failed to load skipWords.json");
  });
