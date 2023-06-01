<template>
  <q-list>
    <q-item v-ripple clickable :to="{ name: 'main' }">
      <q-item-section avatar>
        <q-icon name="task" />
      </q-item-section>
      <q-item-section> Today's Assignments </q-item-section>
    </q-item>
    <q-item v-ripple clickable to="/classes">
      <q-item-section avatar>
        <q-icon name="import_contacts" />
      </q-item-section>
      <q-item-section> Classes </q-item-section>
    </q-item>
    <q-item v-ripple clickable to="/students">
      <q-item-section avatar>
        <q-icon name="group" />
      </q-item-section>
      <q-item-section> Students </q-item-section>
    </q-item>
  </q-list>
</template>
