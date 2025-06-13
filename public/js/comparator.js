function cleanArray(array, skipWords) {
  //Basic verification to check if user input is an array.
  if(!Array.isArray(array) || !Array.isArray(skipWords)) {
    console.error('Invalid input to cleanArray: expected arrays.')
    return []
  }

  return array
    .map((line) => line.trim().toLowerCase())
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

function runComparator(skipWordsByLanguage) {
  try {
    const allSkipWords = Object.values(skipWordsByLanguage).flat();

    const raw_followers =
      document.getElementById("followers").value.match(/[^\r\n]+/g) || [];
    const raw_following =
      document.getElementById("following").value.match(/[^\r\n]+/g) || [];

    const cleaned_followers = cleanArray(raw_followers, allSkipWords);
    const cleaned_following = cleanArray(raw_following, allSkipWords);

    const difference = cleaned_following.filter(user => !cleaned_followers.includes(user));

    const result = {
      followers: cleaned_followers,
      following: cleaned_following,
      difference: difference
    };
    
    showUnfollowers(result);
    // console.log(`Users in following but not in followers:`, difference);
    
  } catch(error) {
    console.error("Error running comparator:", error);
  }
}

// Load JSON and run comparator
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
