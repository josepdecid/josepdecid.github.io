const timeElement = document.getElementById("time");

export async function initPageUtils() {
  setInterval(_updateDateTime, 1000);
  _updateDateTime();
}

// #region Private helper functions

function _updateDateTime() {
  const now = new Date();
  const timeStr = now.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  timeElement.textContent = timeStr;
}

// #endregion
