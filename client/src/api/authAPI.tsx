import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route

  try {
    // send a POST request to 'auth/login' with user login information in JSON format
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    // throw an error if the response is not ok
    if (!response.ok) {
      throw new Error("User information not retrieved, check network tab!");
    }
    // otherwise just return the data
    return data;
  } catch (err) {
    console.log("Error from user login:", err);
    // return a rejected promise with an error message
    return Promise.reject("Could not fetch user info");
  }
};

export { login };
