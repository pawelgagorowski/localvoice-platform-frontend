import { indexBy } from '~app/shared';
import { AppModel } from '../types';

export const indexByName = (apps: AppModel[]) => indexBy(apps, 'name');
