"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions";
import { AddTaskDialog } from "@/components/data-table/add-task-dialog";
import { type Task } from "./data/schema";
import { generateTasks } from "./data/seed";

const statusVariants = {
  todo: "default",
  "in-progress": "secondary",
  done: "outline",
  canceled: "destructive",
} as const;

const priorityVariants = {
  low: "outline",
  medium: "default",
  high: "destructive",
} as const;

const labelVariants = {
  bug: "destructive",
  feature: "default",
  documentation: "secondary",
  enhancement: "outline",
} as const;

const labels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
  { value: "enhancement", label: "Enhancement" },
];

export default function TableDemo() {
  const [tasks, setTasks] = React.useState<Task[]>(() => generateTasks(50));
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const handleAddTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const taskId = `TASK-${(tasks.length + 1).toString().padStart(4, "0")}`;
    const task: Task = {
      ...newTask,
      id: taskId,
      createdAt: new Date(),
    };
    setTasks([task, ...tasks]);
  };

  const columns: ColumnDef<Task>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Task ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        const label = row.original.label;
        return (
          <div className="flex space-x-2">
            <Badge variant={labelVariants[label]}>{label}</Badge>
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("title")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as Task["status"];
        return (
          <Badge variant={statusVariants[status]} className="capitalize">
            {status.replace("-", " ")}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = row.getValue("priority") as Task["priority"];
        return (
          <Badge variant={priorityVariants[priority]} className="capitalize">
            {priority}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date;
        return (
          <div className="text-muted-foreground text-sm">
            {format(date, "MMM dd, yyyy")}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onView={(row) => {
            toast.info("View action", {
              description: `Viewing task: ${row.original.id}`,
            });
          }}
          onEdit={(row) => {
            toast.info("Edit action", {
              description: `Editing task: ${row.original.id}`,
            });
          }}
          onDelete={(row) => {
            toast.error("Delete action", {
              description: `Deleting task: ${row.original.id}`,
            });
          }}
          labels={labels}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: tasks,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleBulkDelete = () => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);

    setTasks((prevTasks) =>
      prevTasks.filter((task) => !selectedIds.includes(task.id))
    );

    toast.error("Tasks deleted", {
      description: `${selectedIds.length} task(s) have been deleted.`,
    });

    table.resetRowSelection();
  };

  const handleBulkChangeStatus = (status: string) => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        selectedIds.includes(task.id)
          ? { ...task, status: status as Task["status"] }
          : task
      )
    );

    toast.success("Status updated", {
      description: `${selectedIds.length} task(s) status updated to ${status.replace("-", " ")}.`,
    });

    table.resetRowSelection();
  };

  const handleBulkChangePriority = (priority: string) => {
    const selectedIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        selectedIds.includes(task.id)
          ? { ...task, priority: priority as Task["priority"] }
          : task
      )
    );

    toast.success("Priority updated", {
      description: `${selectedIds.length} task(s) priority updated to ${priority}.`,
    });

    table.resetRowSelection();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-2">
            A comprehensive data table demo featuring sorting, filtering,
            pagination, and column visibility controls.
          </p>
        </div>
        <AddTaskDialog onAddTask={handleAddTask} />
      </div>
      <DataTable
        columns={columns}
        data={tasks}
        searchKey="title"
        searchPlaceholder="Search tasks..."
        onDeleteSelected={handleBulkDelete}
        onChangeStatus={handleBulkChangeStatus}
        onChangePriority={handleBulkChangePriority}
      />
    </div>
  );
}
