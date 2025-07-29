<template>
  <v-app>
    <Navbar />
    <!-- <v-row> -->
    <!-- <Posts /> -->
    <!-- </v-row> -->
  </v-app>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
// import Posts from "@/components/Posts.vue";

// const posts = [
//   {
//     _id: 1,
//     title: "This is the title of Post 1.  This is the title of Post 1.  This is the title of Post 1.  This is the title of Post 1.   This is the title of Post 1.  This is the title of Post 1.  This is the title of Post 1.  ",
//     content: "Content 1: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry Falkman, aka thefalk!"
//   },
//   {
//     _id: 2,
//     title: "Post 2",
//     content: "Content 2: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 3,
//     title: "Post 3",
//     content: "Content 3: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 4,
//     title: "Post 4",
//     content: "Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.",
//     author: "Jerry"
//   },
//   {
//     _id: 5,
//     title: "Post 5",
//     content: "Content 5: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 6,
//     title: "Post 6",
//     content: "Content 6: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 7,
//     title: "Post 7",
//     content: "Content 7: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 8,
//     title: "Post 8",
//     content: "Content 8: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 9,
//     title: "Post 9",
//     content: "Content 9: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 10,
//     title: "Post 10",
//     content: "Content 10: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 11,
//     title: "Post 11",
//     content: "Content 11: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 12,
//     title: "Post 12",
//     content: "Content 12: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   },
//   {
//     _id: 13,
//     title: "Post 13",
//     content: "Content 13: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.ContentContentContent 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap.Content 4: this is the content for post # 4.  It should wrap",
//     author: "Jerry"
//   }
// ]
</script>
