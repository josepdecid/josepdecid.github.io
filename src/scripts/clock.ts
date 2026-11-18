const format = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function tick(): void {
  const time = document.getElementById("time");
  if (time) {
    time.textContent = format.format(new Date());
  }
}

tick();
setInterval(tick, 1000);
