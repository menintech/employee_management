import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
  args: {
    email: v.string(),
    upgrade: v.boolean(),
    subscription_status: v.string(),
    subscription_id: v.string(),
    payment_id: v.string(),
    subscription_start_date: v.string(),
    subscription_end_date: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      await ctx.db.insert("users", {
        email: args.email,
        upgrade: false,
        subscription_status: "",
        subscription_id: "",
        payment_id: "",
        subscription_start_date: "",
        subscription_end_date: "",
      });

      return "User record added";
    }

    return "User already exists";
  },
});
