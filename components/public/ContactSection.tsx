"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/yourusername",
    color: "hover:text-white",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    color: "hover:text-sky-400",
  },
  {
    icon: FaTelegram,
    label: "Telegram",
    href: "https://t.me/yourusername",
    color: "hover:text-sky-400",
  },
];

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    // MVP: show a success toast (wire to email service later)
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Message sent! I'll get back to you soon.");
    reset();
  }

  return (
    <section id="contact" className="bg-dark-bg py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <h2 className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl">
            Get In{" "}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="mx-auto mb-14 max-w-xl text-center text-gray-400">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-5"
              aria-label="Contact form"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  {...register("name")}
                  className="w-full rounded-xl border border-dark-border bg-dark-surface px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className="w-full rounded-xl border border-dark-border bg-dark-surface px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  {...register("message")}
                  className="w-full resize-none rounded-xl border border-dark-border bg-dark-surface px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-primary-500 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-primary-600 hover:shadow-primary-500/30 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </form>

            {/* Social links + WhatsApp */}
            <div className="flex flex-col justify-center gap-8">
              <div>
                <h3 className="mb-5 text-lg font-semibold text-white">Connect with me</h3>
                <div className="flex gap-5">
                  {socialLinks.map(({ icon: Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`text-2xl text-gray-400 transition-colors ${color}`}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 text-sm text-gray-400">
                  Prefer a quick chat? Reach out directly on WhatsApp.
                </p>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-6 py-3 text-sm font-semibold text-green-400 transition-all hover:bg-green-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                >
                  <FaWhatsapp className="text-lg" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
