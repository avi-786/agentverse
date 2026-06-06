import Link from "next/link";
import { Zap, Twitter, Github, Linkedin } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Pricing", href: "/marketplace" },
    { label: "Changelog", href: "/blog" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Guides", href: "/blog?category=Guides" },
    { label: "Documentation", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/about" },
    { label: "Privacy", href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-white text-xl">
                Agent<span className="text-primary-light">Verse</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              The marketplace for production-ready AI agents. Build less, deploy more.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm mb-4">{section}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-muted hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} AgentVerse. All rights reserved.
          </p>
          <p className="text-text-muted text-sm">Built in the AI-first era.</p>
        </div>
      </div>
    </footer>
  );
}
