/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';
import { api } from '~app/core/api';
import { RootState } from '~app/core/store';
import { deserialize, PictureTarget, S3Credentials } from '~app/shared';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { AuthUser } from '../model';
import { authMutations } from './mutations';
import { AuthState, NAMESPACE } from './state';

const createAction = createActionFactory<AuthState, RootState>();

export const actions = {
  fetchUser: createAction(({ commit }) => {
    console.log('fetchUser action');
    return api
      .get<AuthUser>('/api/user')
      .then((res) => {
        console.log('data from user', res.data);
        const user = deserialize(AuthUser, res.data);
        commit(authMutations.setUser.local, user);
      })
      .catch((error: AxiosError) => {
        if (error.response!.status < 500) {
          // eg. 404 = account removed
          return;
        }
        throw error;
      });
  }),
  getS3Credentials: createAction(
    ({ commit }, { pictureTarget, type }: { pictureTarget: PictureTarget; type: string }) => {
      const params = {
        target: pictureTarget,
        type,
      };
      return api
        .get<{ credentials: S3Credentials; fullPath: string }>('/api/s3Credentials', { params })
        .then((response) => response.data);
    }
  ),
  saveInS3: createAction(({ commit }, { credentials, file }: { credentials: S3Credentials; file: File }) => {
    const formData = new FormData();
    formData.append('Content-Type', file.type);

    Object.entries(credentials.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('file', file);
    console.log('formData', formData);
    const { url } = credentials;

    return new Promise((resolve, reject) => {
      fetch(credentials.url, {
        method: 'POST',
        body: formData,
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }),
  removeFromS3: createAction(
    ({ commit }, { imagesSrc, pictureTarget }: { imagesSrc: string[]; pictureTarget: string }) => {
      imagesSrc.forEach((imageSrc) => {
        const pictureTargetArray = imageSrc.split('/');
        const filename = pictureTargetArray[pictureTargetArray.length - 1];
        const params = {
          filename,
          target: pictureTarget,
        };
        return api.delete('/api/images', { params }).then((response) => response.data);
      });
    }
  ),
};
export const authActions = createActionMap<typeof actions, AuthState, RootState>(NAMESPACE, actions);
