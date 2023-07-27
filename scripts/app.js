import utils from "./utils.js";
import { signUp, signIn } from "./contains.js";

let { $$, $ } = utils;

// BTN change action

$$(".change-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    localStorage.setItem("tabNumber", index);
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

$("#signin").addEventListener("click", (e) => {
  e.preventDefault();
  const signInForm = {
    password: $("#login_password").value,
    username: $("#login_user").value,
  };

  if (
    signInForm.password.trim().length === 0 ||
    signInForm.username.trim().length === 0
  ) {
    alert("Please enter your username or password");
    $("#login_password").classList.add("border", "border-2", "border-red-500");
    $("#login_user").classList.add("border", "border-2", "border-red-500");
  } else {
    signIn(signInForm)
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.user.id);
        localStorage.setItem("username", result?.user?.full_name);
        window.location.href = "./profile.html";
        if (result.statusCode == "400") {
          $("#login_password").classList.add(
            "border",
            "border-2",
            "border-red-500"
          );
          $("#login_user").classList.add(
            "border",
            "border-2",
            "border-red-500"
          );
        } else {
          $("#login_password").classList.add(
            "border",
            "border-2",
            "border-green-500"
          );
          $("#login_user").classList.add(
            "border",
            "border-2",
            "border-green-500"
          );
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});
// Authorization actions end

function authCheck() {
  if (localStorage.getItem("token")) {
    $("#menu").classList.remove("hidden");
    $("#openModal").classList.add("hidden");
    $("#user_info").textContent = localStorage.getItem("username");
  } else {
    $("#menu").classList.add("hidden");
    $("#dropdown").classList.add("hidden");
    $("#openModal").classList.remove("hidden");
  }
}

authCheck();

$("#menu").addEventListener("click", () => {
  $("#dropdown").classList.toggle("hidden");
});

$("#logout").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

$("#add").addEventListener('click', () => {
  $("#post_blur").classList.remove("hidden");
  $("#post_md").classList.remove("hidden");
});

$("#add_p").addEventListener("click", () => {
  $("#post_blur").classList.remove("hidden");
  $("#post_md").classList.remove("hidden");
});


$("#post_blur").addEventListener("click", () => {
  $("#post_blur").classList.add("hidden");
  $("#post_md").classList.add("hidden");
});

$("#post_close").addEventListener('click', () => {
  $("#post_blur").classList.add("hidden");
  $("#post_md").classList.add("hidden");
});


function addPost() {
  const newBlog = {
    title: $("#title").value,
    body: $("#textarea").value,
    user_id: localStorage.getItem("user"),
  };

  if (newBlog.title.trim().length === 0 || newBlog.body.trim().length ===0) {
    alert("Please enter a title and a body");
  }else {
    fetch("https://nest-blog-qdsa.onrender.com/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newBlog),
    }) 
    .then((res) => res.json())
    .then((res) => console.log(res));
        
  }
}


$("#post_send").addEventListener("click", () => {
  addPost();
});


