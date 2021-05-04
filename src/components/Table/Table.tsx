import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TableAction, TableButtonTypes, TableColumn } from './table.types';
import TextMatchingFilter from './TextMatchingFilter';
import { formatCellValue, getFilterMatch, useSortBy } from './utils';

type TableProps = {
  actions?: TableAction[];
  columns: TableColumn[];
  data: any[];
};

export default function Table({ actions, columns, data }: TableProps) {
  const [filter, setFilter] = useState('');
  const filteredData = filter
    ? data.filter((item) =>
        JSON.stringify(Object.values(item))
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    : data;
  const [sortedData, sortBy, setSort] = useSortBy(filteredData);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      ></input>
      <table className="kbtable">
        <thead>
          <tr>
            {columns.map((column, idx) => {
              const columnIsSorted = sortBy && sortBy.by === column.valueKey;
              const sortIcon =
                sortBy && columnIsSorted
                  ? sortBy.asc
                    ? String.fromCharCode(8595)
                    : String.fromCharCode(8593)
                  : null;
              return (
                <th
                  key={`${idx}-${column}`}
                  onClick={() => setSort(column.valueKey)}
                  {...(columnIsSorted && { className: 'sorted' })}
                >
                  {column.title} {sortIcon}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, rowIdx) => {
            return (
              <tr key={rowIdx}>
                {columns.map((column, colIdx) => {
                  if (column.type === 'buttons') {
                    return (
                      <td key={`${colIdx}-${column.title}`} className="buttons">
                        {column.buttons &&
                          column.buttons.indexOf(TableButtonTypes.EDIT) >
                            -1 && (
                            <button
                              type="button"
                              className="kbbutton small"
                              onClick={() =>
                                actions &&
                                actions
                                  .find((x) => x.key === TableButtonTypes.EDIT)
                                  ?.action(item)
                              }
                            >
                              Edit
                            </button>
                          )}
                        {column.buttons &&
                          column.buttons.indexOf(TableButtonTypes.DELETE) >
                            -1 && (
                            <button
                              type="button"
                              className="kbbutton small"
                              onClick={() =>
                                actions &&
                                actions
                                  .find(
                                    (x) => x.key === TableButtonTypes.DELETE
                                  )
                                  ?.action(item)
                              }
                            >
                              Delete
                            </button>
                          )}
                      </td>
                    );
                  }
                  const cellValue = formatCellValue(
                    item[column.valueKey],
                    column.valueType
                  );
                  const { parts, searchWords } = getFilterMatch(
                    cellValue,
                    filter
                  );
                  const filteredCellValue = (
                    <TextMatchingFilter
                      parts={parts}
                      searchWords={searchWords}
                    />
                  );
                  const valueAsLink = column.onClick ? (
                    <Link
                      to={`${column.onClick.linkPrefix}${
                        item[column.onClick.linkKey]
                      }`}
                    >
                      {filteredCellValue}
                    </Link>
                  ) : (
                    filteredCellValue
                  );
                  return (
                    <td key={`${colIdx}-${column.title}`}>{valueAsLink}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
