import * as queryString from 'query-string';

function getFetchUrl(args) {
  const developer = 'Pavlo';
  const apiUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
  return (
    apiUrl + args.endpoint + (args.query ? `/?${queryString.stringify({ ...args.query, developer })}` : `/?developer=${developer}`)
  );
}

function getFetchArgs(args) {
  const headers = {
    'Content-Type': 'application/json'
  };
  // headers.Accept = 'application/json';
  const token = localStorage.getItem('token');
  if (token && !args.skipAuthorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  let body;
  if (args.request) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    headers['Content-Type'] = 'multipart/form-data';
    const formData = new FormData();
    Object.keys(args.request).forEach((arg) => {
      console.log(arg, args.request[arg]);
      formData.append(`${arg}`, `${args.request[arg]}`);
    });
    body = formData;
  }
  return {
    method: args.type,
    headers,
    ...(args.request === 'GET' ? {} : { body })
  };
}

export async function throwIfResponseFailed(res) {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      //
    }
    throw parsedException;
  }
}

export default async function callWebApi(args) {
  const res = await fetch(getFetchUrl(args), getFetchArgs(args));
  await throwIfResponseFailed(res);
  return res;
}
