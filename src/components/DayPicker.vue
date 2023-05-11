<template>
  <q-btn color="dark" flat padding="sm" size="35px">
    <q-icon class="q-mr-sm" name="event" />
    {{ selectedDateFormatted }}
    <q-popup-proxy cover transition-hide="scale" transition-show="scale">
      <q-date
        v-model="selectedDate"
        color="secondary"
        mask="YYYYMMDD"
        @update:model-value="selectedDate = $event"
      />
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClassesStore } from 'src/stores/classes';

const { selectedDate, selectedDateFormatted } = storeToRefs(useClassesStore());
</script>
