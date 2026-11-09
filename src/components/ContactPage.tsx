"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

const FIELDS = {
  name: {
    id: "full-name",
    label: "Full Name",
    placeholder: "John doe",
    type: "text",
    autoComplete: "name",
  },
  number: {
    id: "number",
    label: "Number",
    placeholder: "+44.......",
    type: "tel",
    autoComplete: "tel",
  },
  email: {
    id: "email",
    label: "Email",
    placeholder: "yourname@gmail.com",
    type: "email",
    autoComplete: "email",
  },
  message: {
    id: "message",
    label: "Message",
    placeholder: "I want to develop my website......",
  },
} as const;

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-[family-name:var(--font-vina-sans)] text-[20px] leading-5 tracking-[0.02em] text-accent-bright sm:text-[24px]"
    >
      {children}
    </label>
  );
}

const inputClassName =
  "w-full border border-solid border-ink bg-background px-4 py-2.5 font-[family-name:var(--font-gugi)] text-[15px] leading-6 tracking-[0.02em] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-accent-bright focus:shadow-[0_0_0_1px_#ff7340]";

export function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("full-name") ?? "").trim();
    const number = String(data.get("number") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(
      name ? `Project inquiry from ${name}` : "Project inquiry",
    );
    const body = encodeURIComponent(
      [
        name ? `Name: ${name}` : null,
        number ? `Number: ${number}` : null,
        email ? `Email: ${email}` : null,
        "",
        message || "I want to develop my website......",
      ]
        .filter((line) => line !== null)
        .join("\n"),
    );

    window.location.href = `mailto:mdmasumahmed4800@gmail.com?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-background">
        <section
          className="mx-auto w-full max-w-[1920px] px-4 pt-8 pb-10 sm:px-6 sm:pt-12 md:px-[50px] md:pt-[100px] md:pb-16"
          aria-label="Contact"
        >
          <div className="mx-auto flex w-full max-w-[1820px] flex-col gap-8 sm:gap-10 md:gap-10">
            {/* Intro */}
            <div className="flex flex-col justify-center border border-solid border-ink px-4 py-8 sm:px-5 sm:py-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                <h1 className="min-w-0 font-[family-name:var(--font-vina-sans)] text-[clamp(40px,7vw,100px)] leading-[0.95] uppercase text-ink sm:leading-[1.08]">
                  <span className="block">Let&apos;s build something</span>
                  <span className="block text-accent-bright">extraordinary.</span>
                </h1>
                <p className="w-full max-w-[697px] shrink-0 font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty text-ink sm:text-[20px] sm:leading-8 lg:pb-1">
                  I am currently open to full-time roles and selected freelance
                  projects. If you are building something worth building, I
                  would like to hear about it.
                </p>
              </div>
            </div>

            {/* Visual + form */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
              <div className="flex w-full items-center justify-center border border-solid border-ink p-4 sm:p-5 lg:min-h-[580px] lg:flex-1">
                <div className="relative aspect-[890/516] w-full overflow-hidden bg-strong">
                  <Image
                    src="/contact/visual.jpg"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-8 border border-solid border-ink px-4 py-5 sm:gap-10 sm:px-4 sm:py-5 lg:flex-1"
                noValidate
              >
                <div className="flex flex-col gap-2.5">
                  <FieldLabel htmlFor={FIELDS.name.id}>
                    {FIELDS.name.label}
                  </FieldLabel>
                  <input
                    id={FIELDS.name.id}
                    name={FIELDS.name.id}
                    type={FIELDS.name.type}
                    autoComplete={FIELDS.name.autoComplete}
                    placeholder={FIELDS.name.placeholder}
                    required
                    className={`${inputClassName} h-[52px] sm:h-[60px]`}
                  />
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
                  <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                    <FieldLabel htmlFor={FIELDS.number.id}>
                      {FIELDS.number.label}
                    </FieldLabel>
                    <input
                      id={FIELDS.number.id}
                      name={FIELDS.number.id}
                      type={FIELDS.number.type}
                      autoComplete={FIELDS.number.autoComplete}
                      placeholder={FIELDS.number.placeholder}
                      className={`${inputClassName} h-[52px] sm:h-[60px]`}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                    <FieldLabel htmlFor={FIELDS.email.id}>
                      {FIELDS.email.label}
                    </FieldLabel>
                    <input
                      id={FIELDS.email.id}
                      name={FIELDS.email.id}
                      type={FIELDS.email.type}
                      autoComplete={FIELDS.email.autoComplete}
                      placeholder={FIELDS.email.placeholder}
                      required
                      className={`${inputClassName} h-[52px] sm:h-[60px]`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <FieldLabel htmlFor={FIELDS.message.id}>
                    {FIELDS.message.label}
                  </FieldLabel>
                  <textarea
                    id={FIELDS.message.id}
                    name={FIELDS.message.id}
                    placeholder={FIELDS.message.placeholder}
                    required
                    rows={5}
                    className={`${inputClassName} min-h-[140px] resize-y sm:min-h-[150px]`}
                  />
                </div>

                <button
                  type="submit"
                  className="group flex h-[52px] w-full items-center justify-center gap-1 bg-accent-bright px-4 py-2.5 transition-colors duration-300 hover:bg-strong sm:h-[60px]"
                >
                  <span className="flex size-5 items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/contact/icon-submit.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="max-w-none"
                    />
                  </span>
                  <span className="font-[family-name:var(--font-vina-sans)] text-[20px] leading-7 tracking-[0.02em] text-white sm:text-[22px]">
                    {status === "sent" ? "OPENING MAIL…" : "SUBMIT"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
