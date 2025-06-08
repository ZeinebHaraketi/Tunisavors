import rawCountries from '../data/countries.json';

const countries: Record<string, string> = rawCountries;

export const getCountryCode = (countryName: string): string => {
  const code = countries[countryName.toLowerCase()];
  return code ?? countryName.toLowerCase();
};
