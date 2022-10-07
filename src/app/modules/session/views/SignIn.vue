<template>
  <div class="page-wrap">
    <div class="session-form-hold">
      <base-card class="localvoice-shadow p-10">
        <v-card-text class="text-center">
          <v-row class="mb-16">
            <h5 class="mb-10 mx-auto localvoice-header">
              <span class="localvoice-weight-header">Logowanie</span> do aplikacji Localvoice
            </h5>
            <img src="@/assets/images/alexa.png" align="center" justify="center" class="mx-auto" />
          </v-row>

          <v-text-field label="Email" color="#1C7AC3" light />
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            value="Pa"
            color="#1C7AC3"
            light
            @click:append="show = !show"
          ></v-text-field>
          <v-btn class="mb-4 localvoice-sign-in-button" block @click.prevent="login">Zaloguj się</v-btn>
          <v-row>
            <h6 class="localvoice-sign-in-options mx-auto">
              kliknij jeśli <router-link to="/session/reset">nie pamiętasz hasła</router-link> lub
              <router-link to="/session/sign-up">nie masz konta </router-link>
            </h6>
          </v-row>
        </v-card-text>
      </base-card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
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
  methods: {
    // login() {
    //   console.log('login');
    //   return this.$api
    //     .get('http://localhost:3000/user?business=localvoice')
    //     .then((data) => {
    //       console.log('data', data);
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.errorMessage);
    //     });
    // },

    login() {
      console.log('login');
      return this.$api
        .post('http://localhost:3000/user', {
          email: 'paweł',
          business: 'localvoice',
        })
        .then((data) => {
          console.log('data', data);
        })
        .catch((error) => {
          console.log(error.response.data.errorMessage);
        });
    },

    // login() {
    //   console.log('login');
    //   return this.$api
    //     .put('http://localhost:3000/user', {
    //       firstName: 'pawel',
    //       email: 'pawel',
    //     })
    //     .then((data) => {
    //       console.log('data', data);
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.errorMessage);
    //     });
    // },

    // login() {
    //   console.log('login');
    //   return this.$api
    //     .post('http://localhost:3000/login', {
    //       firstName: 'pawel',
    //       email: 'pawel',
    //     })
    //     .then((data) => {
    //       console.log('data', data);
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.errorMessage);
    //     });
    // },

    // login2() {
    //   console.log('login');
    //   return axios({
    //     method: 'get',
    //     url: 'http://localhost:3000/test',
    //     headers: {
    //       Authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzcyI6ImxvY2Fsdm9pY2UiLCJlbWFpbCI6InBhd2VsZ2Fnb3Jvd3NraTAyNkBnbWFpbC5jb20iLCJpYXQiOjE2NDI2NzA4NzQsImV4cCI6MTY0Mjc1NzI3NH0.YXyeMupNgReUr6vbuoUmjz4K18tHi-j2FsimVbub78c',
    //     },
    //   })
    //     .then((data) => {
    //       console.log('data', data);
    //     })
    //     .catch((error) => {
    //       console.log(error.response.data.errorMessage);
    //     });

    // .get('http://localhost:3000/test', {
    //   firstName: 'pawel',
    //   email: 'pawel',
    //   headers: {
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzcyI6ImxvY2Fsdm9pY2UiLCJlbWFpbCI6InBhd2VsZ2Fnb3Jvd3NraTAyNkBnbWFpbC5jb20iLCJpYXQiOjE2NDI2NzA4NzQsImV4cCI6MTY0Mjc1NzI3NH0.YXyeMupNgReUr6vbuoUmjz4K18tHi-j2FsimVbub78c',
    //   },
    // })
    // .then((data) => {
    //   console.log('data', data);
    // })
    // .catch((error) => {
    //   console.log(error.response.data.errorMessage);
    // });
    // },
  },
};
</script>
<style lang="scss" scoped>
.page-wrap {
  background-color: #fff !important;
  display: flex;
  align-items: center;
  padding: 40px 1rem;
  height: 100%;
  min-height: 100vh;
}

.localvoice-sign-in-button {
  background-color: #086fbe !important;
  color: #fff;
  padding: 20px !important;
}

.session-form-hold {
  width: 100%;
  max-width: 490px;
  margin: 0 auto;
  padding: 10px;
}

.localvoice-shadow {
  box-shadow: rgba(47, 60, 74, 0.18) 0px 8px 32px, rgba(47, 60, 74, 0.02) 0px 8px 16px !important;
}

.session-form-hold img {
  width: 230px;
  margin-bottom: 25px;
}

.localvoice-sign-in-options {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  margin-top: 20px;
  margin-bottom: 30px;
}

.localvoice-weight-header {
  font-weight: 400;
}

.localvoice-header {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
