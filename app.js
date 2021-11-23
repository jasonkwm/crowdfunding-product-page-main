const body = document.querySelector("body");
const getStarted = document.querySelector("#start");
const prodButton = document.querySelectorAll("button");
const prodContainer = document.querySelectorAll(".product-container");
const pledgeContainer = document.querySelectorAll(".pledge-container");
const pledgeBackground = document.querySelector(".pledge-background");
const successBackground = document.querySelector(".success-background");
const inputId = document.querySelectorAll(".radio-input");
const prodQty = document.querySelectorAll(".product-quantity");
const pledgeQty = document.querySelectorAll(".pledge-quantity");

const visible = `visibility: visible; opacity: 1;`;

//Nav 'Get Started' to open modal and focus on #no-pledge
getStarted.addEventListener("click", (e) => {
  document.querySelector("#no-pledge").checked = true;
  pledgeBackground.style.cssText = visible;
  body.classList.add("body-modal");
  pledgeBackground.scrollTop = 0;
});

//disable if out of stock for main
prodContainer.forEach((e) => {
  if (e.classList.contains("out-of-stock")) {
    e.querySelector("button").disabled = true;
  }
});

//Click on product to open modal
prodButton.forEach((elem) => {
  elem.addEventListener("click", (c) => {
    //Get id of radio input for product and checked it
    let id = document.querySelector(`#${c.target.value}`);
    id.checked = true;
    pledgeBackground.style.cssText = visible;
    body.classList.add("body-modal");

    //Scroll Focus
    let cur = id;
    let distance = 0;
    do {
      distance += cur.offsetTop;
      cur = cur.offsetParent;
    } while (cur);
    distance = distance < 0 ? 0 : distance;
    pledgeBackground.scrollTop = distance - 176;
  });
});

// Hide modal when click on grey area
pledgeBackground.addEventListener("click", (e) => {
  if (e.target.classList.contains("pledge-background")) {
    e.target.style.cssText = `
    visibility: hidden;
    opacity: 0;
    `;
    body.classList.remove("body-modal");
  }
});

//disable product if out of stock for main
prodQty.forEach((elem) => {
  let text = elem.innerText;
  if (text.split("\n")[0] == "0") {
    let grandpa = elem.closest(".product-container");
    let butt = grandpa.querySelector(".product-button");
    grandpa.classList.add("out-of-stock");
    butt.disabled = true;
  }
});

//disable product if out of stock for modal
pledgeQty.forEach((elem) => {
  let text = elem.innerHTML[0];
  if (text == "0") {
    let grandpa = elem.closest(".pledge-container");
    let input = grandpa.querySelector("input");
    grandpa.classList.add("out-of-stock");
    input.disabled = true;
  }
});

//Click on container to focus on input 'for radio in modal'
// **This function must come after determining if product is 'out-of-stock'**
pledgeContainer.forEach((elem) => {
  //only add click event if in stock
  if (!elem.classList.contains("out-of-stock")) {
    elem.addEventListener("click", (event) => {
      elem.querySelector("input").checked = true;
    });
  }
});
