<template>
  <div
    class="row"
    :class="{
      'bg-positive': complete,
      'items-center': complete && type === 'simple',
      'items-start': !complete || type !== 'simple',
      'opacity-50': complete,
      'q-py-sm': complete && type === 'simple',
    }"
  >
    <q-checkbox class="q-mr-md" :model-value="complete" @click="completeTask" />
    <div
      class="column"
      :class="{
        'q-pt-sm': !complete || type !== 'simple',
        'q-pb-md': type === 'video',
        'q-pb-sm': type === 'link',
      }"
    >
      <div class="text-bold">{{ name }}</div>
      <iframe
        v-if="type === 'video'"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        frameborder="0"
        height="315"
        :src="url"
        title="YouTube video player"
        width="560"
      ></iframe>
      <div v-if="type === 'link'">
        <a :href="url" target="_blank">{{ url }}</a>
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
