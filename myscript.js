document.addEventListener('DOMContentLoaded', function() {
  // Get the textarea element for the notepad
  const notepad = document.getElementById('notepad-content');
  
  // Load the saved content from localStorage if available
  notepad.value = localStorage.getItem('autosave');
  
  // Listen for changes in the textarea content
  notepad.addEventListener('input', function() {
    // Save the content to localStorage
    localStorage.setItem('autosave', notepad.value);
  });
  
  // Get elements for main tap counter
  const countDisplay = document.getElementById('count');
  const incrementButton = document.getElementById('increment');
  const resetButton = document.getElementById('reset');
  
  // Get elements for left and right counters
  const leftCountDisplay = document.getElementById('left-count');
  const rightCountDisplay = document.getElementById('right-count');
  
  // Load counts from localStorage or default to 0
  let count = parseInt(localStorage.getItem('tapCount')) || 0;
  let leftCount = parseInt(localStorage.getItem('leftTapCount')) || 0;
  let rightCount = parseInt(localStorage.getItem('rightTapCount')) || 0;
  
  // Display counts
  countDisplay.textContent = count;
  leftCountDisplay.textContent = leftCount;
  rightCountDisplay.textContent = rightCount;
  
  // Increment main count on button click
  incrementButton.addEventListener('click', function() {
    count++;
    countDisplay.textContent = count;
    localStorage.setItem('tapCount', count);
  });
  
  // Reset all counts on button click
  resetButton.addEventListener('click', function() {
    count = 0;
    leftCount = 0;
    rightCount = 0;
    countDisplay.textContent = count;
    leftCountDisplay.textContent = leftCount;
    rightCountDisplay.textContent = rightCount;
    localStorage.setItem('tapCount', count);
    localStorage.setItem('leftTapCount', leftCount);
    localStorage.setItem('rightTapCount', rightCount);
  });

  // Increment left count on 'C' key press
  document.addEventListener('keydown', function(event) {
    if (event.key === 'c' || event.key === 'C') {
      leftCount++;
      leftCountDisplay.textContent = leftCount;
      localStorage.setItem('leftTapCount', leftCount);
    }
  });

  // Increment right count on 'D' key press
  document.addEventListener('keydown', function(event) {
    if (event.key === 'd' || event.key === 'D') {
      rightCount++;
      rightCountDisplay.textContent = rightCount;
      localStorage.setItem('rightTapCount', rightCount);
    }
  });
});
