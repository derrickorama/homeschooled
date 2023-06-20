<template>
  <div>
    <q-btn-group push>
      <q-btn padding="0 sm">
        <q-icon name="navigate_before" @click="previous" />
      </q-btn>
      <q-btn color="dark" flat padding="sm" size="md">
        <q-icon class="q-mr-sm" name="event" />
        {{ selectedDateFormatted }}
        <q-popup-proxy cover transition-hide="scale" transition-show="scale">
          <q-date
            v-model="selectedDate"
            color="secondary"
            mask="YYYYMMDD"
            today-btn
            @update:model-value="onDateChange"
          />
        </q-popup-proxy>
      </q-btn>
      <q-btn padding="0 sm">
        <q-icon name="navigate_next" @click="next" />
      </q-btn>
    </q-btn-group>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { useClassesStore } from 'src/stores/classes';
import { useRouter } from 'vue-router';

const { selectedDate, selectedDateFormatted } = storeToRefs(useClassesStore());

const router = useRouter();

function onDateChange(value: string) {
  router.push({ query: { date: value } });
}

function previous() {
  const newDay = dayjs(selectedDate.value)
    .subtract(1, 'day')
    .format('YYYYMMDD');
  router.push({ query: { date: newDay } });
}

function next() {
  const newDay = dayjs(selectedDate.value).add(1, 'day').format('YYYYMMDD');
  router.push({ query: { date: newDay } });
}
</script>
