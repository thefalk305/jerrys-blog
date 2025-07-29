<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card color="grey-lighten-4" rounded="0" flat>
    <v-toolbar density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title class="success">
        <span>
          <div>User: {{ email }}</div>
        </span>
      </v-toolbar-title>

      <!-- <v-spacer></v-spacer> -->

      <v-btn @click="toggleTheme">toggle theme</v-btn>
      <!-- <v-spacer></v-spacer> -->

      <!-- <PhoneSignIn >
        <template v-slot:header>
          Phone Sign In
        </template>
        <template v-slot:title>
          Phone Sign In
        </template>
      </PhoneSignIn> -->

      <UpdateProfile @loggedIn="showPosts">
        <template v-slot:header> Update Profile </template>
        <!-- <template v-slot:title> Update Profile </template> -->
      </UpdateProfile>
      <v-spacer></v-spacer>
      <template v-if="!isLoggedIn">
        <LoginForm @loggedIn="showPosts">
          <template v-slot:header> Sign In </template>
          <!-- <template v-slot:title> Sign In </template> -->
        </LoginForm>
        <Register>
          <template v-slot:header> Sign Up </template>
          <!-- <template v-slot:title> Sign Up </template> -->
        </Register>
      </template>
      <v-btn v-else prepend-icon="mdi-clock" @click="signOut">
        <span>Sign Out</span>
        <v-icon left color="red" mdi-cloud-upload> </v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>

  <Posts :uid="uid" />

  <v-navigation-drawer v-model="drawer" class="grey darken-4" app clipped theme="dark">
    <h2 class="headline white--text">Under Construction</h2>
    <v-btn @click="drawer = false" color="blue">Close</v-btn>
  </v-navigation-drawer>

  <div class="text-center">
    <v-snackbar v-model="snackbar"
      >{{ text }}
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import Posts from "@/components/Posts.vue";

// import vue from 'vue'
import { ref, inject, provide } from "vue"; // used for conditional rendering

import LoginForm from "./LoginForm.vue";
import Register from "./Register.vue";
import UpdateProfile from "./UpdateProfile.vue";
// import PhoneSignIn from "./PhoneSignIn.vue";
// import db from '@/fb'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useTheme } from "vuetify";
import { getAuth, sendEmailVerification } from "firebase/auth";
const auth = getAuth();

const drawer = ref(false);
const theme = useTheme();

const snackbar = ref(false);
var text = ref("");
const loggedIn = ref("");
var uid = "";
const isLoggedIn = ref(true);

function showPosts() {
  console.log("showPosts");
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
const email = inject("email");
console.log("email =", email.value);

// runs after firebase is initialized
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    email.value = user.email;
    uid = user.uid;
    console.log("email =", email.value);

    if (!user.emailVerified) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("verification email sent");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("email already verified");
    }
    loggedIn.value = user.email;
    isLoggedIn.value = true; // if we have a user
  } else {
    email.value = "None";
    isLoggedIn.value = false; // if we do not
    loggedIn.value = "None";
    uid = "";
  }
});

const signOut = () => {
  firebase.auth().signOut();
  (text.value = `User successfully logged out`), (snackbar.value = true);
};
</script>

<style scoped></style>
