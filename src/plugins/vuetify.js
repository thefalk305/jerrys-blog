// Styles
import '@mdi/font/css/materialdesignicons.css';
// import Vue from 'vue';
// import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      defaultTheme: "dark",
      light: {
        primary: colors.lightBlue,
        secondary: colors.grey.darken1,
        accent: colors.pink.darken1,
        error: colors.red.accent3,
        background: colors.indigo.lighten5,
        info: colors.teal.darken1,
      },
      dark: {
        dark: true,
        primary: colors.blue.darken4,
        background: colors.indigo.base,
        info: colors.teal.lighten1,
      },
    },
  },
})
