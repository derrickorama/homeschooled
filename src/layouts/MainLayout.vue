<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Homeschooled
        </q-toolbar-title>
        <q-btn dense flat icon="menu" round @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" elevated show-if-above side="right">
      <q-list>
        <q-item v-ripple clickable :to="{ name: 'main' }">
          <q-item-section avatar>
            <q-icon name="task" />
          </q-item-section>
          <q-item-section> Today's Assignments </q-item-section>
        </q-item>
        <q-item v-ripple clickable :to="{ name: 'classes' }">
          <q-item-section avatar>
            <q-icon name="import_contacts" />
          </q-item-section>
          <q-item-section> Classes </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rightDrawerOpen = ref(false);

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>
