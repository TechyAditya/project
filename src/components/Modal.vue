<template>
	<!-- Modal -->
	<b-modal id="loginForm" title="Login" aria-labelledby="loginForm" aria-hidden="true" :hide-footer="true">
		<form ref="form">
			<b-form-input id="email" type="email" v-model="email" class="form-control form-control-lg d-flex mx-auto"
				placeholder="Enter Email" required trim></b-form-input>
			<b-form-input id="password" type="password" v-model="password"
				class="form-control form-control-lg d-flex mx-auto" placeholder="Enter Password" required>
			</b-form-input>
			<!-- <div id="Remember" class="d-flex mx-auto mt-2">
				<input class="form-check-input" type="checkbox" value="" id="remme">
				<label class="form-check-label" for="remme"> Remember Me</label><br>
			</div> -->
			<div>
				<b-form-radio-group v-model="selected" :options="options" class="mb-3" value-field="item"
					text-field="name"></b-form-radio-group>
				<div class="mt-3" v-if="selected">Login as <strong>{{ selected }}</strong></div>
				<div id="warn" class="mt-3 text-danger" v-if="warnmsg"><strong>{{ warnmsg }}</strong></div>
			</div>
			<b-button id="loginpg" variant="success d-flex mx-auto mt-2" size="lg" type="button" @click="handleSubmit()"
				v-model="loginpg" :disabled=loginstate>{{ logintext }}</b-button>
		</form>
	</b-modal>
</template>

<script>
import firebase from '../db/config';
let db = firebase.firestore(); 

export default {
	// computed: {
	// 	state() {
	// 		return this.username.length <= 0
	// 	},
	// 	invalidFeedback() {
	// 		if (this.name.length > 0)
	// 			return 'Enter at least 4 characters.'
	// 		return 'Please enter something.'
	// 	}
	// },

	data() {
		return {
			selected: '',
			options: [
				{ item: 'student', name: 'Student' },
				{ item: 'teacher', name: 'Teacher' },
				{ item: 'admin', name: 'Admin' },
			],
			email: '',
			password: '',
			warnmsg: '',
			loginstate: false,
			logintext: 'Login',
			loginpg: false,
		}
	},
	methods: {
		handleSubmit() {
			const router = this.$router;
			const pathName = this.selected
			
			if(this.email && this.password && this.selected) {
				this.loginstate = true;
				this.logintext = 'Logging in...';
				firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then((user) => {
					console.log(pathName)
					// print user uid
					console.log(user.user.uid)
					db.collection(pathName).doc(user.user.uid).get().then((doc) => {
						this.loginstate = false;
						this.logintext = 'Login';
						this.warnmsg = '';
						if (doc.exists) {
							router.push({ path: `/${pathName}` })
							document.querySelector('.btn-close').click()
						}
						else {
							this.warnmsg = "You are not registered as a " + pathName
							firebase.auth().signOut()
						}
					})
				})
				.catch((error) => {
					this.warnmsg = error.message
					this.loginstate = false;
					this.logintext = 'Login';
				})
			}
		}
	}
}

</script>

<style>

</style>