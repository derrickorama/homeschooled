<template>
  <q-btn color="primary" padding="sm" size="25px">
    <q-icon class="q-mr-sm" name="event" />
    {{ selectedDateFormatted }}
    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
      <q-date
        v-model="selectedDate"
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
