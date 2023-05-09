<template>
  <q-card
    class="row items-start"
    :class="{
      'q-mt-md': index > 0,
      'bg-positive': complete,
      'opacity-50': complete,
    }"
  >
    <q-checkbox
      class="q-mr-md"
      :model-value="complete"
      @click="$emit('complete', { taskIndex: index, isComplete: !complete })"
    />
    <div class="column q-py-sm">
      <div class="text-bold q-py-xs">{{ title }}</div>
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
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  complete: boolean;
  title: string;
  type: 'video' | 'link' | 'simple';
  url?: string;
  index: number;
}>();

defineEmits(['complete']);
</script>
