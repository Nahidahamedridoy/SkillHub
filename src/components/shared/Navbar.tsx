"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuLayoutDashboard,
  LuBookOpen,
  LuUser,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";

// ─── Temporary auth state ────────────────────────────────────────────────────
// Replace this with your real auth hook (e.g. useSession, useAuth, etc.)
const isLoggedIn = false;

// ─── Mock user ───────────────────────────────────────────────────────────────
const mockUser = {
  name: "Jane Doe",
  email: "jane@skillhub.com",
  avatarSrc: "", // set a URL to show a real image
};
// ─────────────────────────────────────────────────────────────────────────────

const Logo = () => (
  <div className="flex items-center gap-2.5 group">
    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/30">
      <svg
        className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    </div>
    <span className="text-xl font-bold tracking-tight text-foreground">
      Skill<span className="text-primary group-hover:text-secondary transition-colors duration-300">Hub</span>
    </span>
  </div>
);

interface HamburgerIconProps {
  isOpen: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen }) => (
  <div className="relative w-6 h-6">
    <span
      className={`absolute left-0 h-[2px] w-6 bg-foreground rounded-lg transition-all duration-300 ${
        isOpen ? "rotate-45 top-3" : "top-[5px]"
      }`}
    />
    <span
      className={`absolute left-0 top-[11px] h-[2px] w-6 bg-foreground rounded-lg transition-all duration-300 ${
        isOpen ? "opacity-0 scale-x-0" : "opacity-100"
      }`}
    />
    <span
      className={`absolute left-0 h-[2px] w-6 bg-foreground rounded-lg transition-all duration-300 ${
        isOpen ? "-rotate-45 top-3" : "top-[17px]"
      }`}
    />
  </div>
);

// ─── Dropdown menu items ──────────────────────────────────────────────────────
interface UserMenuItem {
  id: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
  isDanger?: boolean;
}

const userMenuItems: UserMenuItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: <LuLayoutDashboard size={16} /> },
  { id: "my-courses", label: "My Courses", href: "/courses/my", icon: <LuBookOpen size={16} /> },
  { id: "profile", label: "Profile", href: "/profile", icon: <LuUser size={16} /> },
  { id: "settings", label: "Settings", href: "/settings", icon: <LuSettings size={16} /> },
  { id: "logout", label: "Logout", icon: <LuLogOut size={16} />, isDanger: true },
];

// ─── UserMenu ─────────────────────────────────────────────────────────────────
function UserMenu() {
  const router = useRouter();

  const handleAction = (id: string) => {
    if (id === "logout") {
      // TODO: call your logout handler here
      console.log("Logout triggered");
      return;
    }
    const item = userMenuItems.find((i) => i.id === id);
    if (item?.href) router.push(item.href);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button
          aria-label="Open user menu"
          className="rounded-full ring-2 ring-transparent hover:ring-primary/40 focus:ring-primary/60 transition-all duration-200 outline-none"
        >
          <Avatar
            size="sm"
            color="accent"
            className="cursor-pointer"
          >
            <Avatar.Image src={mockUser.avatarSrc} alt={mockUser.name} />
            <Avatar.Fallback>
              {mockUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </Avatar.Fallback>
          </Avatar>
        </button>
      </Dropdown.Trigger>

      <Dropdown.Popover className="w-56">
        {/* User info header */}
        <div className="px-3 py-3 border-b border-default-100">
          <p className="text-sm font-semibold text-foreground truncate">{mockUser.name}</p>
          <p className="text-xs text-foreground-400 truncate">{mockUser.email}</p>
        </div>

        <Dropdown.Menu onAction={handleAction} aria-label="User menu">
          {userMenuItems.map((item) => (
            <Dropdown.Item
              key={item.id}
              id={item.id}
              textValue={item.label}
              className={
                item.isDanger
                  ? "text-danger focus:bg-danger/10 data-[focused]:bg-danger/10"
                  : "focus:bg-default-100 data-[focused]:bg-default-100"
              }
            >
              <span className="flex items-center gap-2.5">
                <span className={item.isDanger ? "text-danger" : "text-foreground-500"}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

// ─── Auth buttons (guest) ─────────────────────────────────────────────────────
function AuthButtons({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link href="/login" onClick={onNavigate}>
        <Button
          variant="ghost"
          className="text-sm font-medium text-foreground-600 hover:text-foreground hover:bg-default-100 border-none transition-all"
        >
          Login
        </Button>
      </Link>
      <Link href="/register" onClick={onNavigate}>
        <Button className="bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
          Register
        </Button>
      </Link>
    </>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-default-100/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-1 text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-foreground-600"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabUnderline"
                      className="absolute -bottom-[21px] left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Area */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <AuthButtons />
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex md:hidden items-center justify-center p-2 rounded-lg hover:bg-default-100 transition-colors focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-default-100/50 bg-background"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {menuItems.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-lg font-medium block py-2 transition-colors ${
                        isActive
                          ? "text-primary font-bold"
                          : "text-foreground-600 hover:text-primary"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Auth Area */}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-default-100/50">
                {isLoggedIn ? (
                  // Mobile: show user info + menu items inline
                  <>
                    <div className="flex items-center gap-3 pb-3 border-b border-default-100/50">
                      <Avatar size="sm" color="accent">
                        <Avatar.Image src={mockUser.avatarSrc} alt={mockUser.name} />
                        <Avatar.Fallback>
                          {mockUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{mockUser.name}</p>
                        <p className="text-xs text-foreground-400">{mockUser.email}</p>
                      </div>
                    </div>
                    {userMenuItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: (menuItems.length + index) * 0.05 }}
                      >
                        {item.href ? (
                          <Link
                            href={item.href}
                            className={`flex items-center gap-3 py-2 text-base font-medium transition-colors ${
                              item.isDanger
                                ? "text-danger hover:text-danger/80"
                                : "text-foreground-600 hover:text-primary"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            className="flex items-center gap-3 py-2 text-base font-medium text-danger hover:text-danger/80 transition-colors w-full text-left"
                            onClick={() => {
                              setIsMenuOpen(false);
                              console.log("Logout triggered");
                            }}
                          >
                            {item.icon}
                            {item.label}
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </>
                ) : (
                  <>
                    <Link href="/login" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full font-medium py-6 text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-6 text-base shadow-md shadow-primary/20"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
