"use client";

import { useState } from "react";
import {
  User, Bell, Moon, Globe, Shield, Link2,
  Calendar, MessageSquare, Database, ExternalLink,
  Save, ChevronRight,
} from "lucide-react";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { PageTransition } from "@/components/motion/PageTransition";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  StaggerContainer,
  FadeInUp,
} from "@/components/motion/MotionPrimitives";
import { settingsData } from "@/data/mockData";
import { FloatingChatButton } from "@/components/dashboard/FloatingChatButton";

const integrationIcons: Record<string, React.ElementType> = {
  Calendar,
  MessageSquare,
  ExternalLink,
  Database,
};

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-surface-container-highest"
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [prefs, setPrefs] = useState(settingsData.preferences);
  const [integrations, setIntegrations] = useState(settingsData.integrations);

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const toggleIntegration = (index: number) => {
    setIntegrations((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, connected: !item.connected } : item
      )
    );
    const name = integrations[index].name;
    const willConnect = !integrations[index].connected;
    toast(willConnect ? `${name} connected successfully` : `${name} disconnected`, willConnect ? "success" : "info");
  };

  const handleSave = () => {
    toast("Settings saved successfully!", "success");
  };

  return (
    <PageTransition>
      <TopNavBar variant="dashboard" />
      <main className="max-w-4xl mx-auto pt-24 px-8 pb-12">
        <StaggerContainer delayStart={0.05} staggerInterval={0.08}>
          {/* Header */}
          <FadeInUp>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-3xl font-black font-headline text-on-surface tracking-tight">
                  Settings
                </h1>
                <p className="text-on-surface-variant mt-2 text-lg">
                  Manage your account, preferences, and integrations.
                </p>
              </div>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </FadeInUp>

          {/* Profile Section */}
          <FadeInUp>
            <div className="bg-surface-container-low rounded-2xl p-6 mb-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold font-headline text-on-surface">Profile</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(settingsData.profile).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold block mb-1.5">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <input
                      type="text"
                      defaultValue={value}
                      className="w-full bg-surface-container-highest/60 text-on-surface text-sm rounded-xl px-4 py-2.5 border border-outline-variant/10 focus:outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Notifications Section */}
          <FadeInUp>
            <div className="bg-surface-container-low rounded-2xl p-6 mb-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold font-headline text-on-surface">Notifications</h2>
              </div>
              <div className="space-y-4">
                {[
                  { key: "emailNotifications" as const, label: "Email Notifications", desc: "Receive interview summaries via email" },
                  { key: "interviewReminders" as const, label: "Interview Reminders", desc: "Get reminded 15 min before scheduled interviews" },
                  { key: "weeklyDigest" as const, label: "Weekly Digest", desc: "Summary of your weekly performance" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{item.label}</p>
                      <p className="text-xs text-on-surface-variant">{item.desc}</p>
                    </div>
                    <Toggle checked={prefs[item.key] as boolean} onChange={() => togglePref(item.key)} />
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Preferences */}
          <FadeInUp>
            <div className="bg-surface-container-low rounded-2xl p-6 mb-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <Moon className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold font-headline text-on-surface">Preferences</h2>
              </div>
              <div className="space-y-4">
                {[
                  { key: "darkMode" as const, label: "Dark Mode", desc: "Use dark theme across the application", icon: Moon },
                  { key: "soundEffects" as const, label: "Sound Effects", desc: "Play sounds for notifications and events", icon: Bell },
                  { key: "autoSave" as const, label: "Auto-Save", desc: "Automatically save interview progress", icon: Save },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-on-surface-variant" />
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{item.label}</p>
                        <p className="text-xs text-on-surface-variant">{item.desc}</p>
                      </div>
                    </div>
                    <Toggle checked={prefs[item.key] as boolean} onChange={() => togglePref(item.key)} />
                  </div>
                ))}

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-on-surface-variant" />
                    <div>
                      <p className="text-sm font-semibold text-on-surface">Language</p>
                      <p className="text-xs text-on-surface-variant">{prefs.language}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Integrations */}
          <FadeInUp>
            <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <Link2 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold font-headline text-on-surface">Integrations</h2>
              </div>
              <div className="space-y-3">
                {integrations.map((item, i) => {
                  const Icon = integrationIcons[item.icon] || Database;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 bg-surface-container-high/50 rounded-xl border border-outline-variant/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">{item.name}</p>
                          <p className="text-xs text-on-surface-variant">
                            {item.connected ? "Connected" : "Not connected"}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={item.connected ? "ghost" : "secondary"}
                        size="sm"
                        onClick={() => toggleIntegration(i)}
                      >
                        {item.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeInUp>
        </StaggerContainer>
      </main>
      <FloatingChatButton />
    </PageTransition>
  );
}
