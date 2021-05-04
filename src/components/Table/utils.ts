import { useState } from 'react'
import { SortByType, TableValueTypes } from './table.types'

export const useSortBy = (
  data: any[]
): [
  sortedData: any[],
  sortBy: SortByType | null,
  setSort: (param: string) => void
] => {
  const [sortBy, setSortBy] = useState<SortByType | null>(null)

  function setSort(param: string) {
    setSortBy((currSort) => ({
      asc: currSort?.by === param ? !currSort.asc : true,
      by: param,
    }))
  }

  function sortData(a: any, b: any) {
    if (!sortBy) {
      return 0
    }

    if (a[sortBy.by] > b[sortBy.by]) return sortBy.asc ? 1 : -1
    if (a[sortBy.by] < b[sortBy.by]) return sortBy.asc ? -1 : 1
    return 0
  }
  const sortedData = data.sort(sortData)

  return [sortedData, sortBy, setSort]
}

export function formatCellValue(value: any, type?: TableValueTypes) {
  switch (type) {
    default:
      return value
  }
}

export function getFilterMatch(text: string = '', filter: string = '') {
  if (!text || !filter) {
    return { parts: [text], searchWords: [] }
  }

  const searchWords = filter.toLowerCase().split(' ')
  const searchRx = filter
    .toLowerCase()
    .replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&')
    .replace(/ /g, '|')

  const parts = text.toString().split(new RegExp(`(${searchRx})`, 'gi'))
  return { parts, searchWords }
}
