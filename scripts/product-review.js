const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5,
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7,
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5,
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9,
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0,
  },
];

const productSelect = document.querySelector("#product");

if (productSelect) {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.append(option);
  });
}

const reviewCountElement = document.querySelector("#review-count");

if (reviewCountElement) {
  const reviewCount = Number(localStorage.getItem("productReviewCount") || 0) + 1;
  localStorage.setItem("productReviewCount", reviewCount);
  reviewCountElement.textContent = reviewCount;
}

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;
