<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-btn @click="openDialog" color="green" class="btn">
    <slot name="header"></slot>
  </v-btn>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <!-- id === 0 for new posts -->
        <div v-if="id != '0'">Post ID: {{ id }}</div>
        <h2 v-else>
          <slot name="title" />
        </h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form" @submit.prevent>
          <v-text-field
            clearable
            v-model="post.title"
            label="Title"
            prepend-icon="mdi-folder"
          ></v-text-field>
          <v-text-field
            clearable
            v-model="post.author"
            label="Assigned To:"
            prepend-icon="mdi-folder"
          ></v-text-field>
          <v-textarea
            clearable
            v-model="post.content"
            label="Content"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn flat @click="submit" :loading="loading" class="success mx-0 mt-3"
            >Submit</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, inject } from "vue";
import db from "@/fb";
import { doc, getDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";

const props = defineProps({
  id: String,
  uid: String,
  disable: Boolean,
});

console.log("props =", props.id); 

const dialog = ref(false);
const form = ref("");
var loading = ref(false);
var uid = "";
const email = inject("email");
console.log("email =", email.value);
console.log("id =", props.id);
console.log("uid =", props.uid);

var post = ref({
  title: "",
  author: "",
  content: "",
  email: email,
  uid: props.uid,
});
// var inputRules = [(v) => v.length >= 3 || "Minimun length is 3 characters"];

// runs after firebase is initialized
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
  }
});

function checkForm() {
  if (
    post.value.title.length < 3 ||
    post.value.content.length < 3 ||
    post.value.author.length < 3
  ) {
    alert("Minimun length is 3 characters");
    return false;
  } else {
    return true;
  }
}

const submit = () => {
  if (checkForm()) {
    loading.value = true;
    // Add new post
    console.log("email =", email.value);
    post.value.email = email.value;
    post.value.uid = props.uid;

    if (props.id == 0) {
      // add new post
      db.collection("posts").add(post.value);
    } else {
      // Update existing post
      db.collection("posts").doc(props.id).set(post.value);
    }
    loading.value = false;
    dialog.value = false;
  }
};

// fill the form from the firebase document
async function openDialog() {
  if (props.id != 0) {
    // existing document
    const docRef = doc(db, "posts", props.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().person);
      post.value = docSnap.data();
    }
  } else {
    // new document
    post.value = {};
  }
  dialog.value = true;
}

// var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
// var today  = new Date(2010, 7, 5)
// console.log(today.toLocaleDateString("en-US", options));
</script>

<style scoped>
.btn {
  margin-top: 8px;
  margin-right: 5px;
  color: green;
}

.v-btn {
  margin-top: 8px;
  margin-right: 5px;
  color: green;
}

h2 {
  margin: 20px;
}

.heading {
  position: relative;
  left: 20px;
  width: 120px;
}
</style>
