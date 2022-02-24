<template>
  <div>
    <basic-information></basic-information>
    <div v-for="(sentence, sentenceIndex) in sentences" :key="sentenceIndex">
      <the-sentence :sentence="sentence"></the-sentence>
    </div>
    <div class="d-flex justify-center mb-10 mt-5">
      <v-btn :disabled="false" color="success" @click="addSentence()"> Dodaj słowo/wyrażenie </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BasicInformation from '../components/BasicInformation.vue';
import TheSentence from '../components/TheSentence.vue';
import { lessonGetters } from '../store';
import { lessonActions } from '../store/actions';

export default {
  components: {
    BasicInformation,
    TheSentence,
  },
  data: () => {
    return {
      sentences: ['s'],
      name: '',
      valid2: true,
    };
  },
  computed: {
    ...mapGetters({
      lesson: lessonGetters.getLessonOnEdit,
    }),
  },
  created() {
    this.fetchLesson({
      courseName: 'english beginner',
      categoryName: 'day off category',
      lessonName: 'cinema',
    });
  },
  methods: {
    ...mapActions({
      fetchLesson: lessonActions.fetchLesson,
    }),
    addSentence() {
      this.sentences.push('dfs');
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
