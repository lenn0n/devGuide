type HookProps = {
  cache?: any,
  url?: string,
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
  isGraphQL: boolean
}

const fetchUserToken = () => {
  // Create your own token retriever
  return ""
}

const useFetch = (config: HookProps) => {
  const request = async (query: any) => {
    let url = config.url, body = query;

    if (config.isGraphQL) {
      body = JSON.stringify({ query })
    } else {
      switch (config.method) {
        case 'GET':
        case 'DELETE':
          url +=  "?" + objectToUrlParams(query)
          body = undefined
        break;
        default:
          break;
      }
    }

    return await fetch(url ?? '', {
      method: config.method,
      cache: config?.cache,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${fetchUserToken()}`
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.errors || data.message || data.errors?.[0]?.['message']) {
          return {
            props: {
              error: true,
              message: data.message || data.errors?.[0]?.['message']
            }
          }
        }
        return { props: { ...data } }
      }).catch((err) => {
        return {
          props: {
            error: true,
            message: "Unknown Error. Please check your internet connection."
          }
        }
      })
  }

  return {
    request
  }
}

export const objectToUrlParams = (obj: any) => {
  let string = '';
  for (let [key, val] of Object.entries(obj) as [key: string, val: any]) {
    if (val?.constructor === Array) {
      string += val.map((v, i) => {
        return `${key}=${v}`;
      }).join('&');
    } else {
      string += `${key}=${val}&`;
    }
  }

  return String(string).substring(0, string?.length - 1);
}

export default useFetch
