document.addEventListener('DOMContentLoaded', function () {
  const notepad = document.getElementById('notepad-content');
  notepad.value = localStorage.getItem('autosave') || '';
  notepad.addEventListener('input', () => {
    localStorage.setItem('autosave', notepad.value);
  });

  // Main count elements
  const countDisplay = document.getElementById('count');
  const incrementButton = document.getElementById('increment');
  const resetButton = document.getElementById('reset');
  const undoButton = document.getElementById('undo'); // Added undo button reference

  // Left and right count elements
  const leftCountDisplay = document.getElementById('left-count');
  const rightCountDisplay = document.getElementById('right-count');

  // Load counts from localStorage or default to 0
  let count = parseInt(localStorage.getItem('tapCount')) || 0;
  let leftCount = parseInt(localStorage.getItem('leftTapCount')) || 0;
  let rightCount = parseInt(localStorage.getItem('rightTapCount')) || 0;
  let previousCounts = { count: null, leftCount: null, rightCount: null }; // Store all previous counts

  // Update displays
  countDisplay.textContent = count;
  leftCountDisplay.textContent = leftCount;
  rightCountDisplay.textContent = rightCount;

  // Increment main count
  incrementButton.addEventListener('click', function () {
    savePreviousCounts(); // Save current counts before increment
    count++;
    updateDisplays();
  });

  // Reset all counts
  resetButton.addEventListener('click', function () {
    savePreviousCounts(); // Save current counts before reset
    count = 0;
    leftCount = 0;
    rightCount = 0;
    updateDisplays();
  });

  // Undo functionality
  undoButton.addEventListener('click', function () {
    if (previousCounts.count !== null) {
      // Restore all previous counts
      count = previousCounts.count;
      leftCount = previousCounts.leftCount;
      rightCount = previousCounts.rightCount;
      updateDisplays();
      previousCounts = { count: null, leftCount: null, rightCount: null }; // Clear after undo
    } else {
      alert('No previous action to undo.');
    }
  });

  // Increment left count on 'D' key press
  document.addEventListener('keydown', function (event) {
    if (event.key.toLowerCase() === 'd') {
      savePreviousCounts(); // Save current counts before increment
      leftCount++;
      updateDisplays();
    }
  });

  // Increment right count on 'C' key press
  document.addEventListener('keydown', function (event) {
    if (event.key.toLowerCase() === 'c') {
      savePreviousCounts(); // Save current counts before increment
      rightCount++;
      updateDisplays();
    }
  });

  // Save current counts to `previousCounts`
  function savePreviousCounts() {
    previousCounts = {
      count: count,
      leftCount: leftCount,
      rightCount: rightCount,
    };
  }

  // Update all displays and localStorage
  function updateDisplays() {
    countDisplay.textContent = count;
    leftCountDisplay.textContent = leftCount;
    rightCountDisplay.textContent = rightCount;
    localStorage.setItem('tapCount', count);
    localStorage.setItem('leftTapCount', leftCount);
    localStorage.setItem('rightTapCount', rightCount);
  }
});
