/* eslint-disable no-param-reassign */
import urljoin from 'url-join';

export function createUrl(host: string, path: string): string {
  console.log('createUrl fn');
  if (host) {
    console.log('host', host);
    host = /^(https?:)?\/\//.test(host) ? host : `//${host}`;
    console.log('urljoin(host, path)', urljoin(host, path));
    return urljoin(host, path);
  }
  console.log('path', path);
  return path;
}

export function splitUrlPath(url: string): string[] {
  return url.split('/').filter((path) => !!path);
}
