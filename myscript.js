document.addEventListener('DOMContentLoaded', function() {
  const notepad = document.getElementById('notepad-content');
  notepad.value = localStorage.getItem('autosave') || '';
  notepad.addEventListener('input', () => {
    localStorage.setItem('autosave', notepad.value);
  });

  const countDisplay = document.getElementById('count');
  const incrementButton = document.getElementById('increment');
  const resetButton = document.getElementById('reset');
  const undoButton = document.getElementById('undo'); // Added undo button reference

  let count = parseInt(localStorage.getItem('tapCount')) || 0;
  let previousCount = null; // Store the previous count for undo functionality

  countDisplay.textContent = count;

  incrementButton.addEventListener('click', function() {
    previousCount = count; // Save the current count before increment
    count++;
    countDisplay.textContent = count;
    localStorage.setItem('tapCount', count);
  });

  resetButton.addEventListener('click', function() {
    previousCount = count; // Save the current count before resetting
    count = 0;
    countDisplay.textContent = count;
    localStorage.setItem('tapCount', count);
  });

  // Undo functionality
  undoButton.addEventListener('click', function() {
    if (previousCount !== null) {
      count = previousCount; // Restore the previous count
      countDisplay.textContent = count;
      localStorage.setItem('tapCount', count);
      previousCount = null; // Clear after undo to prevent multiple undos
    } else {
      alert("No previous action to undo.");
    }
  });
});
