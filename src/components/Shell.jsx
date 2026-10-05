import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Activity, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  RotateCcw,
  Menu,
  X
} from 'lucide-react';

export function Shell({
  children,
  activeScreen,
  setActiveScreen,
  isProtected,
  setIsProtected,
  isFinalState,
  setIsFinalState,
  onResetAll
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'outbound', label: 'Outbound Shield', icon: ArrowUpRight },
    { id: 'inbound', label: 'Inbound Shield', icon: ArrowDownLeft, badge: 'Hero' },
    { id: 'sentinel', label: 'Sentinel', icon: Activity },
    { id: 'audit', label: 'Audit log', icon: FileText },
    { id: 'results', label: 'Results', icon: CheckCircle2 },
  ];

  const handleNavClick = (id) => {
    setActiveScreen(id);
    setMobileNavOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-paper text-ink font-sans">
      {/* Desktop Sidebar - Fixed 220px width */}
      <aside className="hidden md:flex w-[220px] shrink-0 bg-surface border-r border-rule flex-col justify-between select-none z-20">
        <div>
          {/* Brand Wordmark with Shield SVG Glyph */}
          <div className="p-4 border-b border-rule flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-ink text-surface flex items-center justify-center font-bold">
              <svg 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 2v20" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.6" />
              </svg>
            </div>
            <div>
              <span className="font-heading font-bold text-base tracking-tight text-ink block leading-none">
                AgentShield
              </span>
              <span className="text-[10px] text-ink-soft font-mono uppercase tracking-wider block mt-0.5">
                Trust Boundary
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-ink text-surface font-semibold shadow-xs'
                      : 'text-ink-soft hover:bg-paper hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-surface' : 'text-ink-soft'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && !isActive && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-paper text-ink-soft rounded border border-rule">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Sentinel Heartbeat & Status */}
        <div className="p-3 border-t border-rule bg-surface">
          <div className="flex items-center justify-between px-2 py-1.5 rounded bg-paper/60 border border-rule/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-allow opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-allow"></span>
              </span>
              <span className="text-[11px] font-medium text-ink">Sentinel heartbeat</span>
            </div>
            <span className="font-mono text-[10px] font-semibold text-allow bg-allow/10 px-1 py-0.5 rounded">
              OK
            </span>
          </div>
          <div className="mt-2 text-[10px] text-ink-soft text-center font-mono">
            Boundary Engine v2.4.1
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-ink/50 md:hidden" onClick={() => setMobileNavOpen(false)}>
          <div 
            className="w-[260px] bg-surface h-full p-4 flex flex-col justify-between" 
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rule">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-ink text-surface flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-surface" />
                  </div>
                  <span className="font-heading font-bold text-sm text-ink">AgentShield</span>
                </div>
                <button onClick={() => setMobileNavOpen(false)} className="p-1 text-ink-soft">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium ${
                        isActive ? 'bg-ink text-surface font-semibold' : 'text-ink hover:bg-paper'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-paper text-ink-soft rounded border">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-3 border-t border-rule text-xs text-ink-soft font-mono">
              Sentinel heartbeat: <strong className="text-allow">OK</strong>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-14 bg-surface border-b border-rule px-4 md:px-6 flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-1.5 text-ink-soft hover:text-ink rounded border border-rule"
            >
              <Menu className="w-4 h-4" />
            </button>

            <span className="font-heading font-semibold text-sm text-ink">
              {navItems.find((i) => i.id === activeScreen)?.label}
            </span>
            <span className="text-rule hidden sm:inline">/</span>
            <span className="text-xs text-ink-soft font-mono hidden sm:inline">
              Boundary: <strong className="text-ink font-semibold font-mono">STRICT_PROVENANCE</strong>
            </span>
          </div>

          {/* Right Header Actions: Protection Toggle & Deck Mode */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick State Switcher for Screenshots */}
            <div className="flex items-center gap-1.5 bg-paper px-2 py-1 rounded border border-rule">
              <span className="text-[11px] text-ink-soft font-mono hidden sm:inline">Deck mode:</span>
              <button
                onClick={() => setIsFinalState(!isFinalState)}
                className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all font-semibold ${
                  isFinalState
                    ? 'bg-ink text-surface shadow-xs'
                    : 'bg-surface text-ink-soft hover:text-ink border border-rule'
                }`}
                title="Toggle screenshot-ready state (?state=final)"
              >
                {isFinalState ? 'Final State' : 'Interactive'}
              </button>
              <button
                onClick={onResetAll}
                className="text-[10px] text-ink-soft hover:text-ink p-0.5"
                title="Reset screen scenario"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Vertical Divider */}
            <div className="h-5 w-px bg-rule hidden sm:block"></div>

            {/* Global Protection Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-ink-soft hidden sm:inline">Protection</span>
              <button
                type="button"
                role="switch"
                aria-checked={isProtected}
                onClick={() => setIsProtected(!isProtected)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-1 ${
                  isProtected ? 'bg-allow' : 'bg-block'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-surface shadow-md ring-0 transition duration-200 ease-in-out ${
                    isProtected ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>

              {/* Protection Status Pill */}
              {isProtected ? (
                <span className="status-pill status-pill-allow">
                  <ShieldCheck className="w-3 h-3 text-allow" />
                  <span className="hidden sm:inline">Protected</span>
                </span>
              ) : (
                <span className="status-pill status-pill-block">
                  <ShieldAlert className="w-3 h-3 text-block" />
                  <span className="hidden sm:inline">Unprotected</span>
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Screen View Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1440px] w-full mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
