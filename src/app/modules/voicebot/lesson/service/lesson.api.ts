/* eslint-disable class-methods-use-this */
import { api } from '~app/core/api';
import { router } from '~app/core/router';
import { deserialize } from '~app/shared';
import LessonModel from '../models/lesson';

const lessonApi = {
  getLesson(key: string): Promise<LessonModel | void> {
    const params = {
      key,
    };
    return api
      .get<LessonModel>('/api/voicebot/lesson', { params })
      .then((response) => deserialize(LessonModel, response.data))
      .catch((errorMessage) => {
        router.app.$toast.success('There was a problem with lesson fetching');
      });
  },
};

export default lessonApi;
