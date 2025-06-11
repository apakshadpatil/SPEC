import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


    // 🔁 Replace with your own Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDlAlIsiiUqSSNGsxinMZkHZmL1hBRBHZs",
    authDomain: "spec-5f328.firebaseapp.com",
    databaseURL: "https://spec-5f328-default-rtdb.firebaseio.com",
    projectId: "spec-5f328",
    storageBucket: "spec-5f328.firebasestorage.app",
    messagingSenderId: "53770175211",
    appId: "1:53770175211:web:9be048ccd7d190fc7434ae"
};

    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.loginUser = function () {
      const email = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const status_container = document.getElementById('status_container');
      if (!email || !password) {
        const myDiv = document.createElement("div");
        myDiv.id = "status_box";
        myDiv.textContent = "Email Password Empty!";
        status_container.appendChild(myDiv);
        setTimeout(()=>{
            myDiv.remove();
        },3000);
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem("userEmail",email);
          // Redirect or handle post-login
          const myDiv = document.createElement('div');
          myDiv.id = "success_status_box";
          myDiv.textContent = "Login Succcessful !!";
          status_container.appendChild(myDiv);
          setTimeout(()=>{
            myDiv.remove();
          },3000);
          setTimeout(() => {
            window.location.href = "dashboard/dashboard.html";
          },2000);
        })
        .catch((error) => {
          console.error("Login error:", error);
          const myDiv = document.createElement("div");
          myDiv.id = "status_box";
          myDiv.textContent = "Invalid Credentials !!";
          status_container.appendChild(myDiv);
          setTimeout(()=>{
            myDiv.remove();
          },3000);
        });
};

// Google login function
window.googleLogin = function () {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const status_container = document.getElementById('status_container');
      const myDiv = document.createElement('div');
      myDiv.id = "success_status_box";
      myDiv.textContent = "Google Login Successful !!";
      status_container.appendChild(myDiv);
      setTimeout(() => {
        myDiv.remove();
      }, 3000);
      sessionStorage.setItem("userEmail", user.email);
      setTimeout(() => {
        window.location.href = "dashboard/dashboard.html";
      }, 2000);
    })
    .catch((error) => {
      const status_container = document.getElementById('status_container');
      const myDiv = document.createElement("div");
      myDiv.id = "status_box";
      myDiv.textContent = "Google Login Failed !!";
      status_container.appendChild(myDiv);
      setTimeout(() => {
        myDiv.remove();
      }, 3000);
      console.error("Google Login Error:", error.message);
    });
};
document.getElementById("google_btn").addEventListener("click", googleLogin);

//Event listener for login button
document.getElementById("login_btn").addEventListener("click",loginUser);

[document.getElementById("username"), document.getElementById("password")].forEach(input => {
    input.addEventListener("keydown", function(event) {
        if(event.key == "Enter") {
            loginUser();
        }
    });
});

window.addEventListener("keydown" , function(event) {
  if(event.key == "Enter"){
    loginUser();
  }
});