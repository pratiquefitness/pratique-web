import React, {useEffect, useState} from 'react'
import { AutoComplete, Select, Space } from 'antd'

export const ExerciseAutocompleteInput = ({
  selectedExercise = () => {},
  options = [],
  hasFilter = () => {}
}) => {
  const [ value, setValue ] = useState('');
  const [ autoCompleteOptions, setAutoCompleteOptions ] = useState([]);

  const onSelect = (data) => {
    console.log('onSelect', data);
    selectedExercise(data);
  };

  const onSearch = (data) => {
    console.log('onSearch', data);
    hasFilter(data);
  };

  useEffect(() => {
    let opt = [];
    if(options.length) {
      opt = options.reduce((o, option) => {
        return [...o, {value: option.exercicio_nome}]
      }, []);
    }
    setAutoCompleteOptions(opt)
  }, []);

  return (
    <>
      <AutoComplete
        value={value}
        options={autoCompleteOptions}
        style={{
          width: 400,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={setValue}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="PESQUISE O EXERCÍCIO DESEJADO"
        allowClear
      />
    </>
  );
};

/*export const ExerciseChoiceInput = ({
  selectedChoice = () => {},
  hasFilterChoice = () => {}
}) => {
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
  const [ choiceOptions, setAutoCompleteOptions ] = useState([]);

  const onSearch = (data) => {
    console.log('onSearch', data);
    hasFilterChoice(data);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    selectedChoice(value)
  };

  return (
    <>
      <Space
        style={{
          width: '100%',
        }}
        direction="vertical"
      >
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          defaultValue={[]}
          placeholder="FILTRE PELO GRUPAMENTO MUSCULAR"
          onChange={handleChange}
          options={options}
          onSearch={onSearch}
        />
      </Space>
    </>
  );
};*/


