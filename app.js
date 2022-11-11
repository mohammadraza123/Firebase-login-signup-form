import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,

} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqI6fpoGc5iJ6eU6XK1nWC1hT189Tf_fU",
  authDomain: "fir-registration-form-ef82f.firebaseapp.com",
  projectId: "fir-registration-form-ef82f",
  storageBucket: "fir-registration-form-ef82f.appspot.com",
  messagingSenderId: "517307223995",
  appId: "1:517307223995:web:4b8508d4ad3ee23b833e9e",
  measurementId: "G-RCLLZPLS7Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();



let user_first = document.getElementById("user_first");
let user_last = document.getElementById("user_last");
let sign_email = document.getElementById("sign_email");
let sign_password = document.getElementById("sign_password");
var form = document.querySelector(".form")
var form = document.querySelector(".form")
let email = document.getElementById("user_login");
let password = document.getElementById("login_password");
let log = document.querySelector(".login")
let user_data = document.querySelector(".data")

//LOGIN//



let login = document.getElementById("login_btn")
if (login !== null) {
  login.addEventListener("click", () => {
    var emailValidation = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(email.value);
    var passwordValidation = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password.value);
    if (emailValidation === false) {
      swal("ERROR", "Please Enter a Valid Email", "warning");
    }
    else if (passwordValidation === false) {
      swal("ERROR!", "Please Enter a Valid Password!", "warning");
    }
    else if (emailValidation === true && passwordValidation === true) {

      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
          form.innerHTML = `<i class="fa fa-circle-o-notch fa-spin" style= "font-size:95px"></i>`
          const user = userCredential.user;
          console.log("user==>", user)
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data1 = docSnap.data();
            console.log(data1)

            console.log(user_data)
            console.log(user_data)

            user_data.innerHTML = `
          Full Name : ${data1.FName, data1.LName} <br>
          Email : ${data1.email}<br>
          Password : ${data1.password}
          ${window.location = "profile.html"}
          `
            console.log(user_data)
          }
          else {

            console.log("No such document!");
          }
          console.log()
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error==>", errorMessage)

        });
    }
  })
}



//SIGNUP//
let sign_btn = document.getElementById("signup")
if (sign_btn !== null) {
  sign_btn.addEventListener("click", () => {
    var firstNameregex = /^\s*$/.test(user_first.value);
    var lastNameregex = /^\s*$/.test(user_last.value);
    var emailValidation = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(sign_email.value);
    var passwordValidation = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(sign_password.value);
    if (firstNameregex === true) {
      swal("ERROR", "Please Enter a First Name", "warning");
    }
    else if (lastNameregex === true) {
      swal("ERROR", "Please Enter a Last Name", "warning");

    }

    else if (emailValidation === false) {
      swal("ERROR", "Please Enter a Valid Email", "warning");

    }
    else if (passwordValidation === false) {
      swal("ERROR!", "Please Enter a Valid Password!", "warning");

    }
    else if (firstNameregex === false && lastNameregex === false && emailValidation === true && passwordValidation === true) {
      createUserWithEmailAndPassword(auth, sign_email.value, sign_password.value)
        .then(async (userCredential) => {
          form.innerHTML = `<i class="fa fa-circle-o-notch fa-spin" style= "font-size:95px"></i>`
          const user = userCredential.user;
          console.log("user==>", user)

          await setDoc(doc(db, "users", user.uid), {
            FName: user_first.value,
            LName: user_last.value,
            email: sign_email.value,
            password: sign_password.value,

          })
          window.location = "index.html"
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error==>", errorMessage)
        });
    }
  })
}