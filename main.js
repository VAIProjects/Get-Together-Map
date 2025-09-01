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
