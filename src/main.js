import { createApp, provide, ref } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import db from '@/fb.js'


import { initializeAuth } from "firebase/auth";

loadFonts()

const email = ref('thefalk305@hotmail.com')
function updateEmail(emailvalue) {
  email.value = email
}

createApp(App)
  .provide('isLoggedIn', false)
  .provide('email', email )
  .use(router)
  .use(vuetify)
  .mount('#app')

  
//const auth = initializeAuth(app, {
//  popupRedirectResolver: undefined,
//});

