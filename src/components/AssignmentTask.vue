<template>
  <div
    class="row"
    :class="{
      'bg-positive': complete,
      'items-center': complete,
      'items-start': !complete,
      'opacity-50': complete,
    }"
  >
    <q-checkbox class="q-mr-md" :model-value="complete" @click="completeTask" />
    <div class="column" :class="{ 'q-pt-sm': !complete }">
      <div class="text-bold">{{ name }}</div>
      <div v-if="!complete">
        <iframe
          v-if="type === 'video'"
          width="560"
          height="315"
          :src="url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div v-if="type === 'link'">
          <a :href="url" target="_blank">{{ url }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassesStore } from 'stores/classes';

const props = defineProps<{
  classId: string;
  complete: boolean;
  id: string;
  name: string;
  type: 'video' | 'link' | 'simple';
  url?: string;
  index: number;
}>();

const classesStore = useClassesStore();

function completeTask() {
  classesStore.completeTask(props.id, !props.complete);
}
</script>
