import { ajax } from 'rxjs/ajax';
import { map, catchError, delay } from 'rxjs/operators';
import { empty, of, merge, ReplaySubject } from 'rxjs';
import { DISABLE_CORS } from '../constans';
import config from '../shared/config/getConfig';

const REQUEST_DELAY = config.getNumber('REQUEST_DELAY');

const http = {
  method: {
    get: 'GET',
    post: 'POST',
    update: 'UPDATE',
    delete: 'DELETE',
  },
  headers: {
    'Content-Type': 'application/json',
  },
};

export const errorHistory$ = new ReplaySubject();
export const error$ = new ReplaySubject();
error$.subscribe(error => {
  let reason = error.response
    ? error.response.message
    : 'no reason'
  const status = error.status;
  console.error(`HTTP REQUEST FAILED. Status: ${status}. Reason: ${reason}`);
});

function requestFactory(method) {
  return function requestFactory(url, headers, body) {
    const requestOptions = {
      createXHR: () => new XMLHttpRequest(),
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body,
      crossDomain: DISABLE_CORS,
    };

    const requestInfo = `${method} ${url}`;
    const inflight$ = of({
      loading: true,
      requestInfo,
    });
    const request$ = ajax(requestOptions)
      .pipe(
        catchError(err => {
          error$.next(err);
          return empty();
        }),
        map(responseObj => {
          return {
            loading: false,
            response: responseObj.response,
            requestInfo,
          };
        }),
        delay(REQUEST_DELAY),
      );

    return merge(inflight$, request$);
  }
}

export const request = {
  get: requestFactory(http.method.get),
  post: requestFactory(http.method.post),
  update: requestFactory(http.method.update),
  delete: requestFactory(http.method.delete),
};
