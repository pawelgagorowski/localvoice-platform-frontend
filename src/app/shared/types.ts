/* eslint-disable no-shadow */
export enum PictureTarget {
  STRUCTURE_ICONS = 'structure-icons',
}

export type ObjectAttribute = {
  key: string;
  value: string;
};

export type S3Credentials = {
  fields: {
    [key: string]: string;
  };
  url: string;
};
