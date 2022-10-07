/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { api, ApiCollectionResponse } from '~app/core/api';
import { CourseStructureModel } from '../models/courseStructure';
import { deserialize } from '~app/shared';

const structureApi = {
  getStructure(): Promise<ApiCollectionResponse<CourseStructureModel>> {
    return api.get<CourseStructureModel[]>('/api/voicebot/structure').then((response) => {
      return {
        total: response.data.length,
        data: response.data.map((it) => deserialize(CourseStructureModel, it)),
      } as ApiCollectionResponse<CourseStructureModel>;
    });
  },
};

export default structureApi;
