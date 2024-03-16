import {API} from '../../backend'
//  API  http://localhost:7000/api/

/// Signup fetch method
export const signup = user => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

/// Signin fetch method

  
  export const signin = user => {
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  

  /// middleware Authenticated Route
  export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {                   //here window = chrome(i.e if chrome is define then)
      localStorage.setItem("jwt", JSON.stringify(data));     // localStrogae.setItem() is used to store data in chrome localstorage
      next();                                                // date i.e jwt has to be stored in string for local storage
    }
  };
  

  // Sign out method 
  export const signout = next => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      next();
  
      return fetch(`${API}/signout`, {
        method: "GET"
      })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err));
    }
  };
  

  /// Authenticated Route mostly to get user data 
  export const isAutheticated = () => {
    if (typeof window == "undefined") {           //if window is not crome than give error
      return false;
    }
    if (localStorage.getItem("jwt")) {            //if user is crome check if user data is in localstorage
      return JSON.parse(localStorage.getItem("jwt"));     //if user does not signout and directly close browser and come back after some 
    } else {                                             //time its data is still in local storage so he will be taken directly to enrollments
      return false;                                     // if not found than error and asked to signin
    }                                                
  };
  