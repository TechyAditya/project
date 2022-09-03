<template>
  <!-- Modal -->
	<div class="modal fade" id="staticBackdrop" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Log In</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
						<input id="username" class="form-control form-control-lg d-flex mx-auto" placeholder="Enter Username" required>
						<input id="password" class="form-control form-control-lg d-flex mx-auto mt-2" placeholder="Enter Password" required>
						<div id="Remember" class="d-flex mx-auto mt-2">
							<input class="form-check-input" type="checkbox" value="" id="remme">
							<label class="form-check-label" for="remme"> Remember Me</label><br>
						</div>
						<div id="Las" class="d-flex mx-auto mt-2">
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="signInAs" id="student" value="Student">
								<label class="form-check-label" for="student">student</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="signInAs" id="teacher" value="Teacher">
								<label class="form-check-label" for="teacher">teacher</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="signInAs" id="admin" value="Admin">
								<label class="form-check-label" for="admin">admin</label>
							</div>
						</div>
						<button class="btn btn-primary btn-lg d-flex mx-auto mt-2 btn-success" type="button" @click="handleclick()">Login</button>
					</form>
				</div>
				<!-- <div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Understood</button>
				</div> -->
			</div>
		</div>
	</div>

</template>

<script>
export default {
	methods: {
		handleclick() {
			var signInAs = document.querySelector('input[name="signInAs"]:checked').value
			console.log(signInAs)
			this.$router.push({
				name: signInAs,
				params: {
					id : '00'
				}
			})
		}
	}
}
</script>

<style>

</style>