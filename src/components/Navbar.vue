<template>
	<header>
		<nav class="navbar navbar-expand-md sticky-top border-bottom bg-light shadow bg-body rounded">
			<div class="container-fluid">
				<a class="navbar-brand" href="#" style="max-width: 6%;">
					<img src="../assets/logo.png" class="img-fluid">
				</a>
				<a class="navbar-brand d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 mb-1 text-primary"
					href="#" @click="this.$router.push('/')">{{ name }}</a>
				<b-button class="navbar-toggler collapsed position-relative" data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
					aria-label="Toggle navigation">
					<span> </span><span> </span><span> </span>
				</b-button>
				<div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
					<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0"
						v-if="isLoggedIn()">
						<b-button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
							data-bs-target="#home" role="tab" aria-controls="home" aria-selected="true">Home</b-button>
						<b-button class="nav-link" id="pills-course-tab" data-bs-toggle="pill" data-bs-target="#courses"
							role="tab" aria-controls="courses" aria-selected="false">Courses</b-button>
						<b-button class="nav-link" id="pills-success-tab" data-bs-toggle="pill"
							data-bs-target="#success" role="tab" aria-controls="success" aria-selected="false">Our
							Success</b-button>
						<b-button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#about"
							role="tab" aria-controls="about" aria-selected="false">About Us</b-button>
						<b-button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
							data-bs-target="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact
							Us</b-button>
					</div>
					<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0"
						v-else-if="userType() === 'Student'">
						<b-button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
							data-bs-target="#home" role="tab" aria-controls="home" aria-selected="true">Home</b-button>
						<b-button class="nav-link" id="pills-course-tab" data-bs-toggle="pill"
							data-bs-target="#download" role="tab" aria-controls="courses" aria-selected="false">Download
						</b-button>
						<b-button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#exam"
							role="tab" aria-controls="success" aria-selected="false">Exam</b-button>
						<b-button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#feedback"
							role="tab" aria-controls="about" aria-selected="false">Feedback</b-button>
					</div>
					<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0"
						v-else-if="userType() === 'Teacher'">
						<b-button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
							data-bs-target="#home" role="tab" aria-controls="home" aria-selected="true">Home</b-button>
						<b-button class="nav-link" id="pills-course-tab" data-bs-toggle="pill"
							data-bs-target="#download" role="tab" aria-controls="courses" aria-selected="false">Download
						</b-button>
						<b-button class="nav-link" id="pills-success-tab" data-bs-toggle="pill" data-bs-target="#exam"
							role="tab" aria-controls="success" aria-selected="false">Exam</b-button>
					</div>
					<div class="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0"
						v-else-if="userType() === 'Admin'">
						<b-button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
							data-bs-target="#home" role="tab" aria-controls="home" aria-selected="true">Home</b-button>
						<b-button class="nav-link" id="pills-course-tab" data-bs-toggle="pill"
							data-bs-target="#students" role="tab" aria-controls="courses" aria-selected="false">Students
						</b-button>
						<b-button class="nav-link" id="pills-success-tab" data-bs-toggle="pill"
							data-bs-target="#teachers" role="tab" aria-controls="success" aria-selected="false">Teachers
						</b-button>
						<b-button class="nav-link" id="pills-success-tab" data-bs-toggle="pill"
							data-bs-target="#courses" role="tab" aria-controls="success" aria-selected="false">Courses
						</b-button>
						<b-button class="nav-link" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#site"
							role="tab" aria-controls="about" aria-selected="false">Site</b-button>
					</div>
					<div class="col-md-3 text-end" v-if="isLoggedIn()">
						<!-- Button trigger modal -->
						<b-button variant="outline-primary mx-md-2" v-b-modal.loginForm ref="loginBtn">Login</b-button>
						<b-button variant="success">Register</b-button>
					</div>
					<div class="col-md-3 text-end" v-else>
						<h3 class="text-success">Welcome {{ username }}!</h3>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import firebase from '../db/config.js'
import db from '../db/config.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

function retName(uid, scope) {
	firebase.firestore().collection('admin').doc(uid).get().then((user) => {
		scope.username = user.data().name
	})
}

const username = 'User'

export default {
	data() {
		return {
			username: ref('User'),
		}
	},
	props: [
		"name"
	],
	methods: {
		isLoggedIn() {
			this.getName()
			// console.log(this.$route.path)
			return this.$route.path == '/'
		},
		userType() {
			const name = this.$route.name
			// console.log(name)
			if (name == 'Student')
				return 'Student'
			if (name == 'Teacher')
				return 'Teacher'
			if (name == 'Admin')
				return 'Admin'
		},
		getName() {
			const scope = this
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					console.log('user is signed in')
					retName(user.uid, scope)
				} else {
					console.log('user is not signed in')
				}
			})
		}
	}
	// setup() {
	// 	const username = ref('')
	// 	const route = useRoute()
	// 	const routeName = route.name
	// 	const isLoggedIn = () => {
	// 		// console.log(this.$route.path)
	// 		return routeName === 'Welcome'
	// 	}
	// 	const userType = () => {
	// 		if (routeName == 'Student')
	// 			return 'Student'
	// 		if (routeName == 'Teacher')
	// 			return 'Teacher'
	// 		if (routeName == 'Admin')
	// 			return 'Admin'
	// 	}
	// 	const getName = () => {
	// 		firebase.auth().onAuthStateChanged((user) => {
	// 			if (user) {
	// 				console.log('user is signed in')
	// 				// this.username = user.displayName
	// 				console.log(user.uid)
	// 				username.value = user.uid
	// 				console.log(username)
	// 			} else {
	// 				console.log('user is not signed in')
					
	// 			}
	// 		})
	// 		// console.log(uid)
	// 		// return db.collection('admin').doc(uid).get().then((user) => {
	// 		// 	console.log(user.data().name)
	// 		// 	return user.data().name
	// 		// })
	// 	}

	// 	return { 
	// 		username, isLoggedIn, userType, getName
	// 	}
	// }
}
</script>

<style>
.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
	color: #fff !important;
	background-color: #198754 !important;
}

.nav-link:not(.active):hover {
	transform: scale(1.2);
	color: #198754 !important;
}

.nav-link {
	color: #777777 !important;
}

.navbar-toggler:focus,
.navbar-toggler:active {
	outline: none
}

.navbar-toggler span {
	display: block;
	background-color: #444;
	height: 3px;
	width: 25px;
	margin-top: 4px;
	margin-bottom: 4px;
	transform: rotate(0deg);
	position: relative;
	left: 0;
	opacity: 1;
}

.navbar-toggler span:nth-child(1),
.navbar-toggler span:nth-child(3) {
	transition: transform 300ms linear;
}

.navbar-toggler:not(.collapsed) span:nth-child(1) {
	position: absolute;
	left: 12px;
	top: 10px;
	transform: rotate(45deg);
	opacity: 0.9;
}

.navbar-toggler:not(.collapsed) span:nth-child(2) {
	height: 12px;
	visibility: hidden;
	background-color: transparent;
}

.navbar-toggler:not(.collapsed) span:nth-child(3) {
	position: absolute;
	left: 12px;
	top: 10px;
	transform: rotate(-45deg);
	opacity: 0.9;
}
</style>