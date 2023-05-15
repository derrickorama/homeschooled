<template>
  <q-dialog v-model="show" :persistent="isAdding">
    <q-card style="width: 700px; max-width: 80vw">
      <q-form @submit="add">
        <q-card-section>
          <div class="text-h6">Add Task: {{ studentClass?.name }}</div>
        </q-card-section>

        <q-card-section class="q-py-none">
          <q-btn-toggle
            v-model="type"
            class="q-mb-md"
            :disable="isAdding"
            glossy
            :loading="isAdding"
            :options="[
              { label: 'Simple', value: 'simple' },
              { label: 'Link', value: 'link' },
              { label: 'Video', value: 'video' },
            ]"
            push
            toggle-color="primary"
            @click="nameFocus"
          />
          <q-input
            ref="nameInput"
            v-model="name"
            autofocus
            class="q-mb-md"
            :disable="isAdding"
            :error="Boolean(nameError)"
            :error-message="nameError"
            filled
            hide-bottom-space
            label="Name"
            :loading="isAdding"
          />
          <q-input
            v-if="['link', 'video'].includes(type)"
            ref="urlInput"
            v-model="url"
            class="q-mb-md"
            :disable="isAdding"
            :error="Boolean(urlError)"
            :error-message="urlError"
            filled
            hide-bottom-space
            label="URL"
            :loading="isAdding"
            @blur="checkUrl"
            @keyup="checkUrl"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pt-none q-pr-md q-pb-md">
          <div class="row reverse">
            <q-btn
              color="primary"
              :disable="isAdding"
              label="Add"
              :loading="isAdding"
              style="width: 75px"
              type="submit"
            />
            <q-btn
              v-close-popup
              class="q-mr-md"
              :disable="isAdding"
              flat
              label="Cancel"
            />
          </div>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Ref, computed, ref } from 'vue';
import { useClassesStore } from 'src/stores/classes';
import { type QInput } from 'quasar';

const props = defineProps<{ classId: string }>();

const isAdding = ref(false);
const name = ref('');
const nameError = ref('');
const nameInput: Ref<QInput | null> = ref(null);
const show = ref(true);
const type: Ref<'simple' | 'link' | 'video'> = ref('link');
const url = ref('');
const urlError = ref('');
const urlInput: Ref<QInput | null> = ref(null);

const classesStore = useClassesStore();
const { classesAvailable } = storeToRefs(classesStore);

const studentClass = computed(() =>
  classesAvailable.value.find(({ id }) => id === props.classId)
);

function checkUrl() {
  if (type.value === 'video') {
    let youTubeId = url.value.match(/.*\/watch\?v=([^&]+)/);
    if (youTubeId === null) {
      youTubeId = url.value.match(/youtu\.be\/([^&]+)/);
    }

    if (youTubeId !== null) {
      url.value = `https://www.youtube.com/embed/${youTubeId[1]}`;
    }
  }
}

function nameFocus() {
  nameInput.value?.focus();
}

function urlFocus() {
  urlInput.value?.focus();
}

async function add() {
  nameError.value = '';
  urlError.value = '';

  if (['link', 'video'].includes(type.value) && !url.value.trim()) {
    urlError.value = `Please provide a URL for your ${type.value}`;
    urlFocus();
  }

  if (!name.value.trim()) {
    nameError.value = 'Please provide a task name';
    nameFocus();
  }

  if (!nameError.value && !urlError.value) {
    isAdding.value = true;
    await classesStore.addTask({
      classId: props.classId,
      name: name.value,
      type: type.value,
      url: url.value,
    });
    isAdding.value = false;
    show.value = false;
  }
}
</script>
