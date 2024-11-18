document.addEventListener('DOMContentLoaded', function() {
  const countDisplay = document.getElementById('count');
  const incrementButton = document.getElementById('increment');
  const resetButton = document.getElementById('reset');
  const undoButton = document.querySelector('button[onclick="undo()"]'); // Undo button
  
  let count = parseInt(localStorage.getItem('tapCount')) || 0;
  let previousCount = null; // Variable to hold the previous count

  countDisplay.textContent = count;

  incrementButton.addEventListener('click', function() {
    count++;
    countDisplay.textContent = count;
    localStorage.setItem('tapCount', count);
  });

  resetButton.addEventListener('click', function() {
    previousCount = count; // Store the current count before resetting
    count = 0;
    countDisplay.textContent = count;
    localStorage.setItem('tapCount', count);
  });

  // Undo function to restore the previous count
  undoButton.addEventListener('click', function() {
    if (previousCount !== null) {
      count = previousCount; // Restore the previous count
      countDisplay.textContent = count;
      localStorage.setItem('tapCount', count);
      previousCount = null; // Clear the previous count after undo
    } else {
      alert("No reset to undo.");
    }
  });
});
