import { columns } from "./columns";
import { DataTable } from "./data-table";
import { tasks } from "./data/tasks";

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground mt-2">
          Manage your tasks with advanced filtering, sorting, and bulk actions.
        </p>
      </div>
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
