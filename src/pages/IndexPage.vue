<template>
  <q-page class="q-mx-xl">
    <div class="container">
      <h2 class="row justify-between text-h2">
        <div class="line-height-1">
          <div>Today's Assignments</div>
          <div><DayPicker /></div>
        </div>
        <div class="row items-center">
          <q-select
            class="q-mr-sm"
            dense
            emit-value
            hide-dropdown-icon
            map-options
            :model-value="selectedStudent"
            :options="studentOptions"
            standout
            @update:model-value="studentStore.selectStudent($event)"
          >
            <template #prepend>
              <q-icon name="account_circle" />
            </template>
          </q-select>
        </div>
      </h2>
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
import { computed } from 'vue';
import { useClassesStore } from 'src/stores/classes';
import ClassLesson from 'components/ClassLesson.vue';
import DayPicker from 'src/components/DayPicker.vue';
import { useStudentsStore } from 'src/stores/students';

const studentStore = useStudentsStore();

const { currentStudent, students } = storeToRefs(studentStore);

const { todaysClasses } = storeToRefs(useClassesStore());

const studentOptions = computed(() =>
  Object.values(students.value).map(({ id, name }) => ({
    label: `${name}`,
    value: id,
  }))
);

const selectedStudent = computed(() => currentStudent.value?.id);
</script>
