import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

interface TableColumn<T> {
  label: string;
  key: keyof T | string;
  render?: (row: T, index: number) => React.ReactNode;
}

interface BaseTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const BaseTable = <T extends Record<string, unknown>>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data available.",
}: BaseTableProps<T>) => {
  const getCellContent = (row: T, column: TableColumn<T>, index: number) => {
    if (column.render) {
      return column.render(row, index);
    }

    // Check if the key exists in the row
    const key = column.key as keyof T;
    if (key in row) {
      const value = row[key];
      // Handle different types of values appropriately
      if (value === null || value === undefined) {
        return "";
      }
      if (typeof value === "object") {
        return JSON.stringify(value);
      }
      return String(value);
    }

    return "";
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : data?.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    {getCellContent(row, column, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseTable;
