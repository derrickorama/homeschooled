<template>
  <q-card>
    <q-card-section class="row justify-between">
      <div>
        <div class="text-h5">{{ name }}</div>
        <div class="text-grey-7">
          {{ description }}
        </div>
        <div class="q-mt-sm">
          <div class="row items-center">
            <div class="text-subtitle2 q-mr-sm">Occurs on:</div>
            <div
              v-for="(day, index) in namedDays"
              :key="day"
              class="day-of-week q-mr-sm row items-center justify-center"
              :class="{
                'bg-info text-primary': days.includes(index),
                'day-of-week--off bg-grey-2': !days.includes(index),
              }"
            >
              {{ day }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';

const props = defineProps<{
  days: number[];
  description: string;
  id: string;
  name: string;
}>();

const namedDays = computed(() => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
</script>

<style scoped lang="scss">
.day-of-week {
  height: 32px;
  width: 32px;
  border: 1px solid $primary;

  &--off {
    border: 1px solid $grey-5;
    color: $grey-5;
  }
}
</style>
