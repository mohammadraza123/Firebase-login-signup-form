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






