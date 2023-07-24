let baseUrl = "https://nest-blog-qdsa.onrender.com";

// data -> auth Object

async function signUp(data) {
  try {
    return await fetch(`${baseUrl}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error.message, "sign up");
  }
}

async function signIn(data) {
  try {
    return await fetch(`${baseUrl}/api/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error.message, "sign in");
  }
}

export { signUp, signIn };
