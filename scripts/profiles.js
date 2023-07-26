import utils from "./utils.js";
let { $$, $ } = utils;

// Tab contents

function hideContent() {
  $$(".tab__content").forEach((el) => (el.style.display = "none"));

  $$(".active_tab").forEach((item, index) => {
    item.classList.remove("active_tab");
  });
}

function showContent(index) {
  $$(".tab__content")[index].style.display = "block";
  $$(".tab__item")[index].classList.add("active_tab");
}

$$(".tab__item").forEach((item, index) => {
  item.addEventListener("click", () => {
    hideContent();
    localStorage.setItem("active_index", index);
    showContent(index);
  });
});

hideContent();
showContent(localStorage.getItem("active_index") || 0);

window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "./index.html";
  }
});

// Profile fetching data

const id = localStorage.getItem("user");
async function getUser() {
  try {
    const response = await fetch(
      `https://nest-blog-qdsa.onrender.com/api/user/${id}`
    );
    const res = await response.json();
    console.log(res);
    dataRender(res);
    listRender(res.blog, "posts");
    listRender(res.followers, "followers");
    listRender(res.followings, "followings");
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log("Done!");
  }
}

getUser();

// Profile fetching data end

function dataRender(state) {
  $("#user_name").textContent = state.username;
  $("#full_name").textContent = state.full_name;
}

function listRender(state, selector) {
  console.log(state);
  console.log(selector);

  if (state.length) {
    state?.forEach(() => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<img src="https://picsum.photos/id/211/300/300"><h1>Lorem </h1>`;
      $("#" + selector).append(card);
    });
  } else {
    $("#" + selector).innerHTML = `<h1 class='text-center'>${selector.toUpperCase()} NOT FOUND</h1>`;
  };
}

$("#add").addEventListener("click", () => {
  $("#post_blur").classList.remove("hidden");
  $("#post_md").classList.remove("hidden");
});


$("#post_close").addEventListener("click", () => {
  $("#post_blur").classList.add("hidden");
  $("#post_md").classList.add("hidden");
});
