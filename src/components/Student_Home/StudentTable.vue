<template>
  <div>
    <p>{{ selected }}</p>
    <b-button v-if="selected[0]" variant="danger" @click="deleteStudents()">Delete</b-button>
    <b-button id="refresh" @click="loadData()">Refresh Data</b-button>
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
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Subjects</th>
          <th scope="col">Marks</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="marks in subjects" :key="person.id">
          <th scope="row"></th>
        </tr>
      </tbody>
    </table>
    <b-table :items="subjects"></b-table>
    <b-button v-if="subjects" @click="subjects=false">Clear</b-button>
  </div>
</template>
<script>
import firebase from '../../db/config';

let storeStudent = []
let db = firebase.firestore();
firebase.functions().useEmulator("localhost", 5000);

function remove_duplicates_es6(arr) {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}

export default {
  data() {
    return {
      modes: ['multi'],
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
      const call = firebase.functions().httpsCallable('test');
      call({}).then((result) => {
        console.log(result.data);
      });
    },
    loadData() {
      this.student = []
      storeStudent = []
      this.selected = []
      this.getStudents();
    },
    deleteStudents() {
      const deleteUserData = firebase.functions().httpsCallable('deleteUserData');
      this.selected = remove_duplicates_es6(this.selected);
      console.log([...this.selected])
      deleteUserData({ uid: [...this.selected], role: 'student' }).then((response) => {
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
      console.log([...this.selected])
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