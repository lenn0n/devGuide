/**
* Custom Payload to URL Params 
* @param {Array} data - Use array of strings only eg: ["province", "city"]
* @param {Object} data - Use select and filter key eg: { select: ["card"], filter: ["[card][type]=2"] }
*/
export function arrayObjectToURLParams(data: any , selector = "get"){
  if (data.constructor === Array ){ // Array
    return data.map(function(value, idx) { 
      if (typeof value == 'string'){
        return selector + '[]=' + value; 
      }
    }).join('&'); 
  }
  else{ // Object
    let selections = data.select.map((value: string) => { return selector + '[]=' + value }).join('&')
    let filters = data?.filter && data.filter.map((value: string) => { return 'filter' + value }).join('&')
    if (filters != undefined && filters != '') {
      return [selections, filters].join('&');
    } else {
      return selections;
    }
  }
}

/**
* Object to URL Params 
* @param {Object} obj - key-value pair will be converted to string
*/
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

  return String(string).substring(0, string?.length -1);
}

/**
* Array Join
* @param {Array} arr - array items
* @param {String} separator - array separator
*/
export const arrayJoin = (arr: any[], separator:string = '') => {
  return arr.join(separator)
}
