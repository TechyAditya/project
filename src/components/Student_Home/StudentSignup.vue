<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Create Student:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
        <b-form-input id="input-6" v-model="form.pwd" type="password" placeholder="Enter password" required>
        </b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Enter Details:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.name" placeholder="Enter name" required></b-form-input>
        <b-form-input id="input-3" v-model="form.phone" type="number" placeholder="Enter phone number" required></b-form-input>
        <b-form-input id="input-4" v-model="form.classno" type="number" placeholder="Enter class" required></b-form-input>
        <b-form-input id="input-5" v-model="form.batch" type="number" placeholder="Enter batch" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4" :aria-describedby="ariaDescribedby">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import authApp from '../../db/config';
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        phone: '',
        classno: '',
        batch: '',
        pwd: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const form = this.form
      console.log(form)
      const name = form.name;
      const email = form.email;
      const password = form.pwd;
      const phone = form.phone;
      const role = 'student';
      const batch = form.batch;
      const classno = form.classno;
      console.log(name, email, password, phone, role, batch, classno);
      authApp.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          authApp.functions().httpsCallable('createStudent')({
            name: name,
            email: email,
            phone: phone,
            role: role,
            batch: batch,
            classno: classno
          }).then(() => {
            console.log('user created');
            this.onReset(event);
          }).catch((err) => {
            console.log(err);
          })  
        })
    },
    onReset(event) {
      event.preventDefault()
      document.querySelector('#refresh').click()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.phone = ''
      this.form.classno = ''
      this.form.batch = ''
      this.form.pwd = ''

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>