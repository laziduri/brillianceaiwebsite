"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SERVICE_ITEMS = [
  { label: "AI Sales", href: "/products/sales" },
  { label: "AI Marketing", href: "/products/marketing" },
  { label: "AI Operations", href: "/products/operations" },
] as const;

const ABOUT_ITEMS = [
  { label: "About Us", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
] as const;

const RESOURCE_ITEMS = [
  { label: "AI Library", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQ", href: "/faq" },
] as const;

type NavChild = { label: string; href: string };
type NavLink =
  | { label: string; href: string; children?: undefined }
  | { label: string; href: string; children: readonly NavChild[] };

const NAV_LINKS: readonly NavLink[] = [
  { label: "Services", href: "/services", children: SERVICE_ITEMS },
  { label: "About", href: "/about", children: ABOUT_ITEMS },
  { label: "Resources", href: "/blog", children: RESOURCE_ITEMS },
  { label: "Contact", href: "/contact/sales" },
];

/* ── Dropdown sub-component ── */
function NavDropdown({
  link,
  showAllLink,
}: {
  link: NavLink & { children: readonly NavChild[] };
  showAllLink?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-0.5 px-4 py-2 text-[13px] font-normal text-white/35 hover:text-white/70 transition-colors duration-200 tracking-[-0.01em]"
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-[10000] min-w-[200px] pt-2"
            role="menu"
          >
            <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f]/95 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              {showAllLink && (
                <>
                  <a
                    href={link.href}
                    role="menuitem"
                    className="block px-4 py-2 text-[12px] font-medium tracking-[-0.01em] text-white/50 hover:bg-white/[0.04] hover:text-white/85"
                  >
                    All services
                  </a>
                  <div className="mx-3 my-1 h-px bg-white/[0.06]" />
                </>
              )}
              {link.children.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="block px-4 py-2.5 text-[13px] font-normal tracking-[-0.01em] text-white/70 hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          scrolled
            ? "bg-[#08090a]/80 backdrop-blur-xl border-b border-white/[0.04] py-3"
            : "py-4"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group">
            <Image
              src="/marketing/characters/BRILLIANCE%20AI.png"
              alt="Brilliance AI"
              width={28}
              height={28}
              priority
              className="h-7 w-7 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-[15px] sm:text-[16px] font-semibold tracking-[-0.03em] text-white/85 group-hover:text-white transition-colors">
              BrillianceAI
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <NavDropdown
                  key={link.label}
                  link={link as NavLink & { children: readonly NavChild[] }}
                  showAllLink={link.label === "Services"}
                />
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-[13px] font-normal text-white/35 hover:text-white/70 transition-colors duration-200 tracking-[-0.01em]"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/contact/sales"
              className="px-4 py-2 text-[13px] font-medium text-white/70 bg-white/[0.06] border border-white/[0.08] rounded-lg hover:bg-white/[0.1] hover:border-white/[0.14] transition-all duration-200"
            >
              Request a Demo
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`block w-5 h-[1.5px] bg-white/50 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-white/50 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-white/50 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] bg-[#08090a]/95 backdrop-blur-xl pt-24 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) =>
                link.children ? (
                  <div key={link.label} className="border-b border-white/[0.04] py-2">
                    <motion.a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="block text-xl font-normal text-white/70 hover:text-white/90 py-3 tracking-[-0.02em]"
                    >
                      {link.label}
                    </motion.a>
                    <div className="flex flex-col gap-0.5 pl-1 pb-2">
                      {link.children.map((item, j) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 + 0.04 + j * 0.05 }}
                          className="py-2.5 pl-3 text-[15px] font-normal text-white/45 hover:text-white/80 border-l border-white/[0.08] transition-colors tracking-[-0.01em]"
                        >
                          {item.label}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-xl font-normal text-white/50 hover:text-white/80 py-4 border-b border-white/[0.04] transition-colors tracking-[-0.02em]"
                  >
                    {link.label}
                  </motion.a>
                ),
              )}
              <motion.a
                href="/contact/sales"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="btn-primary text-center mt-6"
              >
                <span>Request a Demo</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
