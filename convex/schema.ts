import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    upgrade: v.boolean(),
    subscription_status: v.string(),
    subscription_id: v.string(),
    payment_id: v.string(),
    subscription_start_date: v.string(),
    subscription_end_date: v.string(),
  }),

  employee: defineTable({
    emp_id: v.number(),
    firstName: v.string(),
    lastName: v.string(),
    middleName: v.string(),
    email: v.string(),
    address: v.optional(v.string()),
    adharCard: v.string(),
    salary: v.optional(v.number()),
    employer: v.string(),
    isActive: v.boolean(),
    attendanceData: v.array(
      v.object({
        year: v.number(),
        month: v.number(),
        records: v.array(
          v.object({
            date: v.string(),
            inTime: v.string(),
            outTime: v.string(),
            totalHours: v.string(),
            halfDay: v.string(),
          })
        ),
      })
    ),
    createdAt: v.union(v.number(), v.null()), // Use v.union(v.number(), v.null()) for nullable fields
    updatedAt: v.union(v.number(), v.null()), // Same for updatedAt
  }).index("by_emp_id", ["emp_id"]),
});
