<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    color="grey-lighten-4"
    height="200px"
    rounded="0"
    flat
  >
    <v-toolbar density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>

      <v-toolbar-title color="grey" class="text-uppercase  yellow--text" >Tyler's <span class="font-weight-light">Mind </span>Admin</v-toolbar-title>

      <v-spacer></v-spacer>
      <LoginForm />
      <Register />
      <v-btn icon width="150px" @click="newPostDialog = true">
        <v-icon>mdi-magnify</v-icon>
        New Posts
      </v-btn>

      <!-- <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

<v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-toolbar>
  </v-card>
  <v-dialog v-model="newPostDialog" persistent max-width="768" @-click="newPostDialog = false">
  <v-card >
    <v-card-title color='grey' class="grey darken-4 white--text headline">
      New Post
    </v-card-title>
    <v-card-text>
      <v-container class="fluid grid-list-xl" >
        <v-row wrap>
          <v-col xs12 md6>
          <v-text-field label="Title" v-model="newPost.title" />
          </v-col>
          <v-col xs12 md6>
          <v-text-field label="Author" v-model="newPost.author" />
          </v-col>
          <v-col>
            <v-textarea label="Content" v-model="newPost.content" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions  color="grey" class="grey darken-4" >
      <v-btn flat color="grey">Close</v-btn>
      <v-btn flat color="yellow">Update</v-btn>
    </v-card-actions>
    </v-card>
  Hello, World2
  </v-dialog>
  <v-navigation-drawer v-model="drawer" class="grey darken-4" app clipped  theme="dark">
    <h2 class="headline white--text">Hello, World3</h2>
  </v-navigation-drawer>

  </template>

<script setup>

import vue from 'vue'

console.log(vue)
</script>

<style scoped>

</style>

import LoginForm from './LoginForm.vue'
import Register from './Register.vue'


const drawer = ref(false)
const newPostDialog = ref(false)
const newPost = ref({})

