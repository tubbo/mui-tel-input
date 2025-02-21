import { CONTINENTS, MuiTelInputContinent } from '@shared/constants/continents'
import { COUNTRIES, MuiTelInputCountry } from '@shared/constants/countries'
import { matchIsArray } from '@shared/helpers/array'

type FilterCountriesOptions = {
  onlyCountries?: readonly MuiTelInputCountry[]
  excludedCountries?: readonly MuiTelInputCountry[]
  preferredCountries?: readonly MuiTelInputCountry[]
  continents?: readonly MuiTelInputContinent[]
}

export function getCallingCodeOfCountry(isoCode: MuiTelInputCountry): string {
  return COUNTRIES[isoCode][0] as string
}

export function sortedPreferredCountries(
  countries: readonly MuiTelInputCountry[],
  preferredCountries: readonly MuiTelInputCountry[]
): readonly MuiTelInputCountry[] {
  return [...new Set(preferredCountries.concat(countries))]
}

export function getCountriesOfContinents(
  continents: readonly MuiTelInputContinent[]
): readonly MuiTelInputCountry[] {
  return continents.flatMap((continentCode) => {
    return CONTINENTS[continentCode]
  })
}

export function getOnlyCountries(
  countries: readonly MuiTelInputCountry[],
  onlyCountries: readonly MuiTelInputCountry[]
): readonly MuiTelInputCountry[] {
  return countries.filter((isoCode) => {
    return onlyCountries.includes(isoCode)
  })
}

export function excludeCountries(
  countries: readonly MuiTelInputCountry[],
  excludedCountries?: readonly MuiTelInputCountry[]
): readonly MuiTelInputCountry[] {
  if (matchIsArray(excludedCountries, true)) {
    return countries.filter((isoCode) => {
      return !excludedCountries.includes(isoCode)
    })
  }
  return countries
}

export function filterCountries(
  countries: readonly MuiTelInputCountry[],
  options: FilterCountriesOptions
): readonly MuiTelInputCountry[] {
  const { onlyCountries, excludedCountries, continents, preferredCountries } =
    options

  if (matchIsArray(onlyCountries, true)) {
    const filteredCountries = getOnlyCountries(countries, onlyCountries)
    return matchIsArray(preferredCountries, true)
      ? sortedPreferredCountries(filteredCountries, preferredCountries)
      : filteredCountries
  }

  const theCountries = matchIsArray(continents, true)
    ? getCountriesOfContinents(continents)
    : countries

  const sortedCountries = matchIsArray(preferredCountries, true)
    ? sortedPreferredCountries(theCountries, preferredCountries)
    : theCountries

  return matchIsArray(excludedCountries, true)
    ? excludeCountries(sortedCountries, excludedCountries)
    : sortedCountries
}

export function matchContinentsIncludeCountry(
  continents: MuiTelInputContinent[],
  isoCode: MuiTelInputCountry
) {
  return continents.some((continentCode) => {
    return CONTINENTS[continentCode].includes(isoCode)
  })
}

export function sortAlphabeticallyCountryCodes(
  countryCodes: readonly MuiTelInputCountry[],
  displayNames: Intl.DisplayNames
): readonly MuiTelInputCountry[] {
  return [...countryCodes].sort((countryCodeA, countryCodeB) => {
    const countryA = displayNames.of(countryCodeA) as string
    const countryB = displayNames.of(countryCodeB) as string
    return countryA.localeCompare(countryB)
  })
}
