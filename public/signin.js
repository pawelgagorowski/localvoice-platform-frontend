/* eslint-disable no-new */
/* eslint-disable no-undef */

new Vue({
  el: '#app',
  directives: {
    focus: {
      // directive definition
      inserted(el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signin() {
      console.log('signin');
      axios
        .post('http://localhost:3000/api/authentication/signin', {
          email: this.email,
          password: this.password,
        })
        .then(async (response) => {
          const client = await Storage.init();

          const properties = Storage.getProperties(response.data.message);
          await Storage.save(properties, client);

          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.has('ReturnUrl')) {
            window.location.href = urlParams.get('ReturnUrl');
          } else {
            window.location.href = '/';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
