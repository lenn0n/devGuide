#### Env
Add secret key in your env

    SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

#### Usage

    import useEncryption from "@hooks/useEncryption;
    ...
    const { encode, decode } = useEncryption()
    
    encode = (text: string): string
    decode = (text: string): string
