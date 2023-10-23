import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import Data from "./data.json";
import COLUMNS from "./columns";
import GlobalFilter from "./GlobalFilter";

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
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    previousPage,
    nextPage,
    state,
    setGlobalFilter,
  } = tableInstance;

  //  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows } =
  //tableInstance;

  const { globalFilter } = state;

  return (
    <div className="overflow-x-auto m-1">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-6 text-left text-md font-bold text-white uppercase bg-slate-800"
                >
                  {column.render("Header")}
                  <span className="px-2">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "🔽"
                        : "🔼"
                      : "↕️"}
                  </span>
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
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        {/* <tfoot className="sticky bottom-0">
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()} className="bg-gray-100">
              {footerGroup.headers.map((column) => (
                <td
                  {...column.getFooterProps()}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-600"
                >
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className="flex items-center space-x-4 mx-auto mt-3">
        <button
          onClick={() => previousPage()}
          className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        >
          ⏮️ 
        </button>
        <button
          onClick={() => nextPage()}
          className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        >
         ⏭️
        </button>
      </div>
    </div>
  );
};

export default GlobalFiltering;
