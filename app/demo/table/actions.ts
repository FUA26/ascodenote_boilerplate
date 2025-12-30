"use server";

import { Payment } from "./columns";

/**
 * Server action to fetch payment data
 * This is a placeholder for actual database/API calls
 */
export async function getPayments(): Promise<Payment[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Generate more data for better pagination demonstration
  const statuses: Payment["status"][] = [
    "pending",
    "processing",
    "success",
    "failed",
  ];
  const domains = [
    "example.com",
    "gmail.com",
    "test.com",
    "company.com",
    "business.com",
    "website.com",
    "service.com",
    "store.com",
    "platform.com",
    "startup.com",
    "corp.com",
    "enterprise.com",
    "firm.com",
    "shop.com",
    "agency.com",
  ];

  const names = [
    "alice",
    "bob",
    "charlie",
    "david",
    "emma",
    "frank",
    "grace",
    "henry",
    "ivy",
    "jack",
    "kate",
    "liam",
    "mia",
    "noah",
    "olivia",
    "peter",
    "quinn",
    "rachel",
    "sam",
    "tina",
  ];

  // Generate 60 entries
  const payments: Payment[] = [];
  for (let i = 0; i < 60; i++) {
    payments.push({
      id: `PAY-${String(i + 1).padStart(5, "0")}`,
      email: `${names[i % names.length]}${Math.floor(i / names.length) + 1}@${
        domains[i % domains.length]
      }`,
      status: statuses[i % statuses.length],
      amount: Math.floor(Math.random() * 900) + 50, // Random amount between 50-950
    });
  }

  return payments;
}
