import Vue from 'vue'
import App from './App'
import BuyDialogComponent from '@/components/Common/BuyDialog'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.component('app-buy-dialog', BuyDialogComponent)
Vue.config.productionTip = false
/* eslint-disable no-new */
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyABTfpJ9yUdtK3O7zbOkgN6siWq3xFIXTo',
  authDomain: 'allcourses-9fc4c.firebaseapp.com',
  projectId: 'allcourses-9fc4c',
  databaseURL: 'https://allcourses-9fc4c-default-rtdb.firebaseio.com',
  storageBucket: 'allcourses-9fc4c.appspot.com',
  messagingSenderId: '1028092801125',
  appId: '1:1028092801125:web:c5a6c871ddc4b5015f568c',
  measurementId: 'G-WBBQR9YEC'
}
fb.initializeApp(config)
let app
fb.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created () {
        fb.auth().onAuthStateChanged(user => {
          if (user) {
            this.$store.dispatch('autoLoginUser', user)
          }
          this.$store.dispatch('fetchProducts')
        })
      }
    })
  }
})
