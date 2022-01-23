export default {
  data: () => ({
    email: '',
    password: '',
    confirmPassword: ''
  }),
  computed: {
    emailRules () {
      return [
        v => !!v || 'Требуется электронная почта',
        v => /.+@.+/.test(v) || 'Адрес электронной почты должен быть действительным'
      ]
    },
    passwordRules () {
      return [
        v => !!v || 'Требуется пароль',
        v => (v && v.length >= 6) || 'Пароль должен состоять из 6 символов или более'
      ]
    },
    confirmPasswordRules () {
      return [
        v => !!v || 'Требуется пароль',
        v => v === this.password || 'Пароль должен совпадать'
      ]
    }
  }
}
