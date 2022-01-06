import { api } from '~app/core/api';
import { deserialize, serialize } from '~app/shared';
import { AppModel } from '../types';

export const appsApi = {
  getApps() {
    return api.get<AppModel[]>('/api/app').then((res) => res.data.map((it) => deserialize(AppModel, it)));
  },
  createApp(name: string, url?: string) {
    return api
      .post<AppModel>('/api/app', { name, url })
      .then((res) => deserialize(AppModel, res.data));
  },
  updateApp(id: number, app: Partial<AppModel>) {
    return api.put<AppModel>(`/api/app/${id}`, serialize(app)).then((res) => deserialize(AppModel, res.data));
  },
  deleteApp: (id: number) => api.delete(`/api/app/${id}`),
};
