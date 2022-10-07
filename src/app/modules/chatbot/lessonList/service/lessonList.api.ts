import { AxiosResponse } from 'axios';
import { api, ApiCollectionResponse } from '~app/core/api';
import LessonSummaryModel from '../models/lessonSummary';
import { deserialize } from '~app/shared';
import { router } from '~app/core/router';
import chatbotLessonListSummary from '../dummyData/chatbotLessonListSummary.json';

const lessonListApi = {
  getLessonsList(): Promise<ApiCollectionResponse<LessonSummaryModel>> {
    return api.get<LessonSummaryModel[]>('/api/voicebot/lessons').then((response) => {
      return chatbotLessonListSummary as ApiCollectionResponse<LessonSummaryModel>;
    });
  },
  removeLesson(key: string): Promise<void | AxiosResponse<string>> {
    const params = {
      key,
    };
    return api
      .delete('/api/voicebot/lesson', { params })
      .then(() => {
        router.app.$toast.success('Lesson has been successfully deleted');
      })
      .catch((errorMessage) => {
        console.log('errorMessage', errorMessage);
        router.app.$toast.success('There was a problem to delete the lesson');
      });
  },
};

export default lessonListApi;
