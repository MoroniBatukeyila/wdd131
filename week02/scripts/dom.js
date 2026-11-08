// Validates and formats chapter references while managing the Top 10 list.
const input = document.querySelector("#favchap");
const button = document.querySelector("#add-chapter");
const list = document.querySelector("#list");
const feedback = document.querySelector("#feedback");
const chapterCounts = new Map([
  ["1 nephi", 22],
  ["2 nephi", 33],
  ["jacob", 7],
  ["enos", 1],
  ["jarom", 1],
  ["omni", 1],
  ["words of mormon", 1],
  ["mosiah", 29],
  ["alma", 63],
  ["helaman", 16],
  ["3 nephi", 30],
  ["4 nephi", 1],
  ["mormon", 9],
  ["ether", 15],
  ["moroni", 10],
]);
const bookNames = new Map([
  ["1 nephi", "1 Nephi"],
  ["2 nephi", "2 Nephi"],
  ["jacob", "Jacob"],
  ["enos", "Enos"],
  ["jarom", "Jarom"],
  ["omni", "Omni"],
  ["words of mormon", "Words of Mormon"],
  ["mosiah", "Mosiah"],
  ["alma", "Alma"],
  ["helaman", "Helaman"],
  ["3 nephi", "3 Nephi"],
  ["4 nephi", "4 Nephi"],
  ["mormon", "Mormon"],
  ["ether", "Ether"],
  ["moroni", "Moroni"],
]);
const bookPattern = [...chapterCounts.keys()]
  .sort((first, second) => second.length - first.length)
  .join("|");
const chapterPattern = new RegExp(`^(${bookPattern})\\s+(\\d+)$`, "i");

function updateLimit() {
  const isFull = list.children.length >= 10;
  button.setAttribute(
    "aria-label",
    isFull ? "Add Chapter; Top 10 list is full" : "Add Chapter",
  );
}

function attachDeleteHandler(listItem, deleteButton) {
  deleteButton.addEventListener("click", () => {
    const chapter = listItem.firstChild.textContent.trim();
    list.removeChild(listItem);
    updateLimit();
    feedback.textContent = `${chapter} removed. ${list.children.length} of 10 chapters saved.`;
    input.focus();
  });
}

list.querySelectorAll(".delete-button").forEach((deleteButton) => {
  attachDeleteHandler(deleteButton.parentElement, deleteButton);
});
updateLimit();

button.addEventListener("click", () => {
  const enteredChapter = input.value.trim().replace(/\s+/g, " ");
  const match = enteredChapter.match(chapterPattern);

  if (!enteredChapter) {
    feedback.textContent = "Enter a chapter before adding it.";
    input.focus();
    return;
  }

  if (!match) {
    feedback.textContent = "Enter a Book of Mormon book and chapter, such as Alma 5.";
    input.focus();
    return;
  }

  const bookKey = match[1].toLowerCase();
  const chapterNumber = Number(match[2]);
  const formattedChapter = `${bookNames.get(bookKey)} ${chapterNumber}`;
  const chapters = [...list.querySelectorAll("li")].map((listItem) =>
    listItem.firstChild.textContent.trim().toLowerCase(),
  );

  if (chapterNumber < 1 || chapterNumber > chapterCounts.get(bookKey)) {
    feedback.textContent = `${bookNames.get(bookKey)} has ${chapterCounts.get(bookKey)} chapter${chapterCounts.get(bookKey) === 1 ? "" : "s"}. Enter a valid chapter number.`;
    input.focus();
    return;
  }

  if (chapters.includes(formattedChapter.toLowerCase())) {
    feedback.textContent = `${formattedChapter} is already in your list.`;
    input.focus();
    return;
  }

  if (list.children.length >= 10) {
    feedback.textContent = "Your Top 10 is full. Remove a chapter before adding another.";
    input.focus();
    return;
  }

  const listItem = document.createElement("li");
  const deleteButton = document.createElement("button");

  listItem.append(formattedChapter);
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "❌";
  deleteButton.setAttribute("aria-label", `Remove ${formattedChapter}`);
  attachDeleteHandler(listItem, deleteButton);
  listItem.appendChild(deleteButton);
  list.appendChild(listItem);
  input.value = "";
  feedback.textContent = `${formattedChapter} added. ${list.children.length} of 10 chapters saved.`;
  updateLimit();
  input.focus();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});
