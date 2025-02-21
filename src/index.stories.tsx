import React from 'react'
import { ISO_CODES } from '@shared/constants/countries'
import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MuiTelInput, MuiTelInputProps } from './index'

export default {
  title: 'MuiTelInput',
  component: MuiTelInput,
  argTypes: {
    defaultCountry: {
      options: ISO_CODES,
      control: { type: 'select' }
    },
    langOfCountryName: {
      options: ISO_CODES,
      control: { type: 'select' }
    },
    isIsoCodeEditable: {
      options: [true, false],
      control: { type: 'boolean' }
    },
    disableDropdown: {
      options: [true, false],
      control: { type: 'boolean' }
    },
    disableFormatting: {
      options: [true, false],
      control: { type: 'boolean' }
    },
    focusOnSelectCountry: {
      options: [true, false],
      control: { type: 'boolean' }
    },
    excludeCountries: {
      options: ISO_CODES,
      control: { type: 'object' }
    },
    onlyCountries: {
      options: ISO_CODES,
      control: { type: 'object' }
    },
    preferredCountries: {
      options: ISO_CODES,
      control: { type: 'object' }
    }
  }
} as ComponentMeta<typeof MuiTelInput>

export const Primary: ComponentStory<typeof MuiTelInput> = (args) => {
  const { value, ...rest } = args
  const [state, setState] = React.useState<string | undefined>(undefined)

  const handleChange = (
    ...argsChange: Parameters<NonNullable<MuiTelInputProps['onChange']>>
  ) => {
    action('onChange')(argsChange)
    setState(argsChange[0])
  }

  return (
    <MuiTelInput
      {...rest}
      value={state}
      preferredCountries={['FR']}
      onChange={handleChange}
    />
  )
}
