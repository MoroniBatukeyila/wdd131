document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;

document.body.style.backgroundColor = "hsl(0, 0%, 15%)";
