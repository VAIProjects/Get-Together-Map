// Convert a "HH:MM" string to total minutes
function toMinutes(timeStr) {
  timeStr = timeStr.trim(); // remove any extra whitespace
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Example usage later:
updateNowOnLabels();
updateActiveRows();


function formatClock(date) {
  // 12-hour format with AM/PM to match your timetable style
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // 0 -> 12
  return `${hours}:${minutes} ${ampm}`;
}

function updateClock() {
  const el = document.getElementById("live-clock");
  if (!el) return;
  const now = new Date();
  el.textContent = formatClock(now);
}

// Kick off and keep ticking
updateClock();
setInterval(updateClock, 1000);

// Live Time Colour Change

function toMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function updateActiveRows() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  document.querySelectorAll('.cell.time[data-start][data-end]').forEach(cell => {
    const starts = cell.getAttribute('data-start').split(',');
    const ends   = cell.getAttribute('data-end').split(',');

    let isActive = false;

    for (let i = 0; i < starts.length; i++) {
      const startMinutes = toMinutes(starts[i]);
      const endMinutes   = toMinutes(ends[i]);

      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        isActive = true;
        break; // no need to check other ranges
      }
    }

    if (isActive) {
      cell.classList.add('active-row');
    } else {
      cell.classList.remove('active-row');
    }
  });
}


// Run once immediately
updateActiveRows();

// Update every minute
setInterval(updateActiveRows, 60 * 1000);

//Test for Title

function updateActiveSessions() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  document.querySelectorAll('.cell.time[data-start][data-end]').forEach(timeCell => {
    const starts = timeCell.getAttribute('data-start').split(',');
    const ends = timeCell.getAttribute('data-end').split(',');

    let isActive = false;

    for (let i = 0; i < starts.length; i++) {
      const startMinutes = toMinutes(starts[i]);
      const endMinutes = toMinutes(ends[i]);

      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        isActive = true;
        break;
      }
    }

    // Find the session-title in the next .cell.info sibling
    const infoCell = timeCell.nextElementSibling;
    if (infoCell && infoCell.classList.contains('info')) {
      const sessionTitle = infoCell.querySelector('.session-title');
      if (sessionTitle) {
        if (isActive) {
          sessionTitle.classList.add('active-session');
        } else {
          sessionTitle.classList.remove('active-session');
        }
      }
    }
  });
}

// Run once immediately
updateActiveSessions();

// Update every minute
setInterval(updateActiveSessions, 60 * 1000);

function updateNowOnLabels() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  document.querySelectorAll('.cell.time[data-start][data-end]').forEach(timeCell => {
    const starts = timeCell.getAttribute('data-start').split(',');
    const ends   = timeCell.getAttribute('data-end').split(',');

    let isActive = false;

    for (let i = 0; i < starts.length; i++) {
      const startMinutes = toMinutes(starts[i]);
      const endMinutes   = toMinutes(ends[i]);

      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        isActive = true;
        break;
      }
    }

    // Find the span containing the time text
    const timeText = timeCell.querySelector('.time-text');
    if (!timeText) return;

    // Add the "Now on:" label if it doesn't exist
    let label = timeText.querySelector('.now-on-label');
    if (!label) {
      label = document.createElement('span');
      label.className = 'now-on-label';
      label.textContent = 'Now on:';
      timeText.appendChild(label);
      // Trigger fade-in
      requestAnimationFrame(() => label.classList.add('show'));
    } else {
      // Toggle fade class
      if (isActive) {
        label.classList.add('show');
      } else {
        label.classList.remove('show');
      }
    }
  });
}

// Run once immediately
updateNowOnLabels();

// Update every minute
setInterval(updateNowOnLabels, 60 * 1000);




