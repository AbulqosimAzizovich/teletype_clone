import utils from './utils.js';

let {$$, $}  = utils;


// BTN change action


$$(".change-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        localStorage.setItem("tabNumber", index);
        console.log(localStorage.getItem("tabNumber"));
        showContent(index);
    })
})








// TAB activation actions

function hideContent() {
    $$(".tab-item").forEach((tab) => {
      tab.style.display = "none";
    });
}

function showContent (index) {
    hideContent();  
    $$(".tab-item")[index].style.display = "block";
}



hideContent();  
showContent(localStorage.getItem("tabNumber") || 1);


