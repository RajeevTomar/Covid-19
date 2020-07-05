
export const INDIA_LOCATION_CODE = 'TT';  
export const TOP_HEADLINES = 'top-headlines';
export const EVERYTHING = 'everything';


export const STATE_ROW_STATISTICS = [
  'confirmed',
  'active',
  'recovered',
  'deaths',
];
export const DISTRICT_ROW_STATISTICS = [
  'confirmed',
  'active',
  'recovered',
  'deceased',
];

export const STATE_CODES = {
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CT: 'Chhattisgarh',
  GA: 'Goa',
  GJ: 'Gujarat',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JH: 'Jharkhand',
  KA: 'Karnataka',
  KL: 'Kerala',
  MP: 'Madhya Pradesh',
  MH: 'Maharashtra',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  PB: 'Punjab',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamil Nadu',
  TG: 'Telangana',
  TR: 'Tripura',
  UT: 'Uttarakhand',
  UP: 'Uttar Pradesh',
  WB: 'West Bengal',
  AN: 'Andaman and Nicobar Islands',
  CH: 'Chandigarh',
  DN: 'Dadra and Nagar Haveli and Daman and Diu',
  DL: 'Delhi',
  JK: 'Jammu and Kashmir',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  PY: 'Puducherry',
};

const stateCodes = [];
const reverseStateCodes = {};
Object.keys(STATE_CODES).map((key, index) => {
  reverseStateCodes[STATE_CODES[key]] = key;
  stateCodes.push({code: key, name: STATE_CODES[key]});
  return null;
});
export const STATE_CODES_REVERSE = reverseStateCodes;
export const STATE_CODES_ARRAY = stateCodes;

// Source: Projected Populations (2019)
// National Commission on Population, "Population Projections for India and
// States (2011-2036)", Table-8 (p43), November 2019
// https://nhm.gov.in/New_Updates_2018/Report_Population_Projection_2019.pdf
export const STATE_POPULATIONS = {
  'Andaman and Nicobar Islands': 397000,
  'Andhra Pradesh': 52221000,
  'Arunachal Pradesh': 1504000,
  Assam: 34293000,
  Bihar: 119520000,
  Chandigarh: 1179000,
  Chhattisgarh: 28724000,
  'Dadra and Nagar Haveli and Daman and Diu': 959000,
  Delhi: 19814000,
  Goa: 1540000,
  Gujarat: 67936000,
  Haryana: 28672000,
  'Himachal Pradesh': 7300000,
  'Jammu and Kashmir': 13203000,
  Jharkhand: 37403000,
  Karnataka: 65798000,
  Kerala: 35125000,
  Ladakh: 293000,
  Lakshadweep: 68000,
  'Madhya Pradesh': 82232000,
  Maharashtra: 122153000,
  Manipur: 3103000,
  Meghalaya: 3224000,
  Mizoram: 1192000,
  Nagaland: 2150000,
  Odisha: 43671000,
  Puducherry: 1504000,
  Punjab: 29859000,
  Rajasthan: 77264000,
  Sikkim: 664000,
  'Tamil Nadu': 75695000,
  Telangana: 37220000,
  Tripura: 3992000,
  'Uttar Pradesh': 224979000,
  Uttarakhand: 11141000,
  'West Bengal': 96906000,
  Total: 1332900000,
};

export const POPULATION_SOURCE = 'Based on 2019 population projection by NCP report';
