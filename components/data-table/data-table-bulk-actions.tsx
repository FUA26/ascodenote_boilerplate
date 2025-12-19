"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableBulkActionsProps<TData> {
  table: Table<TData>;
  onDeleteSelected?: () => void;
  onChangeStatus?: (status: string) => void;
  onChangePriority?: (priority: string) => void;
}

export function DataTableBulkActions<TData>({
  table,
  onDeleteSelected,
  onChangeStatus,
  onChangePriority,
}: DataTableBulkActionsProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <p className="text-muted-foreground text-sm font-medium">
        {selectedCount} selected
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            Bulk Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          {onChangeStatus && (
            <>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => onChangeStatus("todo")}>
                    To Do
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onChangeStatus("in-progress")}
                  >
                    In Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onChangeStatus("done")}>
                    Done
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onChangeStatus("canceled")}>
                    Canceled
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
            </>
          )}
          {onChangePriority && (
            <>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Change Priority</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => onChangePriority("low")}>
                    Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onChangePriority("medium")}>
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onChangePriority("high")}>
                    High
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
            </>
          )}
          {onDeleteSelected && (
            <DropdownMenuItem
              onClick={onDeleteSelected}
              className="text-destructive focus:text-destructive"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete Selected
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
