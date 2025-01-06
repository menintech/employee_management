import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createEmployee = mutation({
  args: {
    emp_id: v.number(),
    firstName: v.string(),
    lastName: v.string(),
    middleName: v.string(),
    email: v.string(),
    address: v.string(),
    adharCard: v.string(),
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
  },
  handler: async (ctx, args) => {
    const {
      emp_id,
      attendanceData,
      firstName,
      lastName,
      middleName,
      email,
      address,
      adharCard,
      isActive,
      employer,
    } = args;

    // Check if the employee exists
    const [employee] = await ctx.db
      .query("employee")
      .filter((q) => q.eq(q.field("emp_id"), emp_id))
      .take(1);

    if (!employee) {
      // If employee doesn't exist, insert a new one
      await ctx.db.insert("employee", {
        emp_id,
        firstName,
        lastName,
        middleName,
        email,
        address,
        adharCard,
        employer,
        isActive,
        attendanceData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } else {
      // Employee exists, perform a patch operation
      const existingData = employee.attendanceData || [];

      // Use a Map to merge existing and new attendance data efficiently
      const attendanceMap = new Map();

      // Add existing data to the Map
      for (const item of existingData) {
        const key = `${item.year}-${item.month}`;
        attendanceMap.set(key, item);
      }

      // Add/Update new data in the Map
      for (const newItem of attendanceData) {
        const key = `${newItem.year}-${newItem.month}`;

        if (attendanceMap.has(key)) {
          // Merge records for the same year and month
          const existingItem = attendanceMap.get(key);

          // Avoid duplicates using a Set based on `date`
          const recordsMap = new Map(
            existingItem.records.map((record: any) => [record.date, record])
          );

          // Add new records, overwriting duplicates
          for (const record of newItem.records) {
            recordsMap.set(record.date, record);
          }

          // Update the existing item's records
          attendanceMap.set(key, {
            ...existingItem,
            records: Array.from(recordsMap.values()),
          });
        } else {
          // Add new item if it doesn't exist
          attendanceMap.set(key, newItem);
        }
      }

      // Convert Map back to an array
      const updatedAttendanceData = Array.from(attendanceMap.values());

      // Patch the employee with updated data
      await ctx.db.patch(employee._id, {
        attendanceData: updatedAttendanceData,
        updatedAt: Date.now(),
      });
    }
  },
});

export const getEmployee = query({
  args: {
    employer: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.employer) {
      return;
    }
    const result = await ctx.db
      .query("employee")
      .filter((q) => q.eq(q.field("employer"), args.employer))
      .collect();

    return result;
  },
});
