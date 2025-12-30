"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import {
  IconX,
  IconTrash,
  IconCircle,
  IconLoader,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface DataTableActionBarProps<TData> {
  table: Table<TData>;
}

export function DataTableActionBar<TData>({
  table,
}: DataTableActionBarProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const handleDelete = () => {
    const ids = selectedRows.map((row) => (row.original as { id: string }).id);
    console.log("Deleting tasks:", ids);
    alert(
      `Deleting ${ids.length} task(s): ${ids.slice(0, 3).join(", ")}${ids.length > 3 ? "..." : ""}`
    );
    table.resetRowSelection();
  };

  const handleStatusChange = (status: string) => {
    const ids = selectedRows.map((row) => (row.original as { id: string }).id);
    console.log(`Updating ${ids.length} tasks to status: ${status}`);
    alert(`Updating ${ids.length} task(s) to status: ${status}`);
    table.resetRowSelection();
  };

  if (selectedCount === 0) return null;

  return (
    <div className="animate-in slide-in-from-bottom-4 fade-in fixed bottom-6 left-1/2 z-50 -translate-x-1/2 duration-300">
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/80 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur">
        {/* Selection count */}
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
            {selectedCount}
          </div>
          <span className="text-muted-foreground text-sm font-medium">
            {selectedCount === 1 ? "row" : "rows"} selected
          </span>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Status update */}
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className="h-8 w-[140px]">
            <SelectValue placeholder="Update status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">
              <div className="flex items-center gap-2">
                <IconCircle className="h-4 w-4" />
                Todo
              </div>
            </SelectItem>
            <SelectItem value="in-progress">
              <div className="flex items-center gap-2">
                <IconLoader className="h-4 w-4" />
                In Progress
              </div>
            </SelectItem>
            <SelectItem value="done">
              <div className="flex items-center gap-2">
                <IconCircleCheck className="h-4 w-4" />
                Done
              </div>
            </SelectItem>
            <SelectItem value="canceled">
              <div className="flex items-center gap-2">
                <IconCircleX className="h-4 w-4" />
                Canceled
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Delete action */}
        <Button
          variant="destructive"
          size="sm"
          className="h-8"
          onClick={handleDelete}
        >
          <IconTrash className="mr-2 h-4 w-4" />
          Delete
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Clear selection */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => table.resetRowSelection()}
        >
          <IconX className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
