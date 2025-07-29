<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<template>
  <v-btn @click="openDialog" color="green" class="success">
    <slot name="header"></slot>
  </v-btn>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <h2>
          <slot name="header"></slot>
        </h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent>
          <v-text-field
            clearable
            v-model="email"
            label="Email"
            prepend-icon="mdi-folder"
            :rules="inputRules"
          ></v-text-field>
          <v-text-field
            type="password"
            clearable
            v-model="password"
            label="Password"
            prepend-icon="mdi-star"
            :rules="inputRules"
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn flat @click="register(e)" :loading="loading" class="success mx-0 mt-3"
            >Sign Up
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

  <div class="text-center">
    <v-snackbar :timeout="timeout" v-model="snackbar" multi-line
      >{{ text }}
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // import router

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const snackbar = ref(false);
var text = `Record successfully deleted`;
const timeout = 2000;
const dialog = ref(false);
var loading = ref(false);

const email = ref("me@me.com");
const password = ref("mememe");
const register = () => {
  firebase
    .auth() // get the auth api
    .createUserWithEmailAndPassword(email.value, password.value) // need .value because ref()
    .then((data) => {
      (text = `Account Successfully Registered`),
        (snackbar.value = true),
        console.log("Successfully registered!");
      console.log(data);
      loading.value = false;
      dialog.value = false;
    })
    .catch((error) => {
      console.log(error.code);
      (text = `Unable to register account`),
        (snackbar.value = true),
        alert(error.message);
    });
};

// fill the form from the firestorm document
async function openDialog() {
  dialog.value = true;
}
</script>
<style scoped></style>
