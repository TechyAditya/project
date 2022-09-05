import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8wHdsem-DGmoiTNz_9Tr3hMhD_U5_FfU",
    authDomain: "tsc-web-361112.firebaseapp.com",
    databaseURL: "https://tsc-web-361112-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "tsc-web-361112",
    storageBucket: "tsc-web-361112.appspot.com",
    messagingSenderId: "263466741558",
    appId: "1:263466741558:web:35a32980924b5b5fd04d97"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Create users without messing up auth state
export let authApp = firebase.initializeApp(firebaseConfig, 'authApp');
export let detachedAuth = authApp.auth();

// export utils/refs
export const db = firebase.firestore();
export default firebase;

// REMOVE THESE AFTER FINISHING PROJECT

// firebase.auth().onAuthStateChanged((user) => {
// 	const btn = document.getElementById('loginpg');
// 	if (user) {
// 		if (this.selected == '') {
// 			firebase.auth().signOut().then()
// 		}
// 		else {
// 			db.collection(role).doc(user.uid).get().then((doc) => {
// 				if (doc.exists) {
// 					if (role == 'students') {
// 						window.open("assets/student.html", "_self")
// 					} else if (role == 'teachers') {
// 						window.open("assets/teacher.html", "_self")
// 					} else if (role == 'admin') {
// 						window.open("assets/admin.html", "_self")
// 					}
// 				} else {
// 					btn.innerHTML = "Log in";
// 					btn.disabled = false;
// 					warn.style.display = "block";
// 					warn.innerHTML = "You are not registered as a " + role;
// 					firebase.auth().signOut().then();
// 				}
// 			})
// 		}
// 	}
// })

// const trigger = document.getElementById('loginbtn');
// trigger.addEventListener('click', (e) => {
// 	const btn = document.getElementById('loginpg');
// 	e.preventDefault();
// 	btn.addEventListener('click', (e) => {
// 		e.preventDefault();
// 		const form = document.getElementById('login');
// 		const emaill = form.email.value;
// 		const passwordd = form.password.value;
// 		const warn = document.getElementById('warn');
// 		console.log(emaill, passwordd, role);

// 		btn.innerHTML = "Logging in...";
// 		btn.disabled = true;
// 		role = form.role.value;
// 		console.log(emaill, passwordd, role);
// 		firebase.auth().signInWithEmailAndPassword(emaill, passwordd)
// 			.then(() => {
// 			}).catch((error) => {
// 				warn.style.display = "block";
// 				warn.innerHTML = error.message;
// 				console.log(error)
// 				btn.innerHTML = "Log in";
// 				btn.disabled = false;
// 			});
// 	})
// });
