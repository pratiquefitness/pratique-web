import React, {useEffect, useState} from 'react'
import { AutoComplete, Select } from 'antd'

export const ExerciseAutocompleteInput = ({
  selectedExercise = () => {},
  options = [],
  hasFilter = () => {},
  focus = () => {},
  resetInput = false
}) => {
  const [ value, setValue ] = useState('');
  const [ autoCompleteOptions, setAutoCompleteOptions ] = useState([]);

  const onSelect = (data) => {
    selectedExercise(data);
  };

  const onSearch = (data) => {
    hasFilter(data);
  };

  useEffect(() => {
    let hasReset = false
    if(resetInput) hasReset = true
    setValue(hasReset ? '' : value)
  }, [resetInput]);

  useEffect(() => {
    let opt = [];
    let removeDuplicates = [];
    if(options.length) {
      opt = options.reduce((o, option) => {
        return [...o, {value: option.exercicio_nome}]
      }, []);
    }

    const unique = [...new Map(opt.map(item => [item['value'], item])).values()];

    setAutoCompleteOptions(unique)
  }, []);

  return (
    <>
      <AutoComplete
        id={'pesquisa_exercicio'}
        value={value}
        options={autoCompleteOptions}
        style={{
          width: "100%",
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={setValue}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="PESQUISE O EXERCÍCIO DESEJADO"
        allowClear
        onFocus={focus}
      />
    </>
  );
};

export const ExerciseChoiceInput = ({
  selectedChoice = () => {},
  focus = () => {},
  resetInput = false
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [ options, setOptions ] = useState([
    {label: 'Abdomen' , value: 1},
    {label: 'Abdutor de Quadril' , value: 2},
    {label: 'Antebraço' , value: 3},
    {label: 'Bíceps' , value: 4},
    {label: 'Cardio' , value: 16},
    {label: 'Deltoide' , value: 5},
    {label: 'Dorsal' , value: 6},
    {label: 'Glúteo' , value: 7},
    {label: 'Isquiotibiais' , value: 8},
    {label: 'Lombar' , value: 9},
    {label: 'Panturrilha' , value: 10},
    {label: 'Peitoral' , value: 11},
    {label: 'Quadríceps' , value: 12},
    {label: 'Trapézio' , value: 13},
    {label: 'Triceps' , value: 14},
    {label: 'Aduto de Quadril' , value: 15},
  ]);

  useEffect(() => {
    let hasReset = false
    if(resetInput) hasReset = true
    setSelectedValues(hasReset ? [] : selectedValues)
  }, [resetInput]);

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
        id={'filtro_grupamento_muscular'}
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        defaultValue={[]}
        placeholder="FILTRE PELO GRUPAMENTO MUSCULAR"
        onChange={handleChange}
        options={options}
        value={selectedValues}
        onFocus={focus}
        filterOption={(inputValue, option) => normalizeOption(option, inputValue) }
      />
    </>
  );
};
