#### Usage
    
    import useCookie from "@hooks/useCookie"
    ...
    const { getCookie, setCookie } = useCookie()

    setCookie({
      name: 'user_token',
      value: 'FFTOKEN',
      days: 7
    })

    const NAME = getCookie(NAME);
