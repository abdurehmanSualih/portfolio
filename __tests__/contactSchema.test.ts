import { z } from "zod";

// Mirror the schema from ContactSection
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  message: z.string().trim().min(1, "Message is required"),
});

describe("contactSchema validation", () => {
  it("accepts valid input", () => {
    const result = contactSchema.safeParse({
      name: "Alice",
      email: "alice@example.com",
      message: "Hello there",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = contactSchema.safeParse({ name: "", email: "a@b.com", message: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only name (after trim)", () => {
    const result = contactSchema.safeParse({ name: "   ", email: "a@b.com", message: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = contactSchema.safeParse({ name: "Bob", email: "", message: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email format", () => {
    const result = contactSchema.safeParse({ name: "Bob", email: "not-an-email", message: "Hi" });
    expect(result.success).toBe(false);
  });

  it("rejects empty message", () => {
    const result = contactSchema.safeParse({ name: "Bob", email: "b@b.com", message: "" });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only message (after trim)", () => {
    const result = contactSchema.safeParse({ name: "Bob", email: "b@b.com", message: "   " });
    expect(result.success).toBe(false);
  });
});
