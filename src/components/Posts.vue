<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container v-if="showPosts" fluid class="pa-3">
    <v-layout style="border: solid 2px black">
      <h1 class="heading">Posts</h1>
      <!-- <div> -->
      <v-btn flat color="green" @click="sortBy('author')">
        <v-icon left small>mdi-account</v-icon>
        <span class="caption text-lowercase">By Author</span>
        <v-tooltip location="top" activator="parent">Sort Posts by Author </v-tooltip>
      </v-btn>
      <v-btn @click="sortBy('title')" color="green">
        <v-icon top small>mdi-folder</v-icon>
        <span class="caption text-lowercase">By Title</span>
        <v-tooltip activator="parent" location="top">Sort posts by Title </v-tooltip>
      </v-btn>
      <!-- </div> -->
      <v-spacer></v-spacer>

      <form id="frm">
        <v-row id="sch" mt-5>
          <v-text-field
            id="schInp"
            clearable
            v-model="contents"
            label="Search Contents"
            @click="primeBtn"
            mt-10
          >
          </v-text-field>
          <v-btn
            id="schBtn"
            flat
            @click="searchPosts(contents)"
            :loading="loading"
            class="success mt-5"
            >Search
          </v-btn>
          <!-- </v-row> -->
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-row> -->
          <v-select
            mt-5
            id="sel"
            v-model="postsPerPage"
            label="Posts per page"
            :items="[
              { title: '3', value: 3 },
              { title: '5', value: 5 },
              { title: '10', value: 10 },
              { title: 'All', value: 99999 },
            ]"
            variant="outlined"
          ></v-select>
        </v-row>
      </form>
      <!-- <h3>posts per page {{ postsPerPage }}</h3>  -->

      <v-spacer></v-spacer>
      <AddEditPost :id="'0'" :uid="uid">
        // new post
        <template v-slot:header> New Post </template>
        <template v-slot:title> Add a New Post </template>
      </AddEditPost>
    </v-layout>
    <div>
      <v-card
        v-for="post in posts.slice((page - 1) * postsPerPage, page * postsPerPage)"
        :key="post.id"
        wrap
      >
        <v-layout row wrap>
          <v-col xs12 md6 style="padding: 6px">
            <div class="caption grey--text">Author</div>
            <div style="width: 150px">{{ post.author }}</div>
          </v-col>
          <v-col xs12 md6>
            <div class="caption grey--text">Title</div>
            <div style="width: 150px">{{ post.title }}</div>
          </v-col>
          <!-- <v-spacer></v-spacer> -->
          <v-col xs6 sm4 md2>
            <div class="caption grey--text" style="width: 400px">Content</div>
            <div style="width: 650px">{{ post.content }}</div>
          </v-col>
          <!-- <v-spacer></v-spacer> -->

          <div v-if="post.uid === uid">
            <AddEditPost :id="post.id" :uid="post.uid" :disable="false">
              <template v-slot:header> Edit Post </template>
              <template v-slot:title> Edit an Existing Post </template>
            </AddEditPost>

            <v-btn xs2 sm4 md2 color="error" @click="deleteDoc(post.id)">Delete</v-btn>
          </div>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </div>

    <!-- <div xs12 md8 offset-md2> -->
    <v-pagination v-model="page" :length="Math.ceil(posts.length / postsPerPage)">
    </v-pagination>
    <!-- </div> -->
  </v-container>
  <h2 v-else>Sign In to see posts</h2>
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
import { ref, defineProps } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "@/fb";
import AddEditPost from "./../components/AddEditPost.vue";

const page = ref(1);
const postsPerPage = ref(3);
const showPosts = ref(false);
const posts = ref([]);
const doNotDelete = false;
const snackbar = ref(false);
const timeout = 2000;
var text = `Post successfully deleted`;
const contents = ref("");
const loading = ref(false);
var uid = "";
function primeBtn() {
  const sBtn = document.getElementById("schBtn");
  sBtn.style.backgroundColor = "green";
  sBtn.innerHTML = "Search Active";
}
const props = defineProps("uid");
uid = props.uid;
console.log(uid);

function filterByValue(array, string) {
  return array.filter((o) =>
    Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(string.toLowerCase()))
  );
}
function searchPosts(contents) {
  const sBtn = document.getElementById("schBtn");
  console.log(posts.value);
  if (sBtn.style.backgroundColor === "lightblue") {
    sBtn.style.backgroundColor = "red";
    sBtn.innerHTML = "Search Active";
    // posts.value = posts.value.filter(posts => posts.cxontent === contents)
    console.log(filterByValue(posts.value, contents));
    posts.value = filterByValue(posts.value, contents);
    console.log(contents);
    page.value = 1;
  } else {
    sBtn.style.backgroundColor = "lightblue";
    sBtn.innerHTML = "Search Inactive";
    posts.value = [];
    // contents.value = ''
    getPosts();
  }
}

function deleteDoc(id) {
  if (doNotDelete === true) return;
  if (confirm("Are you sure you want to delete this post?")) {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(
        (text = `Post Successfully Deleted`),
        (snackbar.value = true),
        console.log(id)
      );
    posts.value = posts.value.filter((post) => post.id != id);
  } else {
    (text = `No Post Deleted`), (snackbar.value = true);
  }
}

function sortBy(prop) {
  this.posts.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
}

function getPosts(id) {
  db.collection("posts")
    .orderBy("title")
    .onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          posts.value.push({
            ...change.doc.data(),
            uid: change.doc.data().uid,
            id: change.doc.id,
          });
        } else if (change.type === "modified") {
          var post = change.doc.data();
          post.id = change.doc.id;
          console.log(post);
          const objIndex = posts.value.findIndex((obj) => obj.id == change.doc.id);
          posts.value[objIndex] = post;
        } else if (change.type === "removed") {
          posts.value = posts.value.filter((posts) => posts.id != id);
        }
      });
      console.log("uid = ", uid);
    });
}

// runs after firebase is initialized
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    uid = user.uid;
    showPosts.value = true;
  } else {
    showPosts.value = false;
  }
});

getPosts();
// console.log(posts.value.length)
</script>

<style scoped>
.v-col {
  flex-grow: 0;
}

#frm {
  position: relative;
  top: 8px;
  padding: 6px;
}

#sel {
  position: relative;
  top: 10px;
}

v-select {
  width: 40px;
  top: 20px;
  position: relative;
  height: 50px;
}

#schInp {
  position: relative;
  top: 10px;
}

#sch {
  display: flex;
  align-items: center;
  width: 500px;
  position: relative;
  top: 10px;
}

#schBtn {
  position: relative;
  top: -27px;
}

.v-btn {
  margin-top: 8px;
  margin-right: 5px;
  background-color: lightgreen;
}

h2 {
  margin: 20px;
}

.heading {
  position: relative;
  margin: 0 20px;
}
</style>
