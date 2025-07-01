/**
 * Cleans an array of strings by splitting, trimming, lowercasing, and filtering out unwanted entries.
 *
 * @param {string[]} array - The input array of strings to clean.
 * @param {string[]} skipWords - An array of words; if an entry starts with any of them, it will be removed.
 * @returns {string[]} A new array with cleaned and filtered strings.
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
 * @param {string[]} rawFollowers - Raw followers data
 * @param {string[]} rawFollowing - Raw following data  
 * @param {Object} skipWordsByLanguage - Skip words by language
 * @returns {Object} Comparison result with followers, following, and difference
 */
function compareArrays(rawFollowers, rawFollowing, skipWordsByLanguage) {
  try {
    const allSkipWords = Object.values(skipWordsByLanguage).flat();
    const cleaned_followers = cleanArray(rawFollowers, allSkipWords);
    const cleaned_following = cleanArray(rawFollowing, allSkipWords);
    const difference = cleaned_following.filter(
      (user) => !cleaned_followers.includes(user)
    );
    
    return {
      followers: cleaned_followers,
      following: cleaned_following,
      difference: difference,
    };
  } catch (error) {
    console.error("Error running comparator:", error);
    throw error;
  }
}

module.exports = {
  compareArrays,
  cleanArray
};