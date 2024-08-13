type HookProps = {
  cache?: any,
  url?: string
}

const fetchUserToken = () => {
  // Create your own token retriever
  return ""
}

const useGraphQLFetch = (config: HookProps) => {
  const request = async (query: string) => {
    return await fetch(config.url ?? '', {
      method: 'POST',
      cache: config?.cache,
      body: JSON.stringify({ query }),
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
            message: "Network Error Problem"
          }
        }
      })
  }

  return {
    request
  }
}

export default useGraphQLFetch
