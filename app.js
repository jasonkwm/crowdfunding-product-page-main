const body = document.querySelector("body");
const getStarted = document.querySelector("#start");
const prodButton = document.querySelectorAll("button");
const prodContainer = document.querySelectorAll(".product-container");
const pledgeContainer = document.querySelectorAll(".pledge-container");
const pledgeBackground = document.querySelector(".pledge-background");
const successBackground = document.querySelector(".success-background");
const prodQty = document.querySelectorAll(".product-quantity");
const pledgeQty = document.querySelectorAll(".pledge-quantity");
const menuBtn = document.querySelector("#menu-btn");
const menuList = document.querySelector(".menu-lists");
const visible = `visibility: visible; opacity: 1;`;
const pledges = document.querySelectorAll("input[type=radio][name='pledges']");
const submitButton = document.querySelectorAll(".submit-button");
//Nav 'Get Started' to open modal and focus on #no-pledge
getStarted.addEventListener("click", (e) => {
  document.querySelector("#no-pledge").checked = true;
  pledgeBackground.style.cssText = visible;
  body.classList.add("body-modal");
  pledgeBackground.scrollTop = 0;
});

//Menu Button
menuBtn.addEventListener("click", (menu) => {
  if (menuList.classList.contains("menu-active")) {
    menuList.classList.remove("menu-active");
  } else {
    menuList.classList.add("menu-active");
  }
});

//Bookmark
const bookmark = document.querySelector("#bookmark");
bookmark.setAttribute("title", document.title);
bookmark.setAttribute("rel", "sidebar");
bookmark.setAttribute("href", window.location.href);

//       alert(
//         "You can add this page to your bookmarks by pressing " +
//           (navigator.userAgent.toLowerCase().indexOf("mac") != -1
//             ? "Command/Cmd"
//             : "CTRL") +
//           " + D on your keyboard."
//       );
//     }

//Click on product to open modal
prodButton.forEach((elem) => {
  //Remove active status
  elem.addEventListener("click", (c) => {
    pledgeContainer.forEach((container) => {
      container.classList.remove("pledge-active");
      container.querySelector(".pledge-price").classList.remove("price-active");
    });
    // gp = GrandParent, id= input type radio
    let id = document.querySelector(`#${c.target.value}`);
    let gp = id.closest(".pledge-container");
    let pledgePrice = gp.querySelector(".pledge-price");
    id.checked = true;
    pledgeBackground.style.cssText = visible;
    body.classList.add("body-modal");
    gp.classList.add("pledge-active");
    pledgePrice.classList.add("price-active");
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
  let price = elem.querySelector(".pledge-price");
  if (!elem.classList.contains("out-of-stock")) {
    elem.addEventListener("click", (event) => {
      pledgeContainer.forEach((con) => {
        let p = con.querySelector(".pledge-price");
        con.classList.remove("pledge-active");
        p.classList.remove("price-active");
      });
      elem.querySelector("input").checked = true;
      elem.classList.add("pledge-active");
      price.classList.add("price-active");
    });
  }
});

submitButton.forEach((button) => {
  button.addEventListener("click", () => {
    pledgeBackground.style.cssText = "visibility:hidden; opacity:0; ";
    successBackground.style.cssText = visible;
  });
});

const gotIt = document.querySelector("#got-it");

gotIt.addEventListener("click", () => {
  successBackground.style.cssText = "visibility:hidden; opacity:0; ";
  body.classList.remove("body-modal");
});
