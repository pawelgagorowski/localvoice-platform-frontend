/* eslint-disable no-undef */
console.log('dupa2');

const app1 = Vue.createApp({
  name: 'SignFour',
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Sign Four',
  },
  method: {
    click() {
      console.log();
    },
  },
  data() {
    return {
      show: false,
      password: 'Password',
      checkbox1: true,
      checkbox2: false,
    };
  },
  created() {
    console.log('created!!');
  },
});

app1.mount('#app');
