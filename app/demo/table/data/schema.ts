import { z } from "zod";

// Status options
export const statuses = [
  { value: "todo", label: "Todo", icon: "IconCircle" },
  { value: "in-progress", label: "In Progress", icon: "IconLoader" },
  { value: "done", label: "Done", icon: "IconCircleCheck" },
  { value: "canceled", label: "Canceled", icon: "IconCircleX" },
] as const;

// Priority options
export const priorities = [
  { value: "low", label: "Low", icon: "IconArrowDown" },
  { value: "medium", label: "Medium", icon: "IconArrowRight" },
  { value: "high", label: "High", icon: "IconArrowUp" },
] as const;

// Label/Type options for tasks
export const labels = [
  { value: "feature", label: "feature" },
  { value: "bug", label: "bug" },
  { value: "enhancement", label: "enhancement" },
  { value: "documentation", label: "documentation" },
] as const;

// Zod schema for Task
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["todo", "in-progress", "done", "canceled"]),
  priority: z.enum(["low", "medium", "high"]),
  label: z.enum(["feature", "bug", "enhancement", "documentation"]),
  estimatedHours: z.number(),
  createdAt: z.date(),
});

export type Task = z.infer<typeof taskSchema>;
