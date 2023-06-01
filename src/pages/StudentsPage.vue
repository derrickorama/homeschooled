<template>
  <q-page class="q-mx-xl">
    <h2>Students</h2>
    <div class="container">
      <StudentDefinition
        v-for="(student, index) in students"
        :id="student.id"
        :key="student.id"
        :class="{ 'q-mt-md': index > 0 }"
        :name="student.name"
        :student-classes="student.classes"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStudentsStore } from 'stores/students';
import StudentDefinition from 'components/StudentDefinition.vue';

const { students } = storeToRefs(useStudentsStore());
</script>
