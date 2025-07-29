<template>
  <v-btn @click="openDialog">
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
          <v-text-field v-model="phone" label="Phone" :rules="inputRules"> </v-text-field>
          <v-text-field
            :type="text"
            v-model="displayName"
            label="Display Name"
            :rules="inputRules"
          >
          </v-text-field>

          <v-spacer></v-spacer>
          <v-btn flat @click="updatePro()">Update Profile </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

  <div class="text-center">
    <v-snackbar v-model="snackbar" multi-line
      >{{ text }}
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
// We need to import the Vue Functions we need:
import { ref } from "vue";
// import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
const snackbar = ref(true);
var text = ref("");

// const error = ref() // ERROR MESSAGE
// const props = defineProps({
//   id: String,
// });
// console.log(props)
const dialog = ref(false);
const phone = ref("");
const password = ref("mememe");
const form = ref();
// const loading = ref(false)
const displayName = ref("");
const inputRules = [(v) => v.length >= 3 || "Minimun length is 3 characters"];

function checkForm() {
  if (password.value.length < 3 || phone.value.length < 3) {
    alert("Minimun length is 3 characters");
    return false;
  } else {
    return true;
  }
}

import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();

function updatePro() {
  if (checkForm) {
    updateProfile(auth.currentUser, {
      displayName: displayName.value,
      phoneNumber: phone.value,
      emailVerified: true,
    })
      .then(() => {
        console.log(auth.currentUser);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // An error occurred
        // ...
      });
    dialog.value = false;
  }
}
// fill the form from the firestorm document
async function openDialog() {
  dialog.value = true;
}
</script>

<style lang="scss" scoped></style>
