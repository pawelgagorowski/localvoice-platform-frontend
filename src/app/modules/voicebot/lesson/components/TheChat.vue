<template>
  <v-col cols="10" class="offset-md-1 mt-10">
    <base-card class="h-full">
      <v-card-title>Dodaj chat do lekcji</v-card-title>
      <v-btn class="ml-n16 mt-16 chat-number" color="success" absolute dark small fab d-inline>
        <v-icon>1</v-icon>
      </v-btn>
      <div class="mySquare4 mt-10"></div>
      <!-- <div class="mySquare3 mt-10"></div> -->
      <v-card-text class="mb-10">
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-btn class="ml-n16 mt-16 chat-number" color="success" absolute dark small fab d-inline>
        <v-icon>2</v-icon>
      </v-btn>
      <div class="mySquare4 mt-10"></div>
      <v-card-text class="mb-10">
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-btn class="ml-n16 mt-16 chat-number" color="success" absolute dark small fab d-inline>
        <v-icon>3</v-icon>
      </v-btn>
      <v-card-text>
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              label="Wyrażenie do nauki"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-col cols="12" class="text-md-center">
        <v-btn color="inform" class="mr-4"> Dodaj słowo/wyrażenie </v-btn>
        <v-btn color="warning"> Reset Validation </v-btn>
      </v-col>
    </base-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>
