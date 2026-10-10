import type { Metadata } from "next";

import { Star } from "@/components/Decorations";
import { ChatIcon, HandshakeIcon, MailIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site, socials } from "@/data/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have an idea, project or collaboration in mind? We'd love to hear about it.",
};

const reasons = [
  { title: "Business inquiries", text: "Custom Realms, Marketplace or Education projects.", icon: <MailIcon />, color: "bg-ninja-300" },
  { title: "Partnerships", text: "Publishers, brands, schools and creators.", icon: <HandshakeIcon />, color: "bg-sun" },
  { title: "General inquiries", text: "Questions, feedback or just saying hi.", icon: <ChatIcon />, color: "bg-mint" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something awesome."
        text="Have an idea, project or collaboration in mind? We'd love to hear about it."
      />
      <section className="bg-dots px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="relative rounded-[2.5rem] border-[3px] border-ink bg-tint p-6 shadow-pop-lg sm:p-10">
              <Star className="absolute -top-6 -right-4 h-12 w-12 animate-float text-sun" />
              <h2 className="mb-8 text-3xl font-bold uppercase sm:text-4xl">Send us a message</h2>
              <ContactForm />
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 100}>
                <div className="flex gap-5 rounded-[2rem] border-[3px] border-ink bg-surface p-6 shadow-pop transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1">
                  <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl border-[3px] border-ink ${r.color}`}>
                    {r.icon}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold uppercase">{r.title}</h3>
                    <p className="mt-1 text-fg/75">{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <div className="rounded-[2rem] border-[3px] border-ink bg-ninja-500 p-6 text-white shadow-pop">
                <h3 className="text-2xl font-bold uppercase">Find us online</h3>
                {site.email && (
                  <p className="mt-2">
                    <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">
                      {site.email}
                    </a>
                  </p>
                )}
                {socials.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-full border-[3px] border-ink bg-surface px-4 py-2 font-display font-bold text-fg shadow-pop-sm transition-transform hover:-translate-y-0.5"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-ninja-50">Discord and social channels coming soon!</p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
