type HookProps = {
  cache?: any,
  url?: string,
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
  isGraphQL: boolean
}

const fetchUserToken = () => {
  // Create your own token retriever
  return "eyJhbGciOiJIUzI1G6VEwHGBzgsEiaH1je2j9KZuZyr6VSgGxEyH54br9tU"
}

const useFetch = (config: HookProps) => {
  const request = async (query: any) => {
    let url = config.url, body = query, method = config.method

    if (config.isGraphQL) {
      body = { query }
      method = 'POST'
    } else {
      switch (config.method) {
        case 'GET':
        case 'DELETE':
          url += "?" + objectToUrlParams(query)
          body = undefined
          break;
        default:
          break;
      }
    }

    return await fetch(url ?? '', {
      method,
      cache: config?.cache,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${fetchUserToken()}`
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.errors || data.message || data.errors?.[0]?.['message']) {
          return { 
            error: true,
            message: data.message || data.errors?.[0]?.['message'] || 'Unable to display error message.'
          }
        }
        return {
          error: false,
          // Expected to return 'data' key as Array Objects
          // GraphQL and REST may have different responses
          // TODO: Always debug this part to get the exact values you want.
          data: config.isGraphQL ? [...data.data.clients] : data
        }
      }).catch((err) => {
        return {
          error: true,
          message: `Unknown Error. Please check your internet connection. REF:${String(err)}`
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
