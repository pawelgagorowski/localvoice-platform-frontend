const app = Vue.extend({
  name: 'SignFour',
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Sign Four',
  },
  data() {
    return {
      show: false,
      password: 'Password',
      checkbox1: true,
      checkbox2: false,
    };
  },
});

export default app;
