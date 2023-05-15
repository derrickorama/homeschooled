<template>
  <q-page class="q-mx-xl">
    <h2>Classes</h2>
    <div class="container">
      <ClassDefinition
        v-for="(studentClass, index) in classesAvailable"
        :key="studentClass.id"
        :class="{ 'q-mt-md': index > 0 }"
        v-bind="studentClass"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useClassesStore } from 'stores/classes';
import ClassDefinition from 'components/ClassDefinition.vue';

const { classesAvailable } = storeToRefs(useClassesStore());
</script>
