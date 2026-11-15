const temperature = 24;
const windSpeed = 12;

function calculateWindChill(temperature, windSpeed) {
  return (
    13.12 +
    0.6215 * temperature -
    11.37 * windSpeed ** 0.16 +
    0.3965 * temperature * windSpeed ** 0.16
  );
}

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;

document.querySelector("#temperature").textContent = `${temperature}°C`;
document.querySelector("#wind-speed").textContent = `${windSpeed} km/h`;
document.querySelector("#wind-chill").textContent =
  temperature <= 10 && windSpeed > 4.8
    ? `${Math.round(calculateWindChill(temperature, windSpeed))}°C`
    : "N/A";
