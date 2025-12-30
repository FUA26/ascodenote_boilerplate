# Shadcn Data Table Integration Guide

This document outlines the standard approach to integrating the Shadcn Data Table component into the application. It covers setup, component structure, and server-side integration patterns.

## 1. Overview
The **Data Table** component is built on top of [TanStack Table](https://tanstack.com/table/v8) and [Shadcn UI](https://ui.shadcn.com/docs/components/data-table). It provides a headless utility for creating powerful, flexible tables with features like sorting, filtering, and pagination.

## 2. Prerequisites
Ensure the following dependencies are installed:

```bash
pnpm add @tanstack/react-table lucide-react
```

Ensure the base table component is initialized:
```bash
npx shadcn-ui@latest add table
```

## 3. Project Structure
We recommend a modular structure for table components:

```
app/
  demo/
    table/
      page.tsx          # Page rendering the table
      columns.tsx       # Column definitions
      data-table.tsx    # Client-side table wrapper
      actions.ts        # Server Actions for data
components/
  ui/
    table.tsx           # Base Shadcn primitives
```

## 4. Implementation Steps

### Step 1: Base Components
Ensure `components/ui/table.tsx` contains the standard Shadcn primitives (`Table`, `TableHeader`, `TableRow`, etc.).

### Step 2: The `DataTable` Component
Create a reusable `DataTable` component. This component accepts `data` and `columns` and handles the table state (sorting, filtering, pagination).

**Location:** `components/shared/data-table.tsx` (or colocated in your feature folder)

```tsx
"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      {/* Optional: Filter Input */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

### Step 3: Defining Columns
Define your column structure in `columns.tsx`.

```tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
```

### Step 4: Page Implementation
Combine everything in `page.tsx`.

```tsx
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
```

## 5. Server-Side Integration (Advanced)
For large datasets, avoid client-side operations (filtering/sorting/pagination). Instead:

1.  **Params**: Rely on URLSearchParams (`?page=1&sort=date`).
2.  **Server Actions / Fetch**: Pass these params to your database query.
3.  **State**: Pass the server-side state (current page, page count) to the `DataTable`.
4.  **Controlled Mode**: Configure `useReactTable` in manual mode:
    ```tsx
    useReactTable({
      manualPagination: true,
      manualSorting: true,
      manualFiltering: true,
      pageCount: serverData.pageCount,
      // ...
    })
    ```

## 6. Verification
-   **Run**: `pnpm run dev`
-   **Check**: Navigate to the route.
-   **Test**:
    -   Click "Email" header to sort.
    -   Type in filter input to search.
    -   Click "Next/Previous" to paginate.
