<template>
  <div>
    <v-btn @click="openDialog()" color="green" class="success">
      <slot name="header"></slot>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <h2>
            <slot name="title"></slot>
          </h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form" @submit.prevent>
            <v-text-field v-model="phone" label="Phone" :rules="inputRules">
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn id="sign-in-button" flat @click="verifyRecaptcha"
              >Phone Sign In
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div id="recaptcha-container">recaptch</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

// const auth = initializeAuth(app, {
//   persistence: true,
//   popupRedirectResolver: undefined,
// });
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyAuq85peG4qpPHr20N6MPrHQ2xG_MF8Hxk",
//   authDomain: "todo-ninja-a4397.firebaseapp.com",
//   projectId: "todo-ninja-a4397",
//   storageBucket: "todo-ninja-a4397.appspot.com",
//   messagingSenderId: "96621211587",
//   appId: "1:96621211587:web:e807fd6ed4cea127581776"
// };

const auth = getAuth();
const phone = ref("");

const response = "";
const dialog = ref(false);
function openDialog() {
  dialog.value = true;
}

function onSignInSubmit() {
  dialog.value = false;
  console.log(response);
}
const inputRules = [(v) => v.length >= 3 || "Minimun length is 3 characters"];

// window.recaptchaVerifier = new RecaptchaVerifier("sign-in-button", {
//   'callback': (response) => {
//     console.log("prepared phone auth process");
//     console.log(response)
//     onSignInSubmit();
//   }
// }, auth);

// function verifyRecaptcha() {
//   window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {});
//   onSignInSubmit();
//   console.log(response);
// }

// var recaptchaVerifier = {};
const phoneNumber = "15205897152";
// const phoneNumber = getPhoneNumberFromUserInput();
const appVerifier = window.recaptchaVerifier;

function verifyRecaptcha() {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
    callback: (response) => {
      console.log(response);
    },
    "expired-callback": () => {},
  });
  onSignInSubmit();
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      console.log(error);
      // Error; SMS not sent
      // ...
    });
  if (window.recaptchaVerifier) {
    grecaptcha.reset(window.recaptchaWidgetId);
  }
  window.recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });
}

import { signInWithPhoneNumber } from "firebase/auth";

// signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//   .then((confirmationResult) => {
//     // SMS sent. Prompt user to type the code from the message, then sign the
//     // user in with confirmationResult.confirm(code).
//     window.confirmationResult = confirmationResult;
//     // ...
//   })
//   .catch((error) => {
//     console.log(error);
//     // Error; SMS not sent
//     // ...
//   });

// onCaptchaVerify()

// verifyRecaptcha();
</script>

<style scoped></style>
