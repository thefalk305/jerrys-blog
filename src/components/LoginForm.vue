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
          >
          </v-text-field>
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            clearable
            v-model="password"
            label="Password"
            :rules="inputRules"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn flat @click="login(e), $emit('showPosts', userid)" :loading="loading"
            >Sign In
          </v-btn>
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
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const snackbar = ref(true);
var text = ref("");
var userid = "";

const errMsg = ref(); // ERROR MESSAGE
// const props = defineProps({
//   id: String,
// });
// console.log(props)
const dialog = ref(false);
const email = ref("thefalk305@hotmail.com");
const password = ref("MyFirebase305");
const form = ref();
const loading = ref(false);
const showPassword = ref(false);
const inputRules = [(v) => v.length >= 3 || "Minimun length is 3 characters"];

function checkForm() {
  if (password.value.length < 3 || email.value.length < 3) {
    alert("Minimun length is 3 characters");
    return false;
  } else {
    return true;
  }
}

const login = () => {
  // we also renamed this method
  if (checkForm) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((data) => {
        (text.value = "Successfully logged in!"),
          (snackbar.value = true),
          console.log(data);
        console.log("Successfully logged in!");
        loading.value = false;
        dialog.value = false;
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
        alert(errMsg.value);
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        userid = user.uid;
        console.log("uid = ", userid);
      } else {
        // User not logged in or has just logged out.
      }
    });
  }
};
// fill the form from the firestorm document
async function openDialog() {
  dialog.value = true;
}
</script>

<style lang="scss" scoped></style>
