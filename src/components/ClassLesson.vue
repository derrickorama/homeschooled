<template>
  <q-card
    :class="{
      'q-pb-none': !classDone,
      'q-pb-md': classDone,
    }"
  >
    <q-card-section class="row justify-between q-pb-none">
      <div>
        <div class="text-h5">{{ name }}</div>
        <div class="text-grey-7">
          {{ description }}
        </div>
      </div>
      <div v-if="classDone" class="row items-center">
        <q-btn
          class="q-mr-md"
          color="grey-7"
          dense
          flat
          padding="0 sm"
          @click="toggleShowTasks"
          >{{ showTasks ? 'Hide' : 'Show' }} Tasks</q-btn
        >
        <q-icon color="positive" name="done" size="xl" />
      </div>
    </q-card-section>
    <q-card-section
      v-if="!classDone || (classDone && showTasks)"
      class="column q-pt-sm"
      :class="{ 'q-pb-none': classDone }"
    >
      <q-banner v-if="!tasks.length" class="bg-info text-purple-10">
        No tasks were added for this class today.
      </q-banner>
      <LessonTask
        v-for="(task, index) in tasks"
        :key="index"
        v-bind="{ ...task, index }"
        @complete="$emit('complete', $event)"
      />
      <div class="q-mt-md">
        <q-btn color="secondary" label="Add Task" @click="openAddTask" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar';
import { computed, ref } from 'vue';
import { Task } from 'src/models';
import AddTaskDialog from 'components/AddTaskDialog.vue';
import LessonTask from 'components/LessonTask.vue';

const props = defineProps<{
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}>();

defineEmits(['complete']);

const showTasks = ref(false);

const allTasksComplete = computed(() =>
  props.tasks.every(({ complete }) => complete)
);

const classDone = computed(() => allTasksComplete.value && props.tasks.length);

function toggleShowTasks() {
  showTasks.value = !showTasks.value;
}

function openAddTask() {
  Dialog.create({
    component: AddTaskDialog,
    componentProps: {
      classId: props.id,
    },
  });
}
</script>
