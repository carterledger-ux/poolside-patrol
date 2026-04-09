import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { sendCustomerConfirmation, sendOwnerNotification, sendTestEmail } from "./email";
import { z } from "zod";

const reservationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().optional().default(""),
  guestCount: z.string().optional().default(""),
  eventType: z.string().min(1, "Event type is required"),
  duration: z.number().min(1).max(12),
  notes: z.string().optional().default(""),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  // Add-ons
  setupTeardown: z.boolean().optional().default(false),
  lifeJackets: z.boolean().optional().default(false),
  lifeJacketCount: z.number().optional().default(0),
  ageRangeMin: z.number().optional().default(0),
  ageRangeMax: z.number().optional().default(99),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  reservation: router({
    submit: publicProcedure
      .input(reservationSchema)
      .mutation(async ({ input }) => {
        const data = {
          name: input.name,
          email: input.email,
          phone: input.phone,
          address: input.address ?? "",
          guestCount: input.guestCount ?? "",
          eventType: input.eventType,
          duration: input.duration,
          notes: input.notes ?? "",
          date: input.date,
          time: input.time,
          setupTeardown: input.setupTeardown ?? false,
          lifeJackets: input.lifeJackets ?? false,
          lifeJacketCount: input.lifeJacketCount ?? 0,
          ageRangeMin: input.ageRangeMin ?? 0,
          ageRangeMax: input.ageRangeMax ?? 99,
        };

        // Fire all notifications in parallel
        const [customerEmailSent, ownerEmailSent, ownerNotified] = await Promise.all([
          sendCustomerConfirmation(data).catch(() => false),
          sendOwnerNotification(data).catch(() => false),
          notifyOwner({
            title: `New Reservation: ${data.name} - ${data.date}`,
            content: `${data.name} booked a ${data.eventType} on ${data.date} at ${data.time} (${data.duration} hrs). Guests: ${data.guestCount || "N/A"}. Phone: ${data.phone}. Email: ${data.email}. Address: ${data.address || "N/A"}.${data.setupTeardown ? " Setup/Teardown: YES (+$50)." : ""}${data.lifeJackets ? ` Life Jackets: ${data.lifeJacketCount} (+$${data.lifeJacketCount * 7}).` : ""} Age Range: ${data.ageRangeMin}-${data.ageRangeMax}. Notes: ${data.notes || "None"}.`,
          }).catch(() => false),
        ]);

        console.log(`[Reservation] Submitted by ${data.name} for ${data.date} at ${data.time}`);
        console.log(`[Reservation] Notifications: customer=${customerEmailSent}, owner=${ownerEmailSent}, manus=${ownerNotified}`);

        return {
          success: true,
          notifications: {
            customerEmail: customerEmailSent,
            ownerEmail: ownerEmailSent,
            ownerNotification: ownerNotified,
          },
        };
      }),

    testEmail: publicProcedure
      .input(z.object({ to: z.string().email() }))
      .mutation(async ({ input }) => {
        const sent = await sendTestEmail(input.to);
        return { success: sent };
      }),
  }),
});

export type AppRouter = typeof appRouter;
