// utils/sendMail.ts
import { Resend } from "resend";
import { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendMailOptions {
  to: string | string[]; // Supports single or multiple email addresses
  subject: string;
  emailTemplate: ReactElement; // Pass any rendered template component here
}

const sendMail = async ({
  to,
  subject,
  emailTemplate,
}: SendMailOptions): Promise<void> => {
  const { error } = await resend.emails.send({
    from: "SwaLay India <swalay.care@talantoncore.in>",
    to: Array.isArray(to) ? to : [to],
    subject,
    react: emailTemplate,
  });

  if (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error}`);
  }
};

export default sendMail;
