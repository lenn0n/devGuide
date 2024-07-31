import { useState } from 'react';
import Axios from 'axios';
import { useCookie, useEncryption } from '@hooks/all';
import { arrayJoin, objectToUrlParams } from "@utils/objects"

type AxiosTypes = {
  requiresAuth?: boolean,
  authPrefix?: string,
  headers?: string,
  additionalHeaders?: any,
  url?: string,
  payload?: any,
  objectPayloadToURLParams?: boolean,
  onUpload?: any
}

const getEndpoint = () : string => {
  switch (window.location.origin) {
    case 'localhost':
      return 'http://localhost:5000/api'

    default:
      return 'http://localhost:5000/api'
  }
}

const axiosInstance = (data: AxiosTypes): any => {
  const { getCookie } = useCookie()
  const { decode } = useEncryption()
  
  const getToken = () => {
    return decode(getCookie('user_token'))
  }

  let headers: any = {}, baseURL: string = getEndpoint()

  if (data.headers) {
    headers = data.headers
  }

  if (data.requiresAuth) {
    if (data.authPrefix) {
      headers['Authorization'] = data.authPrefix + " " + getToken()
    } else {
      headers['Authorization'] = getToken()
    }
  }

  if (data?.additionalHeaders) {
    headers = {
      ...headers,
      ...data.additionalHeaders
    };
  }

  return Axios.create({
    baseURL,
    headers
  })
}

const useAxios = () => {
  const { removeCookie, setCookie, removeAllToken } = useCookie()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>();
  const [error, setError] = useState<string>('');
  const [errorFromCatch, setErrorFromCatch] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  const getBaseURL = () => {
    return getEndpoint()
  }

  const handleSuccessResponse = (response: any) => {
    const responseData = {
      result: true,
      headers: response?.headers,
      data: response?.data
    }

    setIsLoading(false);
    setResult(true);
    setErrorFromCatch(false);
    setResponse(responseData);

    return responseData;
  }

  const checkIfUnauthorized = (statusCode: number) => {
    // return 
    if (statusCode === 401 && window.location.pathname !== '/login' && window.location.pathname !== '/') {
      removeAllToken()
      const hostName = String(window.location.hostname).replace("dev", "").replace("staging", "")
      setCookie({
        name: 'login_message',
        value: 'Your account session has been expired. Please login again to continue.',
        domain: hostName
      });
      window.location.href = "/login"
    }
  }

  const handleCatchResponse = (err: any) => {
    checkIfUnauthorized(err?.response?.status)
    setIsLoading(false);
    const errMessage = err?.response?.data?.message ??
      'Unknown error occured. Please check your internet connection.'

    const responseData = {
      result: false,
      message: errMessage
    }

    setResult(false);
    setErrorFromCatch(true);
    setError(errMessage);
    setResponse(responseData);

    return responseData
  }

  const alterResponseMessage = (message: string) => {
    setResponse((response: {}) => { return { ...response, message } })
  }

  const clearResponseMessage = () => {
    setResponse((response: {}) => { return { ...response, message: "" } })
  }

  async function post(config: AxiosTypes) {
    setIsLoading(true);
    return await axiosInstance({
      requiresAuth: config.requiresAuth,
      authPrefix: config.authPrefix,
      headers: config.headers,
      additionalHeaders: config.additionalHeaders,
    })
      .post(config.url,
        config?.objectPayloadToURLParams ?
          objectToUrlParams(config?.payload) : config?.payload ?? {},
        {
          onUploadProgress: (progressEvent: any) => {
            const total = parseFloat(progressEvent.total)
            const rate = progressEvent.rate
            const estimate = parseFloat(progressEvent.estimated)
            const current = progressEvent.loaded
            const percentCompleted = Math.floor(current / total * 100)

            if (config?.onUpload) {
              config.onUpload({ total, current, percentCompleted, rate, estimate })
            }
          }
        })
      .then((response: any) => {
        return handleSuccessResponse(response)
      }).catch((err: any) => {
        return handleCatchResponse(err)
      });
  }

  async function put(config: AxiosTypes) {
    setIsLoading(true);
    return await axiosInstance({
      requiresAuth: config.requiresAuth,
      authPrefix: config.authPrefix,
      headers: config.headers,
      additionalHeaders: config.additionalHeaders,
    })
      .put(config.url,
        config?.objectPayloadToURLParams ?
          objectToUrlParams(config?.payload) : config?.payload ?? {},
        {
          onUploadProgress: (progressEvent: any) => {
            const total = parseFloat(progressEvent.total)
            const rate = progressEvent.rate
            const estimate = parseFloat(progressEvent.estimated)
            const current = progressEvent.loaded
            const percentCompleted = Math.floor(current / total * 100)

            if (config?.onUpload) {
              config.onUpload({ total, current, percentCompleted, rate, estimate })
            }
          }
        })
      .then((response: any) => {
        return handleSuccessResponse(response)
      }).catch((err: any) => {
        return handleCatchResponse(err)
      });
  }

  const get = async (config: AxiosTypes) => {
    setIsLoading(true);
    return await axiosInstance({
      requiresAuth: config.requiresAuth,
      authPrefix: config.authPrefix,
      headers: config.headers,
      additionalHeaders: config.additionalHeaders,
    })
      .get(arrayJoin([
        config.url, "?",
        config?.objectPayloadToURLParams ?
          objectToUrlParams(config?.payload) : config?.payload]) ?? {})
      .then((response: any) => {
        return handleSuccessResponse(response)
      }).catch((err: any) => {
        return handleCatchResponse(err)
      });
  }


  const remove = async (config: AxiosTypes) => {
    setIsLoading(true);
    return await axiosInstance({
      requiresAuth: config.requiresAuth,
      authPrefix: config.authPrefix,
      headers: config.headers,
      additionalHeaders: config.additionalHeaders,
    })
      .delete(arrayJoin([
        config.url, "?",
        config?.objectPayloadToURLParams ?
          objectToUrlParams(config?.payload) : config?.payload]) ?? {})
      .then((response: any) => {
        return handleSuccessResponse(response)
      }).catch((err: any) => {
        return handleCatchResponse(err)
      });
  }

  async function patch(config: AxiosTypes) {
    setIsLoading(true);
    return await axiosInstance({
      requiresAuth: config.requiresAuth,
      authPrefix: config.authPrefix,
      headers: config.headers,
      additionalHeaders: config.additionalHeaders,
    })
      .patch(config.url,
        config?.objectPayloadToURLParams ?
          objectToUrlParams(config?.payload) : config?.payload ?? {})
      .then((response: any) => {
        return handleSuccessResponse(response)
      }).catch((err: any) => {
        return handleCatchResponse(err)
      });
  }

  return {
    isLoading,
    result,
    error,
    errorFromCatch,
    response,
    alterResponseMessage,
    clearResponseMessage,
    put,
    post,
    get,
    remove,
    patch,
    getBaseURL
  }
}

export default useAxios
