import { type Task } from "./schema";

const titles = [
  "Fix login authentication bug",
  "Implement dark mode toggle",
  "Update user documentation",
  "Optimize database queries",
  "Add email notification feature",
  "Refactor API endpoints",
  "Design new dashboard layout",
  "Write unit tests for components",
  "Setup CI/CD pipeline",
  "Improve error handling",
  "Add search functionality",
  "Update dependencies",
  "Create mobile responsive design",
  "Implement user profile page",
  "Fix navigation menu bug",
  "Add export to CSV feature",
  "Optimize image loading",
  "Setup monitoring and logging",
  "Create admin panel",
  "Implement pagination",
  "Add filtering options",
  "Fix form validation",
  "Update privacy policy",
  "Implement OAuth integration",
  "Add loading states",
  "Create onboarding flow",
  "Fix memory leak issue",
  "Add keyboard shortcuts",
  "Implement data caching",
  "Create API documentation",
  "Add rate limiting",
  "Fix cross-browser compatibility",
  "Implement real-time updates",
  "Add analytics tracking",
  "Create backup system",
  "Fix security vulnerabilities",
  "Add multi-language support",
  "Implement drag and drop",
  "Create user settings page",
  "Add notification center",
  "Fix performance issues",
  "Implement file upload",
  "Create changelog page",
  "Add custom themes",
  "Fix accessibility issues",
  "Implement activity log",
  "Create help center",
  "Add batch operations",
  "Fix responsive layout",
  "Implement two-factor auth",
];

const statuses: Task["status"][] = ["todo", "in-progress", "done", "canceled"];
const priorities: Task["priority"][] = ["low", "medium", "high"];
const labels: Task["label"][] = [
  "bug",
  "feature",
  "documentation",
  "enhancement",
];

// Seeded random number generator for consistent results
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

function getRandomElement<T>(array: T[], rng: SeededRandom): T {
  return array[Math.floor(rng.next() * array.length)]!;
}

function getRandomDate(start: Date, end: Date, rng: SeededRandom): Date {
  return new Date(
    start.getTime() + rng.next() * (end.getTime() - start.getTime())
  );
}

export function generateTasks(
  count: number = 50,
  seed: number = 12345
): Task[] {
  const tasks: Task[] = [];
  const rng = new SeededRandom(seed);
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date(2024, 11, 31); // Fixed end date to avoid hydration issues

  for (let i = 0; i < count; i++) {
    tasks.push({
      id: `TASK-${(i + 1).toString().padStart(4, "0")}`,
      title: getRandomElement(titles, rng),
      status: getRandomElement(statuses, rng),
      priority: getRandomElement(priorities, rng),
      label: getRandomElement(labels, rng),
      createdAt: getRandomDate(startDate, endDate, rng),
    });
  }

  return tasks;
}
