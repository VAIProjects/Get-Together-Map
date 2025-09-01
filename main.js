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

