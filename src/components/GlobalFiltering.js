import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useRowSelect,
  usePagination,
} from "react-table";
import Data from "./data.json";
import COLUMNS from "./columns";
import GlobalFilter from "./GlobalFilter";
import { Checkbox } from "./Checkbox";

const GlobalFiltering = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Data, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  console.log(tableInstance);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <div className="pt-5 m-2">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="overflow-x-auto overflow-y-auto h-[32rem]">
      <table
        {...getTableProps}
        className="min-w-full bg-white rounded-lg shadow-md"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="border-b bg-gray-100"
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps(columnIndex === 0 ? {} : column.getSortByToggleProps())}
                  className="px-6 py-6 text-left text-md font-bold text-white uppercase bg-slate-800 border-2 border-white"
                >
                  {column.render("Header")}
                 {columnIndex !== 0 && <span className="px-2">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "🔽"
                        : "🔼"
                      : "↕️"}
                  </span>}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {page.map((row, rowIndex) => {
            tableInstance.prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={rowIndex % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap border-2 border-purple-950"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div className="flex items-center justify-center mt-3">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        >
          ⏮️
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        >
          ⏭️
        </button>
      </div>
      <pre>
      {selectedFlatRows.length > 0 ? (
        JSON.stringify(
          selectedFlatRows.map((row) => row.original),
          null,
          2
        )
      ) : (
        null
      )}
    </pre>
    </div>
  );
};

export default GlobalFiltering;
