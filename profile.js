import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";



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


let user_data = document.querySelector(".data")

window.onload = onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data1 = docSnap.data();
      console.log(data1)
      user_data.innerHTML = `
          
        Full Name : ${data1.FName + " " + data1.LName} <br>
        Email : ${data1.email}<br>
        Password : ${data1.password}
        `
      console.log(user_data)

    }

  } else {
    console.log("no such document")
  }
});






