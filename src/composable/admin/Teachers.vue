<template>
  <h1><br></h1>
  <h1>Teachers</h1>
  <!-- <button @click="display()">Manage Students</button> -->
  <TeacherTable />
  <TeacherSignup />
</template>
  
<script>
import TeacherTable from '../../components/Teacher_Home/TeacherTable.vue';
// import TeacherSignup from '../../components/Teacher_Home/TeacherSignup.vue';
export default {
  components: {
    TeacherTable
}
}
</script>