"use server";

import { projectTypes } from "@/data/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};


const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();

  // Honeypot: real visitors never fill this hidden field
  if (field("website")) return { status: "success", message: "Thanks! We'll be in touch soon." };

  const name = field("name").slice(0, 120);
  const email = field("email").slice(0, 200);
  const company = field("company").slice(0, 200);
  const type = field("type");
  const message = field("message").slice(0, 5000);

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please check the form." };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Nether Ninjas Website <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return { status: "error", message: "The contact form isn't set up yet. Please try again later." };
  }

  const projectType = projectTypes.includes(type as (typeof projectTypes)[number]) ? type : "Other";
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Company / Organization", company || "—"],
    ["Project type", projectType],
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New ${projectType} inquiry from ${name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
      html: `${rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escape(v)}</p>`).join("")}<p>${escape(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend error", res.status, await res.text());
    return { status: "error", message: "Something went wrong sending your message. Please try again." };
  }

  return { status: "success", message: "Message sent! The ninjas will get back to you soon." };
}
