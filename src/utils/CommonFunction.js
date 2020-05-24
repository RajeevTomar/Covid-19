import {
  STATE_CODES,
  STATE_CODES_REVERSE,
} from '../Constant';

import {
  parse,
  isBefore,
  startOfDay,
  format
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

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
  return state ? { [state]: zones[state] } : zones;
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const sortBaseOnConfirmCases = (data) => {
  const result = data.sort((firstItem, secondItem) => {
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


export const getIndiaDay = () => {
  return startOfDay(utcToZonedTime(new Date(), 'Asia/Kolkata'));
};


const validateCTS = (data = []) => {
  const dataTypes = [
    'dailyconfirmed',
    'dailydeceased',
    'dailyrecovered',
    'totalconfirmed',
    'totaldeceased',
    'totalrecovered',
  ];
  return data
    .filter((d) => dataTypes.every((dt) => d[dt]) && d.date)
    .filter((d) => dataTypes.every((dt) => (d[dt]) >= 0))
    .filter((d) => {
      // Skip data from the current day
      const today = getIndiaDay();
      const date = parse(d.date, 'dd MMMM', new Date(2020, 0, 1));
      return isBefore(date, today);
    });
};



export const preprocessTimeseries = (timeseries) => {
  return timeseries.map((stat, index) => ({
    date: parse(stat.date, 'dd MMMM', new Date(2020, 0, 1)),
    totalconfirmed: +stat.totalconfirmed,
    totalrecovered: +stat.totalrecovered,
    totaldeceased: +stat.totaldeceased,
    dailyconfirmed: +stat.dailyconfirmed,
    dailyrecovered: +stat.dailyrecovered,
    dailydeceased: +stat.dailydeceased,
    // Active = Confimed - Recovered - Deceased
    totalactive:
      +stat.totalconfirmed - +stat.totalrecovered - +stat.totaldeceased,
    dailyactive:
      +stat.dailyconfirmed - +stat.dailyrecovered - +stat.dailydeceased,
  }));
};

export const refineDataForChart = (data) => {
  if (data === null || data === 'undefined')
    return null;
  const result = {
    dates: [],
    confirmed: [],
    recovered: [],
    deceased: [],
    dailyConfirmed: [],
    dailyRecovered: [],
    dailyDeceased: []
  }
  data.forEach((data, index) => {
    // if (index >= 31) {
    const date = format(data.date, 'dd MMM');
    result.dates.push(date);
    result.confirmed.push(data.totalconfirmed);
    result.recovered.push(data.totalrecovered);
    result.deceased.push(data.totaldeceased);
    result.dailyConfirmed.push(data.dailyconfirmed);
    result.dailyRecovered.push(data.dailyrecovered);
    result.dailyDeceased.push(data.dailydeceased);
    // }
  });

  return result;

}