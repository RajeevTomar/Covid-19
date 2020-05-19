import {
    STATE_CODES,
    STATE_CODES_REVERSE,
      } from '../Constant';
  
  
  export const getStateName = (code) => {
    return STATE_CODES[code.toUpperCase()];
  };
  
  export const formatDate = (unformattedDate) => {
    const day = unformattedDate.slice(0, 2);
    const month = unformattedDate.slice(3, 5);
    const year = unformattedDate.slice(6, 10);
    const time = unformattedDate.slice(11);
    return `${year}-${month}-${day}T${time}+05:30`;
  };


  
  /**
   * Returns the last `days` entries
   * @param {Array<Object>} timeseries
   * @param {number} days
   *
   * @return {Array<Object>}
   */
  export function sliceTimeseriesFromEnd(timeseries, days) {
    return timeseries.slice(-days);
  }
  
  export const formatNumber = (value) => {
    const numberFormatter = new Intl.NumberFormat('en-IN');
    return isNaN(value) ? '-' : numberFormatter.format(value);
  };
  
  export const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  
  export const capitalizeAll = (s) => {
    if (typeof s !== 'string') return '';
    const str = s.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
      str[i] = capitalize(str[i]);
    }
    return str.join(' ');
  };
  
  export const abbreviate = (s) => {
    return s.slice(0, 1) + s.slice(1).replace(/[aeiou]/gi, '');
  };
  
  export const parseDistrictZones = (data, state) => {
    const zones = data.reduce((ret, d) => {
      ret[d.state] = ret[d.state] || {};
      ret[d.state][d.district] = d;
      return ret;
    }, {});
    Object.values(STATE_CODES).forEach((state) => {
      if (!zones[state]) zones[state] = {};
    });
    return state ? {[state]: zones[state]} : zones;
  };
  
  export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  export const sortBaseOnConfirmCases = (data)=>{
    const result = data.sort((firstItem, secondItem) =>{
        if (firstItem.confirmed < secondItem.confirmed) {
          return 1;
        }
        if (firstItem.confirmed > secondItem.confirmed) {
          return -1;
        }
        // cases must be equal
        return 0;
      });
      return result;
  }