<template>
  <q-page class="q-mx-xl">
    <h2>Jasmine's Day 53</h2>
    <div class="container">
      <ClassAssignment
        :class="{ 'q-mt-md': index > 0 }"
        v-for="(studentClass, index) in studentClasses"
        :key="index"
        :id="studentClass.id"
        :class-number="index + 1"
        :name="studentClass.name"
        :description="studentClass.description"
        :tasks="studentClass.tasks"
        @complete="completeTask(studentClass.id, $event)"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { StudentClass } from 'src/models';
import ClassAssignment from 'components/ClassAssignment.vue';

const studentClasses = ref<StudentClass[]>([
  {
    id: '1',
    name: "Children's Bible Lessons",
    description: 'Daily Bible lessons for elementary students.',
    tasks: [
      {
        complete: false,
        title: "God's Story: Mary",
        type: 'video',
        url: 'https://www.youtube.com/embed/i2YBd_88vRQ',
      },
      {
        complete: false,
        title: 'Mary Printable',
        type: 'link',
        url: 'https://leapoffaithcrafting.com/wp-content/uploads/2021/10/Christmas-Nativity-08-735x951.jpg.webp',
      },
    ],
  },
  {
    id: '3',
    name: '1st Grade Language Arts',
    description: 'First grade language arts.',
    tasks: [
      {
        complete: false,
        title:
          'Supported Practice: PA: Phoneme Isolation with m, r, h, s, d, t, and short a',
        type: 'link',
        url: 'https://www.time4learning.com',
      },
      {
        complete: false,
        title: 'Lowercase G',
        type: 'simple',
      },
      {
        complete: false,
        title: 'Lowercase O',
        type: 'simple',
      },
      {
        complete: false,
        title: 'Lowercase B',
        type: 'simple',
      },
      {
        complete: false,
        title: 'Spelling bog, bad, good',
        type: 'simple',
      },
    ],
  },
  {
    id: '2',
    name: '1st Grade Math',
    description: 'First grade math.',
    tasks: [
      {
        complete: false,
        title: 'Time4MathFacts',
        type: 'link',
        url: 'https://www.time4learning.com',
      },
    ],
  },
  {
    id: '4',
    name: 'Duolingo ABC',
    description: 'Learn to Read',
    tasks: [
      {
        complete: false,
        title: 'Duolingo Lesson',
        type: 'simple',
      },
    ],
  },
  {
    id: '5',
    name: 'Sight Words',
    description: 'Common words that schools expect kids to recognize instantly',
    tasks: [
      {
        complete: false,
        title: 'all, red, did, fun, not, dog',
        type: 'simple',
      },
    ],
  },
  {
    id: '5',
    name: 'Reading Eggs',
    description: 'Common words that schools expect kids to recognize instantly',
    tasks: [
      {
        complete: false,
        title: 'Level 28',
        type: 'link',
        url: 'https://readingeggs.com',
      },
    ],
  },
]);

function completeTask(
  classId: string,
  payload: { taskIndex: number; isComplete: boolean }
) {
  const { taskIndex, isComplete } = payload;
  const studentClass = studentClasses.value.find(({ id }) => {
    return id === classId;
  });

  const task = studentClass?.tasks[taskIndex];

  if (task) {
    task.complete = isComplete;
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
}
</style>
