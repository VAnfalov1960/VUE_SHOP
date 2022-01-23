<template>
  <div>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
         @click="onLogout"
         v-if="isUserLoggedIn"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon
        @click="sideNav = !sideNav"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          class="pointer"
        >Интернет-магазин</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="(link, i) in links"
          :key="i"
          :to="link.url"
        >
          <v-icon left>{{ link.icon }}</v-icon>
            {{ link.title }}
        </v-btn>
        <v-btn
          flat
          @click="onLogout"
          v-if="isUserLoggedIn"
        >
          <v-icon left>exit_to_app</v-icon>
            Выход из системы
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <router-view></router-view>

    </v-content>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Дом2', icon: '', url: '/home2' },
          { title: 'Новый продукт', icon: 'add', url: '/new' },
          { title: 'Мои продукты', icon: 'list', url: '/list' },
          { title: 'Корзина', icon: 'shopping_cart', url: '/checkout' },
          { title: 'Регистрация', icon: 'face', url: '/register' }
        ]
      } else {
        return [
          { title: 'Авторизоваться', icon: 'account_box', url: '/login' }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
