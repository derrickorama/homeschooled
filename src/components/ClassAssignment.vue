<template>
  <q-card class="q-pb-md">
    <q-card-section class="row justify-between q-pb-none">
      <div>
        <div class="text-h5">{{ name }}</div>
        <div class="text-grey-7">
          {{ description }}
        </div>
      </div>
      <div v-if="allTasksComplete" class="row items-center">
        <q-btn
          dense
          flat
          class="q-mr-md"
          padding="0 sm"
          color="grey-7"
          @click="toggleShowTasks"
          >{{ showTasks ? 'Hide' : 'Show' }} Tasks</q-btn
        >
        <q-icon name="done" color="positive" size="xl" />
      </div>
    </q-card-section>
    <q-card-section
      class="column q-pt-sm"
      v-if="!allTasksComplete || showTasks"
    >
      <AssignmentTask
        v-for="(task, index) in tasks"
        :key="index"
        v-bind="{ ...task, index }"
        @complete="$emit('complete', $event)"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Task } from 'src/models';
import AssignmentTask from 'src/components/AssignmentTask.vue';

const props = defineProps<{
  classNumber: number;
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}>();

defineEmits(['complete']);

const showTasks = ref(false);

const allTasksComplete = computed(() => {
  return props.tasks.every(({ complete }) => complete);
});

function toggleShowTasks() {
  showTasks.value = !showTasks.value;
}
</script>
