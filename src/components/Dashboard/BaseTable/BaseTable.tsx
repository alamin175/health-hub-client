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
  label: string; // Column header
  key: keyof T | string; // Data key or custom identifier
  render?: (row: T, index: number) => React.ReactNode; // Custom render for a cell
}

interface BaseTableProps<T> {
  columns: TableColumn<T>[]; // Column definitions
  data: T[]; // Table data
  isLoading?: boolean; // Loading state
  emptyMessage?: string; // Message for empty data
}

const BaseTable = <T,>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data available.",
}: BaseTableProps<T>) => {
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
                    {column.render
                      ? column.render(row, index)
                      : (row as any)[column.key]}
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
