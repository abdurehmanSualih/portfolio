import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

const socialLinks = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/abdurehmanSualih",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdurehman-sualih-769b79307",
  },
  {
    icon: FaTelegram,
    label: "Telegram",
    href: "https://t.me/Abdurehman01",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border bg-dark-surface py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* Copyright */}
        <p className="text-sm text-gray-500">
          &copy; {year}{" "}
          <span className="text-gray-400">Abdurehman Sualih</span>. All rights reserved.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-xl text-gray-500 transition-colors hover:text-white"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
