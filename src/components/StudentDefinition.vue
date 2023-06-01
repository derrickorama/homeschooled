<template>
  <q-card>
    <q-card-section class="row justify-between">
      <div>
        <q-btn
          class="absolute-top-right q-mr-sm q-mt-sm"
          icon="edit"
          padding="0"
        />
        <div class="text-h5">{{ name }}</div>
        <div class="q-mt-sm">
          <div>
            <div class="q-mb-sm text-subtitle2">Classes</div>
            <div v-if="studentClasses.length">
              <div
                v-for="studentClass in studentClasses"
                :key="studentClass.id"
              >
                {{ studentClass.name }}
              </div>
            </div>
            <div v-else class="text-grey-7">None</div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { StudentClass } from 'src/models';

const props = defineProps<{
  id: string;
  name: string;
  studentClasses: StudentClass[];
}>();
</script>
