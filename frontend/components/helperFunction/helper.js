
function capitalizeWords(str) {
    // Check if the input is not empty
    if (typeof str !== 'string') return ''; // If input is not a string, return an empty string
    
    // Split the string into words
    let words = str.split(' ');
  
    // Capitalize each word
    let capitalizedWords = words.map(word => {
      if (word.length === 0) return ''; // Handle empty words (e.g., multiple spaces)
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter, lowercase rest
    });
  
    // Join the words back into a single string
    return capitalizedWords.join(' ');
  }






export { capitalizeWords } ;