import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  address: string;
  guestCount: string;
  eventType: string;
  duration: number;
  notes: string;
  date: string;
  time: string;
  setupTeardown: boolean;
  lifeJackets: boolean;
  lifeJacketCount: number;
  ageRangeMin: number;
  ageRangeMax: number;
}

/**
 * Send confirmation email to the customer who booked.
 */
export async function sendCustomerConfirmation(data: ReservationData): Promise<boolean> {
  const fromEmail = process.env.GMAIL_USER;
  if (!fromEmail || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("[Email] Gmail credentials not configured");
    return false;
  }

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f5; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1a7a6d, #14665b); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Poolside Patrol</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Private Lifeguard Services</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #1a1a1a; margin: 0 0 8px; font-size: 20px;">Reservation Request Received!</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 24px;">
          Hi ${data.name.split(" ")[0]}, thank you for booking with Poolside Patrol! I've received your reservation request and will confirm your booking within 24 hours.
        </p>
        
        <div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e8e0d4;">
          <h3 style="color: #1a7a6d; margin: 0 0 16px; font-size: 16px; border-bottom: 2px solid #f0ece4; padding-bottom: 8px;">Booking Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px; width: 120px;">Date</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Time</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Duration</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.duration} hours</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Event Type</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.eventType}</td>
            </tr>
            ${data.guestCount ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Guests</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.guestCount}</td>
            </tr>` : ""}
            ${data.address ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Location</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.address}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Age Range</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.ageRangeMin} - ${data.ageRangeMax} years</td>
            </tr>
            ${data.setupTeardown ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Add-on</td>
              <td style="padding: 8px 0; color: #1a7a6d; font-size: 14px; font-weight: 600;">Pre-Party Setup & Post-Party Teardown (+$50)</td>
            </tr>` : ""}
            ${data.lifeJackets ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Add-on</td>
              <td style="padding: 8px 0; color: #1a7a6d; font-size: 14px; font-weight: 600;">Life Jackets x${data.lifeJacketCount} (+$${data.lifeJacketCount * 7})</td>
            </tr>` : ""}
          </table>
        </div>

        <p style="color: #666; line-height: 1.6; margin: 24px 0 0; font-size: 14px;">
          If you have any questions or need to make changes, feel free to reply to this email or reach out at <a href="mailto:poolsidepatrol@gmail.com" style="color: #1a7a6d;">poolsidepatrol@gmail.com</a>.
        </p>
      </div>
      <div style="background: #f0ece4; padding: 20px 24px; text-align: center;">
        <p style="color: #999; margin: 0; font-size: 12px;">
          Poolside Patrol · Flower Mound, TX · Because exceptional moments deserve exceptional safety.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Poolside Patrol" <${fromEmail}>`,
      to: data.email,
      subject: `Reservation Request Received - ${data.date}`,
      html,
    });
    console.log(`[Email] Customer confirmation sent to ${data.email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send customer confirmation:", error);
    return false;
  }
}

/**
 * Send notification email to the owner (Ledger) about a new reservation.
 */
export async function sendOwnerNotification(data: ReservationData): Promise<boolean> {
  const fromEmail = process.env.GMAIL_USER;
  const ownerEmail = process.env.OWNER_EMAIL || "poolsidepatrol@gmail.com";
  if (!fromEmail || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("[Email] Gmail credentials not configured");
    return false;
  }

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f5; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #d4a017, #b8860b); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Reservation!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">A new booking request has come in</p>
      </div>
      <div style="padding: 32px 24px;">
        <div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e8e0d4; margin-bottom: 20px;">
          <h3 style="color: #1a7a6d; margin: 0 0 16px; font-size: 16px; border-bottom: 2px solid #f0ece4; padding-bottom: 8px;">Customer Info</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;"><a href="mailto:${data.email}" style="color: #1a7a6d;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Phone</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;"><a href="tel:${data.phone}" style="color: #1a7a6d;">${data.phone}</a></td>
            </tr>
          </table>
        </div>

        <div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e8e0d4;">
          <h3 style="color: #1a7a6d; margin: 0 0 16px; font-size: 16px; border-bottom: 2px solid #f0ece4; padding-bottom: 8px;">Event Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px; width: 120px;">Date</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Time</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Duration</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.duration} hours</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Event Type</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.eventType}</td>
            </tr>
            ${data.guestCount ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Guests</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.guestCount}</td>
            </tr>` : ""}
            ${data.address ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Location</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.address}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Age Range</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.ageRangeMin} - ${data.ageRangeMax} years</td>
            </tr>
            ${data.setupTeardown ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Add-on</td>
              <td style="padding: 8px 0; color: #1a7a6d; font-size: 14px; font-weight: 600;">Pre-Party Setup & Post-Party Teardown (+$50)</td>
            </tr>` : ""}
            ${data.lifeJackets ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Add-on</td>
              <td style="padding: 8px 0; color: #1a7a6d; font-size: 14px; font-weight: 600;">Life Jackets x${data.lifeJacketCount} (+$${data.lifeJacketCount * 7})</td>
            </tr>` : ""}
            ${data.notes ? `
            <tr>
              <td style="padding: 8px 0; color: #999; font-size: 13px;">Notes</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${data.notes}</td>
            </tr>` : ""}
          </table>
        </div>
      </div>
      <div style="background: #f0ece4; padding: 20px 24px; text-align: center;">
        <p style="color: #999; margin: 0; font-size: 12px;">
          Poolside Patrol Reservation System
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Poolside Patrol Bookings" <${fromEmail}>`,
      to: ownerEmail,
      subject: `🏊 New Reservation: ${data.name} - ${data.date} at ${data.time}`,
      html,
    });
    console.log(`[Email] Owner notification sent to ${ownerEmail}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send owner notification:", error);
    return false;
  }
}



/**
 * Send a simple test email.
 */
export async function sendTestEmail(to: string): Promise<boolean> {
  const fromEmail = process.env.GMAIL_USER;
  if (!fromEmail || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("[Email] Gmail credentials not configured");
    return false;
  }

  try {
    await transporter.sendMail({
      from: `"Poolside Patrol" <${fromEmail}>`,
      to,
      subject: "Poolside Patrol - Email System Test",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f5; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a7a6d, #14665b); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Poolside Patrol</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Private Lifeguard Services</p>
          </div>
          <div style="padding: 32px 24px; text-align: center;">
            <div style="width: 64px; height: 64px; background: #e6f7f5; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
              <span style="font-size: 28px;">✅</span>
            </div>
            <h2 style="color: #1a1a1a; margin: 0 0 8px; font-size: 20px;">Email System Working!</h2>
            <p style="color: #666; line-height: 1.6; margin: 0;">
              This is a test email from the Poolside Patrol reservation system. Your email notifications are configured correctly and ready to go!
            </p>
          </div>
          <div style="background: #f0ece4; padding: 20px 24px; text-align: center;">
            <p style="color: #999; margin: 0; font-size: 12px;">
              Poolside Patrol · Flower Mound, TX · Because exceptional moments deserve exceptional safety.
            </p>
          </div>
        </div>
      `,
    });
    console.log(`[Email] Test email sent to ${to}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send test email:", error);
    return false;
  }
}
