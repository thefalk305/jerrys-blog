<template>
  <v-btn @click="openDialog()" color="green" class="success">
    <slot name="header"></slot>    
  </v-btn>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <v-card>
    <v-card-title>    
      <h2>
      <slot name="title"></slot>    
      </h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent>
          <v-text-field 
          v-model="phone" 
          label="Phone"  
          :rules="inputRules">
          </v-text-field>
          <v-spacer></v-spacer>
          <v-btn id="sign-in-button" flat @click="phone()"
          >Update Profile   
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>


  <div id='recaptcha-container'>
  </div>
</template>


<script>

// Import Firebase libraries
// import firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

import 'firebase/auth';
// import db from '@/fb'


// Get the Auth instance
import { ref } from 'vue'
// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const dialog = ref(false)
// const snackbar = ref(true)
// var text = ref('')
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuq85peG4qpPHr20N6MPrHQ2xG_MF8Hxk",
  authDomain: "todo-ninja-a4397.firebaseapp.com",
  projectId: "todo-ninja-a4397",
  storageBucket: "todo-ninja-a4397.appspot.com",
  messagingSenderId: "96621211587",
  appId: "1:96621211587:web:e807fd6ed4cea127581776"
};

function openDialog() {
  dialog.value = true
}

firebase.initializeApp(firebaseConfig);


// const error = ref() // ERROR MESSAGE
// const props = defineProps({
//   id: String,
// });
// console.log(props)


</script>  


