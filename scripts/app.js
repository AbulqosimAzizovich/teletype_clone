import utils from "./utils.js";
import { signUp, signIn } from "./contains.js";

let { $$, $ } = utils;

// BTN change action

$$(".change-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    localStorage.setItem("tabNumber", index);
    console.log(localStorage.getItem("tabNumber"));
    showContent(index);
  });
});

// TAB activation actions

function hideContent() {
  $$(".tab-item").forEach((tab) => {
    tab.style.display = "none";
  });
}

function showContent(index) {
  hideContent();
  $$(".tab-item")[index].style.display = "block";
}

hideContent();
showContent(localStorage.getItem("tabNumber") || 1);

// Modal actions

$("#openModal").addEventListener("click", () => {
  $(".modal-wrapper").classList.add("grid");
  $(".modal-wrapper").classList.remove("hidden");
});

$("#closeModal").addEventListener("click", () => {
  $(".modal-wrapper").classList.remove("grid");
  $(".modal-wrapper").classList.add("hidden");
});

// Modal actions end

// Authorization actions

$("#signup").addEventListener("click", (e) => {
  e.preventDefault();
  const signUpForm = {
    full_name: $("#full_name").value,
    password: $("#password").value,
    username: $("#user_name").value,
  };

  if ($("#confirm_password").value.trim() === signUpForm.password.trim()) {
    $("#password").classList.add("border", "border-2", "border-green-500");
    $("#confirm_password").classList.add(
      "border",
      "border-2",
      "border-green-500"
    );

    console.log(signUpForm);

    signUp(signUpForm)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  } else {
    $("#password").classList.add("border", "border-2", "border-red-500");
    $("#confirm_password").classList.add(
      "border",
      "border-2",
      "border-red-500"
    );
  }
});

// Authorization actions end
