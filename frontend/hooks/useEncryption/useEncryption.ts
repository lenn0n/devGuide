import CryptoJS from "crypto-js";

const useEncryption = () => {
   const encode = (text: string): string => {
    try {
      if (text == undefined || text == null || text == '') {
        return '';
      }
  
      return CryptoJS.AES.encrypt(text, String(process.env.SECRET_KEY)).toString();
    } catch (error) {
      console.log('UNABLE_TO_ENCODE_TWARNING: ' + error);
      return '';
    }
  }
  
   const decode = (text: string): string => {
    try {
      if (text === undefined || text === null || text === '' || text === 'undefined') {
        return '';
      }
      
      let bytes =  CryptoJS.AES.decrypt(text, String(process.env.SECRET_KEY));
      return bytes.toString(CryptoJS.enc.Utf8) || '';
    } catch (error) {
      console.log('UNABLE_TO_DECODE_STRING: ' + error);
      return '';
    }
  }

  return {
    encode,
    decode
  }
}

export default useEncryption
