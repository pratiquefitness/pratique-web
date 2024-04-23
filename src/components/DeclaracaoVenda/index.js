import React, {useEffect, useState} from 'react'
import { AutoComplete, Select } from 'antd'

export const DeclaracaoVendaSelect = ({
  id = '',
  placeholder = '',
  selectedChoice = () => {},
  optionsData = [],
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [ options, setOptions ] = useState(optionsData);

  const handleChange = (value) => {
    selectedChoice(value)
    setSelectedValues(value)
  };

  const normalizeOption = (option, inputValue) => {
    return option.
      label.normalize('NFD').replace(/[\u0300-\u036f]/g, "").
        toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      ||
      option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
  }

  return (
    <>
      <Select
        id={id}
        style={{
          width: '100%',
        }}
        showSearch
        defaultValue={[]}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        value={selectedValues}
        optionFilterProp="children"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        filterOption={(inputValue, option) => normalizeOption(option, inputValue) }
      />
    </>
  );
};
