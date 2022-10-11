<template>
  <h1><br></h1>
  <h1>Students</h1>
  <!-- <button @click="display()">Manage Students</button> -->
  <StudentTable />
  <StudentSignup />
</template>
  
<script>
import StudentTable from '../../components/Student_Home/StudentTable.vue';
import Tabletemp from '../../components/tabletemp.vue';
import StudentSignup from '../../components/Student_Home/StudentSignup.vue';
export default {
  components: {
    StudentTable,
    Tabletemp,
    StudentSignup
}
}
</script>