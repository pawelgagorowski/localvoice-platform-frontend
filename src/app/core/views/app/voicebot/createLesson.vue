<template>
  <v-row>
    <v-col cols="12">
      <base-card>
        <v-card-title>
          <div class="d-flex justify-space-between flex-wrap">
            <v-btn class="ma-2" dark color="danger">
              <v-icon>mdi-plus</v-icon>
              Add Customer
            </v-btn>
          </div>
        </v-card-title>
        <v-card-title>Validation with submit & clear</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-select
              v-model="select"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="nazwa kursu"
              required
            />
            <v-select
              v-model="select"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="nazwa kategorii po polsku i angielsku"
              required
            />
            <v-select
              v-model="select"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              label="Nazwa lekcji po polsku i angielsku"
              required
            />

            <v-textarea v-model="model" flat hint="Hint" label="Wstęp po angielsku" clearable />
            <v-textarea v-model="model" flat hint="Hint" label="Wstęp po polsku" clearable />
          </v-form>
        </v-card-text>
      </base-card>
    </v-col>

    <v-col cols="10" class="offset-md-1">
      <base-card>
        <v-card-title class="pb-0">Słowo/wyrażenie</v-card-title>
        <div class="mySquare mt-10"></div>
        <div class="mySquare2 mt-10"></div>
        <v-btn class="ml-n16 mt-10" color="primary" absolute dark small fab d-inline>
          <v-icon>1</v-icon>
        </v-btn>
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              :rules="nameRules2"
              label="Wyrażenie do nauki"
              required
            />
            <v-btn :disabled="!valid2" color="success" class="mr-4" @click="validate"> Dodaj przykład </v-btn>
          </v-form>
        </v-card-text>
      </base-card>
    </v-col>

    <v-col cols="10" class="offset-md-2">
      <base-card>
        <v-card-title class="pb-0">Przykład dla słowa: word</v-card-title>
        <v-btn class="ml-n16" color="primary" style="margin-top: 80px" absolute dark small fab d-inline>
          <v-icon>1</v-icon>
        </v-btn>
        <div class="mySquare1 mt-15"></div>
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules2"
              label="Angielskie słówko po angielsku"
              required
            />
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules2"
              label="Angielskie słówko po polsku"
              required
            />
            <v-avatar size="100" class="mr-5">
              <v-img src="@/assets/images/faces/15.jpg" />
            </v-avatar>

            <v-file-input
              show-size
              label="File input"
              flat
              style="width: 25%; display: inline-flex"
              class="d-inline-flex mr-5"
              @change="createImage"
            ></v-file-input>
            <v-btn :disabled="!valid2" color="success" class="mr-4" @click="validate"
              ><v-icon left> mdi-comment-plus-outline </v-icon> Dodaj przykład</v-btn
            >
            <v-btn :disabled="!valid2" color="warning" class="mr-4" @click="validate">
              <v-icon left> mdi-comment-remove-outline </v-icon>Usuń przykład
            </v-btn>
          </v-form>
        </v-card-text>
      </base-card>
    </v-col>

    <v-col cols="10" class="offset-md-2">
      <base-card>
        <v-card-title class="pb-0">Przykład dla słowa: word</v-card-title>
        <v-btn class="ml-n16" color="primary" style="margin-top: 80px" absolute dark small fab d-inline>
          <v-icon>2</v-icon>
        </v-btn>
        <div class="mySquare1 mt-15"></div>
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules2"
              label="Angielskie słówko po angielsku"
              required
            />
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules2"
              label="Angielskie słówko po polsku"
              required
            />
            <v-avatar size="100" class="mr-5">
              <v-img src="@/assets/images/faces/15.jpg" />
            </v-avatar>

            <v-file-input
              show-size
              label="File input"
              flat
              style="width: 25%; display: inline-flex"
              class="d-inline-flex mr-5"
              @change="createImage"
            ></v-file-input>
            <v-btn :disabled="!valid2" color="success" class="mr-4" @click="validate"
              ><v-icon left> mdi-comment-plus-outline </v-icon> Dodaj przykład</v-btn
            >
            <v-btn :disabled="!valid2" color="warning" class="mr-4" @click="validate">
              <v-icon left> mdi-comment-remove-outline </v-icon>Usuń przykład
            </v-btn>
          </v-form>
        </v-card-text>
      </base-card>
    </v-col>

    <v-col cols="10" class="offset-md-2">
      <base-card>
        <v-card-title class="pb-0">Przykład dla słowa: word</v-card-title>
        <v-btn class="ml-n16" color="primary" style="margin-top: 80px" absolute dark small fab d-inline>
          <v-icon>3</v-icon>
        </v-btn>
        <!-- <div class="mySquare1 mt-15"></div> -->
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules2"
              label="Angielskie słówko po angielsku"
              required
            />
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules2"
              label="Angielskie słówko po polsku"
              required
            />
            <v-avatar size="100" class="mr-5">
              <v-img src="@/assets/images/faces/15.jpg" />
            </v-avatar>

            <v-file-input
              show-size
              label="File input"
              flat
              style="width: 25%; display: inline-flex"
              class="d-inline-flex mr-5"
              @change="createImage"
            ></v-file-input>
            <v-btn :disabled="!valid2" color="success" class="mr-4" @click="validate"
              ><v-icon left> mdi-comment-plus-outline </v-icon> Dodaj przykład</v-btn
            >
            <v-btn :disabled="!valid2" color="warning" class="mr-4" @click="validate">
              <v-icon left> mdi-comment-remove-outline </v-icon>Usuń przykład
            </v-btn>
          </v-form>
        </v-card-text>
      </base-card>
    </v-col>

    <v-col cols="10" class="offset-md-1">
      <base-card>
        <v-card-title class="pb-0">Słowo/wyrażenie</v-card-title>
        <div class="mySquare mt-10"></div>
        <div class="mySquare3 mt-10"></div>
        <v-btn class="ml-n16 mt-10" color="primary" absolute dark small fab d-inline>
          <v-icon>2</v-icon>
        </v-btn>
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              :rules="nameRules2"
              label="Wyrażenie do nauki"
              required
            />
            <v-btn :disabled="!valid2" color="success" class="mr-4" @click="validate"> Dodaj przykład </v-btn>
          </v-form>
        </v-card-text>
      </base-card>
    </v-col>

    <v-col cols="10" class="offset-md-2">
      <base-card>
        <v-card-title class="pb-0">Przykład dla słowa: word</v-card-title>
        <v-btn class="ml-n16" color="primary" style="margin-top: 80px" absolute dark small fab d-inline>
          <v-icon>1</v-icon>
        </v-btn>
        <!-- <div class="mySquare1 mt-15"></div> -->
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules2"
              label="Angielskie słówko po angielsku"
              required
            />
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules2"
              label="Angielskie słówko po polsku"
              required
            />
            <v-avatar size="100" class="mr-5">
              <v-img src="@/assets/images/faces/15.jpg" />
            </v-avatar>

            <v-file-input
              show-size
              label="File input"
              flat
              style="width: 25%; display: inline-flex"
              class="d-inline-flex mr-5"
              @change="createImage"
            ></v-file-input>
            <v-btn :disabled="!valid2" color="success" class="mr-4" @click="validate"
              ><v-icon left> mdi-comment-plus-outline </v-icon> Dodaj przykład</v-btn
            >
            <v-btn :disabled="!valid2" color="warning" class="mr-4" @click="validate">
              <v-icon left> mdi-comment-remove-outline </v-icon>Usuń przykład
            </v-btn>
          </v-form>
        </v-card-text>
      </base-card>
    </v-col>

    <v-col cols="10" class="offset-md-1">
      <base-card>
        <v-card-title class="pb-0">Słowo/wyrażenie</v-card-title>
        <!-- <div class="mySquare3 mt-10"></div> -->
        <v-btn class="ml-n16 mt-10" color="primary" absolute dark small fab d-inline>
          <v-icon>3</v-icon>
        </v-btn>
        <v-card-text>
          <v-form ref="form" v-model="valid2" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="50"
              hint="To musi być wyrażenie składające się z kilku słów"
              :rules="nameRules2"
              label="Wyrażenie do nauki"
              required
            />
            <v-btn :disabled="!valid2" color="success" class="mr-4" @click="validate"> Dodaj przykład </v-btn>
          </v-form>
        </v-card-text>
      </base-card>
    </v-col>

    <v-col cols="12" class="text-md-center">
      <v-btn color="inform" class="mr-4" @click="reset"> Dodaj słowo/wyrażenie </v-btn>
      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
    </v-col>

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
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
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
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
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
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-text-field
                v-model="name"
                :counter="50"
                hint="To musi być wyrażenie składające się z kilku słów"
                :rules="nameRules2"
                label="Wyrażenie do nauki"
                required
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-col cols="12" class="text-md-center">
          <v-btn color="inform" class="mr-4" @click="reset"> Dodaj słowo/wyrażenie </v-btn>
          <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
        </v-col>
      </base-card>
    </v-col>
    <!-- <v-btn class="v-pagination" color="warning" @click="resetValidation"> Reset Validation </v-btn> -->
  </v-row>
</template>
<script>
export default {
  metaInfo: {
    // title will be injected into parent titleTemplate
    title: 'Validation',
  },
  data() {
    return {
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [(v) => !!v || 'Name is required', (v) => v.length <= 10 || 'Name must be less than 10 characters'],
      email: '',
      emailRules: [(v) => !!v || 'E-mail is required', (v) => /.+@.+/.test(v) || 'E-mail must be valid'],
      // Validation with submit & clear
      valid2: true,
      name: '',
      nameRules2: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 50) || 'Name must be less than 10 characters',
      ],
      email2: '',
      emailRules2: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
      select: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      checkbox: false,
      // creating rules
      allowSpaces: false,
      match: 'Foobar',
      max: 0,
      model: '',
      currentFile: undefined,
    };
  },
  // creating rules
  computed: {
    rules() {
      const rules = [];

      if (this.max) {
        const rule = (v) => (v || '').length <= this.max || `A maximum of ${this.max} characters is allowed`;

        rules.push(rule);
      }

      if (!this.allowSpaces) {
        const rule = (v) => (v || '').indexOf(' ') < 0 || 'No spaces are allowed';

        rules.push(rule);
      }

      if (this.match) {
        const rule = (v) => (!!v && v) === this.match || 'Values do not match';

        rules.push(rule);
      }

      return rules;
    },
  },

  watch: {
    match: 'validateField',
    max: 'validateField',
    model: 'validateField',
  },
  created() {
    console.log('created');
  },
  // Validation with submit & clear
  methods: {
    createImage(file) {
      console.log('createImage');
      console.log('file', file);
      // this.getImage(file).then((image) => {
      //   console.log('image', image);
      // });
    },
    // getImage(file) {
    //   return new Promise((resolve, reject) => {
    //     const fReader = new FileReader();
    //     const img = document.createElement('img');

    //     fReader.onload = () => {
    //       img.src = fReader.result;
    //       resolve(this.getBase64Image(img));
    //     };

    //     fReader.readAsDataURL(file);
    //   });
    // },
    // getBase64Image(img) {
    //   const canvas = document.createElement('canvas');
    //   canvas.width = img.width;
    //   canvas.height = img.height;

    //   const ctx = canvas.getContext('2d');
    //   ctx.drawImage(img, 0, 0);

    //   const dataURL = canvas.toDataURL('image/png');

    //   return dataURL;
    // },
    selectFile(file) {
      this.currentFile = file;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    // creating rules
    validateField() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.chat-number {
  margin-top: 101px !important;
}
.line-1 hr {
  border: 0;
  border-bottom: 2px dashed #aebfd9;
}
.mySquare {
  height: 287px;
  position: absolute;
  width: 200px;
  margin-left: -45px;
  border-left: 1px dashed #339ef3;
  border-bottom: 1px dashed #339ef3;
  z-index: 0;
}

.mySquare1 {
  height: 362px;
  position: absolute;
  width: 200px;
  margin-top: 100px !important;
  margin-left: -45px;
  border-left: 1px dashed #339ef3;
  border-bottom: 1px dashed #339ef3;
}

.mySquare2 {
  height: 977px;
  position: absolute;
  width: 200px;
  margin-left: -45px;
  border-left: 1px dashed #5ab55e;
  margin-top: 330px !important;
}

.mySquare3 {
  height: 287px;
  position: absolute;
  width: 200px;
  margin-left: -45px;
  border-left: 1px dashed #5ab55e;
  margin-top: 330px !important;
}

.mySquare4 {
  height: 240px;
  position: absolute;
  width: 200px;
  margin-left: -45px;
  border-left: 1px dashed #339ef3;
  margin-top: 132px !important;
}
</style>
