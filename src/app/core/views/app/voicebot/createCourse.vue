<template>
  <v-sheet elevation="8">
    <v-slide-group v-model="model" class="pa-4" multiple show-arrows>
      <v-slide-item v-for="n in 15" :key="n">
        <base-card class="mr-5">
          <v-card-title class="pb-0">Słowo/wyrażenie</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid2" lazy-validation>
              <v-text-field
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                label="Wyrażenie do nauki 1"
                required
              />
              <v-text-field
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                label="Wyrażenie do nauki 1"
                class="mb-5"
                required
              />
              <div class="d-flex">
                <v-avatar size="80">
                  <v-img src="@/assets/images/faces/15.jpg" />
                </v-avatar>
                <v-file-input show-size label="File input" flat class="d-inline-flex"></v-file-input>
              </div>
              <v-btn :disabled="!valid2" color="success" class="mr-4 mb-5 mt-4 course-counter"> Dodaj przykład </v-btn>

              <div style="margin-bottom: 55px">
                <v-row>
                  <v-col cols="2" class="myFlex">
                    <v-btn color="primary" dark small fab d-inline class="course-counter">
                      <v-icon>1</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-text-field
                      :counter="50"
                      hint="To musi być wyrażenie składające się z kilku słów"
                      label="Wyrażenie do nauki 1"
                      required
                    />
                    <v-text-field
                      :counter="50"
                      hint="To musi być wyrażenie składające się z kilku słów"
                      label="Wyrażenie do nauki 1"
                      class="mb-5"
                      required
                    />
                    <div class="d-flex">
                      <v-avatar size="80">
                        <v-img src="@/assets/images/faces/15.jpg" />
                      </v-avatar>
                      <v-file-input show-size label="File input" flat class="d-inline-flex"></v-file-input>
                    </div>
                  </v-col>
                </v-row>
              </div>

              <div style="margin-bottom: 55px">
                <v-row>
                  <v-col cols="2" class="myFlex">
                    <div class="slide-square"></div>
                    <v-btn color="primary" dark small fab d-inline class="course-counter">
                      <v-icon>2</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-text-field
                      :counter="50"
                      hint="To musi być wyrażenie składające się z kilku słów"
                      label="Wyrażenie do nauki 1"
                      required
                    />
                    <v-text-field
                      :counter="50"
                      hint="To musi być wyrażenie składające się z kilku słów"
                      label="Wyrażenie do nauki 1"
                      class="mb-5"
                      required
                    />
                    <div class="d-flex">
                      <v-avatar size="80">
                        <v-img src="@/assets/images/faces/15.jpg" />
                      </v-avatar>
                      <v-file-input show-size label="File input" flat class="d-inline-flex"></v-file-input>
                    </div>
                  </v-col>
                </v-row>
              </div>

              <div style="margin-bottom: 55px">
                <v-row>
                  <v-col cols="2" class="myFlex">
                    <div class="slide-square"></div>
                    <v-btn color="primary" dark small fab d-inline class="course-counter">
                      <v-icon>3</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-text-field
                      :counter="50"
                      hint="To musi być wyrażenie składające się z kilku słów"
                      label="Wyrażenie do nauki 1"
                      required
                    />
                    <v-text-field
                      :counter="50"
                      hint="To musi być wyrażenie składające się z kilku słów"
                      label="Wyrażenie do nauki 1"
                      class="mb-5"
                      required
                    />
                    <div class="d-flex">
                      <v-avatar size="80">
                        <v-img src="@/assets/images/faces/15.jpg" />
                      </v-avatar>
                      <v-file-input show-size label="File input" flat class="d-inline-flex"></v-file-input>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-card-text>
        </base-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/no-template-shadow */
export default {
  /* eslint-disable global-require */
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Table One',
  },
  data() {
    return {
      search: '',
      selected: [],
      valid2: true,
      model: '',
      headers: [
        {
          text: 'Customer',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Store Name', value: 'calories' },
        { text: 'Products', value: 'fat' },
        { text: 'Wallet Balance', value: 'carbs' },
        { text: 'Create Date', value: 'protein' },
        { text: 'Status', value: 'badge' },
        { text: 'Action', value: 'action' },
      ],
    };
  },
  methods: {},
};
</script>

<style>
.course-counter {
  z-index: 1;
}
.slide-card {
  padding: 10px;
}
.myFlex {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slide-square {
  height: 315px;
  margin-left: 20px;
  border-left: 1px dashed #339ef3;
  margin-top: -312px;
}
</style>
