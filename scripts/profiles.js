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
    state?.forEach((e) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div
              class="post__item shadow-md hover:shadow-xl duration-150 rounded--[16px] p-4 font-['inter']"
            >
              <h2
                class="post__tile text-center text-[28px] font-bold leading-[39px] mb-5"
              >
                ${e.title}
              </h2>
              <p class="post__text mb-[25.5px]">
                ${e.body?.substring(0, 256) + '...'}
              </p>

              

              <strong class="mb-3">● ${localStorage.getItem("username")}</strong>
              <div
                class="flex items-center gap-x-3 my-4 text-[#949494] text-[14px]"
              >
                <span>${e.createdAt.substring(0, 10)}</span>
                <i class="bx bx-show"></i>
                <span>${e.views}</span>
              </div>
            </div>
      `;
      $("#" + selector).append(card);
    });
  } else {
    $("#" + selector).innerHTML = `<h1 class='text-center'>${selector.toUpperCase()} NOT FOUND</h1>`;
  };
}

// <p class="post__text mb-[25.5px]">
//   Ozingiz API yaratib uni ishlatmoqchi bolsangiz sizga Mockapi.io, JSON Server,
//   Strapi lar yordam beroladi)
// </p>;

$("#add").addEventListener("click", () => {
  $("#post_blur").classList.remove("hidden");
  $("#post_md").classList.remove("hidden");
});


$("#post_close").addEventListener("click", () => {
  $("#post_blur").classList.add("hidden");
  $("#post_md").classList.add("hidden");
});
