<template>
  <div>
    <p>{{ selected }}</p>
    <b-button v-if="selected[0]" variant="danger" @click="deleteStudents()">Delete</b-button>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Class</th>
          <th scope="col">Batch</th>
          <th scope="col">Phone</th>
          <th scope="col">Email</th>
          <th scope="col">Subjects</th>
        </tr>
      </thead>
      <tbody ref="rows" id="rows">
        <tr v-for="person in student" :key="person.id">
          <th scope="row">
            <input type="checkbox" @click="person.selected=onRowSelected(person.selected, person.id)"
              :value="person.selected">
            <!-- {{ person.id }} -->
          </th>
          <td>{{ person.name }}</td>
          <td>{{ person.class }}</td>
          <td>{{ person.batch }}</td>
          <td>{{ person.phone }}</td>
          <td>{{ person.email }}</td>
          <td>
            <button @click="showMarks(person.id)">Marks</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>{{ subjects }}</p>
    <b-table :items="subjects"></b-table>
    <b-button v-if="subjects" @click="subjects=false">Clear</b-button>
  </div>
</template>
<script>
import firebase from '../../db/config';


let storeStudent = []
let db = firebase.firestore();
export default {
  data() {
    return {
      modes: ['multi'],
      fields: ['select', 'name', 'class', 'batch', 'show_marks'],
      student: storeStudent,
      selectMode: 'multi',
      selected: [],
      subjects: false,
    }
  },
  methods: {
    getStudents() {
      db.collection('student').get().then((snapshot) => {
        // set vue student data
        storeStudent = snapshot.docs.map(doc => {
          return { id: doc.id, selected: false, ...doc.data() }
        })
        this.student = storeStudent
        console.log(storeStudent)
      })
    },
    loadData() {
      this.getStudents();
    },
    deleteStudents() {
      const deleteUserData = firebase.functions().httpsCallable('deleteUserData');
      deleteUserData({ uid: this.selected, role: 'student' }).then((response) => {
        console.log("Function executed");
        console.log(response);
        this.loadData();
      })
    },
    onRowSelected(selected, id) {
      console.log(storeStudent)
      if (!selected) {
        this.selected.push(id)
      } else {
        this.selected = this.selected.filter(item => item !== id)
      }
      console.log(this.selected)
      return !selected
    },
    showMarks(id) {
      storeStudent.forEach((student) => {
        if (student.id === id) {
          this.subjects = []
          if (student.subjects)
            for (const [key, value] of Object.entries(student.subjects)) {
              this.subjects.push({ subject: key, marks: value })
            }
        }
      })
    },
    testFun() {
      const test = firebase.functions().httpsCallable('test');
      test().then(response => {
        console.log("Function executed");
        console.log(response.data);
      })
    },
    display() {
      console.log(storeStudent)
    }
  },
  created() {
    this.loadData();
  }
}
</script>