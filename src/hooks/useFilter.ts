import { useState } from 'react';

export default function useFilter<T>(data: T[]) {
  const [filterValue, setFilterValue] = useState('');

  const filteredData = filterValue
    ? data.filter((item) =>
        JSON.stringify(Object.values(item))
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      )
    : data;

  return { filterValue, setFilterValue, filteredData };
}
