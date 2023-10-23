import React, { useMemo } from "react";
import { useTable } from "react-table";
import Data from "./data.json";
import COLUMNS from "./columns";

const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Data, []);

  const tableInstance = useTable({
    columns: columns,
    data: data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows } =
    tableInstance;

  return (
    <div className="overflow-x-auto">
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
                  {...column.getHeaderProps()}
                  className="px-6 py-6 text-left text-md font-bold text-white uppercase bg-slate-800"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row, rowIndex) => {
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
    </div>
  );
};

export default Table;
