import getCardData from "./scripts/modal.js";
import { searchItem } from "./scripts/search.js";

export const state = {
  click: false,
};

// Fetch Json data.
async function fetchCardsData() {
  const response = await fetch("cardsData.json");
  const data = await response.json();
  return data;
}
// Generate data into DOM
const cardsData = async () => {
  const data = await fetchCardsData();
  data.forEach((element) => {
    createCard(
      element.image,
      element.title,
      element.description,
      element.price,
      element.soldBy,
      element.category
    );
  });
  filterCards();
  getCardData();
  searchItem();
};

cardsData();

// Function to create cards
function createCard(image, title, description, price, seller, category) {
  const mainContainer = document.querySelector(".cards-box");
  const addCard = document.createElement("div");
  addCard.classList.add(
    "cards-body",
    "flex",
    "flex-col",
    "items-center",
    "cursor-pointer"
  );
  addCard.setAttribute("data-category", category);
  addCard.innerHTML = `
              <div class="card">
                <img src="${image}" alt="clothes images" class="card-img hover:bg-amber-600 "/>
                <div class="card-body flex flex-col items-center gap-1">
                  <h3 class="card-title text-2xl font-bold border-b-1">${title}</h3>
                  <p class="card-description text-xl font-semibold">${description}</p>
                  <p class="price text-xl text-green-600">${price} $</p>
                  <p class="soldBy text-xl">Seller: <span class="seller-name text-red-600 font-semibold">${seller}</span></p>
                </div>
              </div>
            `;
  mainContainer.appendChild(addCard);
}

// Filter to filter cards based on their category
function filterCards() {
  const inputs = Array.from(document.querySelectorAll("input"));
  const getCards = Array.from(document.querySelectorAll(".cards-body"));
  inputs.forEach((element) => {
    element.addEventListener("click", () => {
      const checkedInputs = inputs.filter((input) => input.checked);
      getCards.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (
          checkedInputs.some((input) => input.value === category) ||
          checkedInputs.length === 0
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

//Show items in basket
function expandIitems() {
  const basket = document.querySelector(".fa-bag-shopping");
  const basketItems = document.querySelector(".basket-items");
  basket.addEventListener("click", () => {
    basketItems.classList.toggle("opacity-0");
    basketItems.classList.toggle("invisible");
  });
}
expandIitems();

function trackItemsAdded(element) {
  const itemsIn = document.querySelector(".count-items");
  const basketItems = Array.from(document.querySelector(".basket-items"));
  console.log(basketItems.length);
}
trackItemsAdded();
