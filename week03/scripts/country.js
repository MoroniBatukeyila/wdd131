const temperature = 32;
const windSpeed = 15;
function calculateWindChill(temperature, windSpeed) {
  return 35.74 + 0.6215 * temperature - 35.75 * windSpeed ** 0.16 + 0.4275 * temperature * windSpeed ** 0.16;
}
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
document.querySelector("#temperature").textContent = `${temperature}°F`;
document.querySelector("#wind-speed").textContent = `${windSpeed} mph`;
document.querySelector("#wind-chill").textContent = temperature <= 50 && windSpeed > 3 ? `${Math.round(calculateWindChill(temperature, windSpeed))}°F` : "N/A";