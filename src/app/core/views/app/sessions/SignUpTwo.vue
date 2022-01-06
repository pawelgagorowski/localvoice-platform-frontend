<template>
  <div class="page-wrap">
    <div class="session-form-hold">
      <base-card>
        <v-card-text class="text-center">
          <div class="py-3">
            <h5 class="font-weight-bold">LETS GET STARTED!</h5>
            <p class="text--disabled font-weight-medium">Create an account get unlimited access</p>
          </div>
          <v-avatar tile size="200" class="mb-4">
            <img src="@/assets/images/illustrations/posting_photo.svg" alt="" />
          </v-avatar>

          <h6 class="text--disabled font-weight-medium mb-10">Sign in to your account</h6>
          <v-text-field v-model="email" label="email" :rules="emailRules" required />

          <v-text-field
            v-model="ePassword"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="password"
            :counter="10"
            :rules="nameRules"
            @click:append="show = !show"
          ></v-text-field>
          <!-- <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'Confirm Password'"
            name="input-10-2"
            label="Password"
            value="Pa"
            
            @click:append="show = !show"
          ></v-text-field> -->
          <v-checkbox v-model="checkbox1" label="Remember this computer"></v-checkbox>
          <v-btn class="mb-4" block color="primary" dark @click="submit">Sign Up</v-btn>
          <div class="">
            Don't have an account ?
            <v-btn text small color="primary" to="/app/sessions/sign-in-two">Sign In</v-btn>
          </div>
        </v-card-text>

        <!-- error password snackbar  -->
        <v-snackbar v-model="snackbar" top color="danger">
          Email and Password must be required

          <template v-slot:action="{ attrs }">
            <v-btn color="" text v-bind="attrs" @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </base-card>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'Signup',
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'SignUp 2',
  },
  data() {
    return {
      show: false,
      password: 'Password',
      checkbox1: true,
      checkbox2: false,
      email: '',
      ePassword: '',
      loading: false,
      snackbar: false,
      emailRules: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      nameRules: [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 6) || 'Name must be greater than 6 characters',
      ],
    };
  },

  methods: {
    ...mapActions(['signUserUp']),
    submit() {
      if (this.email && this.ePassword) {
        this.signUserUp({ email: this.email, password: this.ePassword });

        setTimeout(() => {
          console.log('done');
        }, 1000);
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page-wrap {
  background-color: #242939 !important;
  display: flex;
  align-items: center;
  padding: 40px 1rem;
  height: 100%;
  min-height: 100vh;
}
.session-form-hold {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
