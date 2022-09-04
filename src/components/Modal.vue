<template>
	<!-- Modal -->
	<b-modal id="loginForm" title="Login" aria-labelledby="loginForm" aria-hidden="true" :hide-footer="true">
		<form ref="form">
			<b-form-input id="username" v-model="username" class="form-control form-control-lg d-flex mx-auto"
				placeholder="Enter Username" required trim></b-form-input>
			<b-form-input id="password" v-model="password" class="form-control form-control-lg d-flex mx-auto"
				placeholder="Enter Password" required></b-form-input>
			<!-- <div id="Remember" class="d-flex mx-auto mt-2">
				<input class="form-check-input" type="checkbox" value="" id="remme">
				<label class="form-check-label" for="remme"> Remember Me</label><br>
			</div> -->
			<div>
				<b-form-radio-group v-model="selected" :options="options" class="mb-3" value-field="item"
					text-field="name"></b-form-radio-group>
				<div class="mt-3">Login As : <strong>{{ selected }}</strong></div>
			</div>
			<b-button id="loginpg" variant="success d-flex mx-auto mt-2" size="lg" type="button" @click="handleSubmit()"
				data-bs-dismiss="modal">Login</b-button>
		</form>
	</b-modal>
</template>

<script>
import firebase from '../firebase/config';
firebase.auth().onAuthStateChanged((user) => {
	const btn = document.getElementById('loginpg');
	if (user) {
		if (role == false) {
			firebase.auth().signOut().then()
		}
		else {
			db.collection(role).doc(user.uid).get().then((doc) => {
				if (doc.exists) {
					if (role == 'students') {
						window.open("assets/student.html", "_self")
					} else if (role == 'teachers') {
						window.open("assets/teacher.html", "_self")
					} else if (role == 'admin') {
						window.open("assets/admin.html", "_self")
					}
				} else {
					btn.innerHTML = "Log in";
					btn.disabled = false;
					warn.style.display = "block";
					warn.innerHTML = "You are not registered as a " + role;
					firebase.auth().signOut().then();
				}
			})
		}
	}
})

const trigger = document.getElementById('loginbtn');
trigger.addEventListener('click', (e) => {
	const btn = document.getElementById('loginpg');
	e.preventDefault();
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		const form = document.getElementById('login');
		const emaill = form.email.value;
		const passwordd = form.password.value;
		const warn = document.getElementById('warn');
		console.log(emaill, passwordd, role);

		btn.innerHTML = "Logging in...";
		btn.disabled = true;
		role = form.role.value;
		console.log(emaill, passwordd, role);
		firebase.auth().signInWithEmailAndPassword(emaill, passwordd)
			.then(() => {
			}).catch((error) => {
				warn.style.display = "block";
				warn.innerHTML = error.message;
				console.log(error)
				btn.innerHTML = "Log in";
				btn.disabled = false;
			});
	})
});
export default {
	// computed: {
	// 	state() {
	// 		return this.username.length <= 0
	// 	},
	// 	// invalidFeedback() {
	// 	// 	if (this.name.length > 0)
	// 	// 		return 'Enter at least 4 characters.'
	// 	// 	return 'Please enter something.'
	// 	// }
	// },

	data() {
		return {
			selected: '',
			options: [
				{ item: 'Student', name: 'Student' },
				{ item: 'Teacher', name: 'Teacher' },
				{ item: 'Admin', name: 'Admin' },
			]
		}
	},
	methods: {
		handleSubmit() {
			const pathName = this.selected
			this.$router.push({
				name: pathName,
				params: {
					id: '00'
				}
			})
		}
	}
}



</script>

<style>
</style>