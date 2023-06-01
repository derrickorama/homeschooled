<template>
  <q-page class="q-mx-xl">
    <h2 class="text-h2">
      <span>{{ currentStudent?.name }}'s Day</span> <DayPicker />
    </h2>
    <div class="container">
      <ClassLesson
        v-for="(studentClass, index) in todaysClasses"
        :id="studentClass.id"
        :key="index"
        :class="{ 'q-mt-md': index > 0 }"
        :class-number="index + 1"
        :description="studentClass.description"
        :name="studentClass.name"
        :tasks="studentClass.tasks"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClassesStore } from 'src/stores/classes';
import ClassLesson from 'components/ClassLesson.vue';
import DayPicker from 'src/components/DayPicker.vue';
import { useStudentsStore } from 'src/stores/students';

const { currentStudent } = storeToRefs(useStudentsStore());

const { todaysClasses } = storeToRefs(useClassesStore());
</script>
