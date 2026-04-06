"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, Settings, Clock, Menu, X,
  CheckCircle, CircleDot, Circle, Headset, LogOut,
  Volume2, Moon, Globe, Shield, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profileImages, interviewData } from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { motion, AnimatePresence } from "framer-motion";

interface TopNavBarProps {
  variant: "dashboard" | "interview";
  onExit?: () => void;
  onSupport?: () => void;
}

const dashboardLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reports", href: "/reports" },
  { label: "Candidates", href: "/candidates" },
  { label: "Settings", href: "/settings" },
];

const statusConfig = {
  completed: {
    Icon: CheckCircle,
    fill: true,
    classes: "text-on-surface-variant opacity-60",
    iconClass: "text-secondary",
  },
  active: {
    Icon: CircleDot,
    fill: true,
    classes: "bg-surface-container-high text-primary rounded-lg",
    iconClass: "text-primary",
  },
  pending: {
    Icon: Circle,
    fill: false,
    classes: "text-on-surface-variant hover:bg-surface-bright rounded-lg",
    iconClass: "text-on-surface-variant",
  },
};

/* ─── Notification data ──────────────────────────────────────────────────── */

const notifications = [
  {
    id: "1",
    title: "Interview Complete",
    message: "Your Sr. Architect interview has been analyzed.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: "2",
    title: "New Recommendation",
    message: "AI Coach has new tips for improving communication.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    title: "Weekly Report Ready",
    message: "Your performance summary for this week is available.",
    time: "Yesterday",
    unread: false,
  },
];

/* ─── Settings data ──────────────────────────────────────────────────────── */

const settingsItems = [
  { icon: Volume2, label: "Audio Settings", description: "Microphone & speaker" },
  { icon: Moon, label: "Appearance", description: "Dark mode enabled" },
  { icon: Globe, label: "Language", description: "English (US)" },
  { icon: Shield, label: "Privacy", description: "Data & permissions" },
];

/* ─── Dropdown animation ─────────────────────────────────────────────────── */

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0, y: -8, scale: 0.95,
    transition: { duration: 0.15 },
  },
};

export function TopNavBar({ variant, onExit, onSupport }: TopNavBarProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());

  const notifRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread && !readNotifications.has(n.id)).length;

  const handleNotificationClick = (id: string, title: string) => {
    setReadNotifications((prev) => new Set(prev).add(id));
    toast(`Opened: ${title}`, "info");
    setShowNotifications(false);
  };

  const handleMarkAllRead = () => {
    setReadNotifications(new Set(notifications.map((n) => n.id)));
    toast("All notifications marked as read", "success");
  };

  // Nav links all have real routes now, no need for handleNavClick

  const handleSettingClick = () => {
    setShowSettings(false);
    router.push("/settings");
  };

  if (variant === "interview") {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface flex justify-between items-center w-full px-4 lg:px-8 py-4 border-b border-open lg:border-none border-outline-variant/10">
          <div className="flex items-center gap-3 lg:gap-8">
            <button
              className="lg:hidden p-2 -ml-2 text-on-surface hover:bg-surface-bright rounded-lg"
              onClick={() => setIsMobileDrawerOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link
              href="/dashboard"
              className="text-lg lg:text-xl font-black text-primary tracking-tighter font-headline"
            >
              HireSense
            </Link>
            <div className="h-4 w-px bg-outline-variant/30 hidden md:block" />
            <span className="hidden md:inline font-headline font-bold tracking-tight text-on-surface">
              {interviewData.sessionTitle}
            </span>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="flex items-center gap-1.5 lg:gap-2 bg-surface-variant/40 px-3 lg:px-4 py-1.5 rounded-full">
              <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary" />
              <span className="font-headline font-bold text-xs lg:text-base tracking-tight text-on-surface">
                {interviewData.timer}
              </span>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button
                onClick={() => router.push("/settings")}
                className="hidden sm:flex text-on-surface-variant hover:text-on-surface transition-colors duration-200 p-2 hover:bg-surface-bright rounded-lg"
              >
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden border border-outline-variant/30 ml-2">
                <img
                  src={interviewData.profileImage}
                  alt="User profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Slide-out Drawer */}
        <div
          className={cn(
            "fixed inset-0 bg-black/60 z-[60] lg:hidden transition-opacity duration-300",
            isMobileDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className={cn(
              "absolute top-0 left-0 w-72 h-full bg-surface-container-low border-r border-outline-variant/[0.15] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out pb-safe",
              isMobileDrawerOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="px-6 py-6 flex items-center justify-between border-b border-outline-variant/10 cursor-default pt-safetop">
              <div>
                <h2 className="text-lg font-bold text-on-surface font-headline mb-1">
                  Interview Progress
                </h2>
                <p className="font-body text-sm font-medium text-on-surface-variant">
                  {interviewData.completionPercent}% Completed
                </p>
              </div>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2 bg-surface-container text-on-surface hover:bg-surface-variant rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Nodes */}
            <nav className="flex-1 overflow-y-auto space-y-1 py-4">
              {interviewData.progress.map((step) => {
                const config = statusConfig[step.status as keyof typeof statusConfig];
                const { Icon } = config;
                return (
                  <div
                    key={step.label}
                    className={cn(
                      "flex items-center gap-3 p-3 mx-4 transition-all duration-300 ease-in-out cursor-default",
                      config.classes
                    )}
                  >
                    <Icon
                      className={cn("w-5 h-5", config.iconClass)}
                      fill={config.fill ? "currentColor" : "none"}
                    />
                    <span className="font-body text-sm font-medium">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-6 space-y-4">
              <Button
                variant="secondary"
                size="sm"
                className="w-full uppercase tracking-wider"
                onClick={() => toast("Interview guidelines loaded", "info")}
              >
                View Guidelines
              </Button>
              <div className="border-t border-outline-variant/10 pt-4 space-y-1">
                <div
                  onClick={() => onSupport ? onSupport() : toast("Opening support chat...", "info")}
                  className="flex items-center gap-3 text-on-surface-variant p-2 hover:bg-surface-bright rounded-lg cursor-pointer transition-colors"
                >
                  <Headset className="w-5 h-5" />
                  <span className="text-sm">Support</span>
                </div>
                <div
                  onClick={() => onExit ? onExit() : router.push("/dashboard")}
                  className="flex items-center gap-3 text-on-surface-variant p-2 hover:bg-surface-bright rounded-lg cursor-pointer transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Exit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-surface shadow-[0_0_40px_rgba(25,37,64,0.08)]">
      <Link
        href="/dashboard"
        className="text-2xl font-black tracking-tighter text-on-surface font-headline"
      >
        HireSense
      </Link>
      <nav className="hidden md:flex space-x-8 h-full items-center">
        {dashboardLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "font-headline font-bold tracking-tight transition-colors duration-300 active:scale-95",
                isActive
                  ? "text-on-surface border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-on-surface nav-link-glow"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowSettings(false); }}
              className="relative text-primary cursor-pointer hover:text-on-surface transition-colors p-1"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-10 w-80 bg-surface-container-high border border-outline-variant/15 rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/10">
                    <h3 className="text-sm font-bold text-on-surface font-headline">Notifications</h3>
                    <button
                      onClick={handleMarkAllRead}
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n) => {
                      const isUnread = n.unread && !readNotifications.has(n.id);
                      return (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n.id, n.title)}
                          className={cn(
                            "px-4 py-3 cursor-pointer hover:bg-surface-bright/50 transition-colors border-b border-outline-variant/5 last:border-0",
                            isUnread && "bg-primary/[0.04]"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {isUnread && (
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            )}
                            <div className={!isUnread ? "ml-5" : ""}>
                              <p className="text-sm font-semibold text-on-surface">{n.title}</p>
                              <p className="text-xs text-on-surface-variant mt-0.5">{n.message}</p>
                              <p className="text-[10px] text-on-surface-variant/60 mt-1">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Settings */}
          <div ref={settingsRef} className="relative">
            <button
              onClick={() => { setShowSettings(!showSettings); setShowNotifications(false); }}
              className="text-primary cursor-pointer hover:text-on-surface transition-colors p-1"
            >
              <Settings className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 top-10 w-72 bg-surface-container-high border border-outline-variant/15 rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-outline-variant/10">
                    <h3 className="text-sm font-bold text-on-surface font-headline">Settings</h3>
                  </div>
                  <div>
                    {settingsItems.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => handleSettingClick()}
                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-bright/50 transition-colors border-b border-outline-variant/5 last:border-0"
                      >
                        <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-on-surface">{item.label}</p>
                          <p className="text-xs text-on-surface-variant">{item.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-on-surface-variant/40" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <img
          alt="Recruiter Profile"
          className="w-8 h-8 rounded-full border border-outline-variant/30 object-cover cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all"
          src={profileImages.recruiter}
          onClick={() => router.push("/settings")}
        />
      </div>
    </header>
  );
}
