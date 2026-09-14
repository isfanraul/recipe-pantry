import { useEffect, useState } from 'react';
import Select from 'react-select';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function CategorySelect(props) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOptions(data.map((el) => ({ label: el.name, value: el.id })));
      })
  }, []);

  return (
    <>
      <Select
        isMulti
        options={options}
        onChange={(newValues) => props.setCategories(newValues)}
      />
    </>
  )
}
