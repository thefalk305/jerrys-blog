<template>
  <v-btn @click="oDialog()" color="green" class="success">
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


<script setup>
import { ref } from 'vue'

const dialog = ref(false)

function oDialog() 

}

</script>  


