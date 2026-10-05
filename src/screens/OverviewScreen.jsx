import React from 'react';
import { 
  OVERVIEW_METRICS 
} from '../data/mockData';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  FileLock2, 
  Ban, 
  Radio, 
  AlertCircle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export function OverviewScreen({ isFinalState }) {
  const { 
    promptsAnalyzed, 
    sensitiveAttempts, 
    autoSanitized, 
    blocked, 
    agentAttacksStopped, 
    agentsContained,
    topRisks,
    trend14Days
  } = OVERVIEW_METRICS;

  const statCards = [
    { 
      label: 'Prompts analyzed', 
      value: promptsAnalyzed, 
      sub: 'Last 30 days throughput', 
      tone: 'neutral',
      badge: '99.98% uptime'
    },
    { 
      label: 'Sensitive attempts', 
      value: sensitiveAttempts, 
      sub: '3.26% total prompt traffic', 
      tone: 'neutral',
      badge: 'Outbound trigger'
    },
    { 
      label: 'Auto-sanitized', 
      value: autoSanitized, 
      sub: 'Tokenized at local boundary', 
      tone: 'allow',
      badge: 'Reversible tokens'
    },
    { 
      label: 'Blocked', 
      value: blocked, 
      sub: 'Critical policy violations', 
      tone: 'block',
      badge: 'Zero leakage'
    },
    { 
      label: 'Agent attacks stopped', 
      value: agentAttacksStopped, 
      sub: 'Prompt injections & poisoning', 
      tone: 'block',
      badge: 'IntentLock active'
    },
    { 
      label: 'Agents contained', 
      value: agentsContained, 
      sub: 'Drifting sessions quarantined', 
      tone: 'hold',
      badge: 'Graduated ladder'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-ink tracking-tight">
            Data exposure and boundary telemetry
          </h1>
          <p className="text-ink-soft text-sm mt-1 max-w-2xl">
            Real-time enforcement metrics across outbound user prompts and inbound autonomous agent execution boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="status-pill status-pill-allow text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-allow"></span>
            Dual-direction boundary live
          </span>
        </div>
      </div>

      {/* Headline Metric Grid (6 cards with distinct roles) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3.5">
        {statCards.map((stat, idx) => {
          let valueColor = 'text-ink';
          let borderAccent = 'border-rule';
          let bgStyle = 'bg-surface';

          if (stat.tone === 'allow') {
            valueColor = 'text-allow';
            borderAccent = 'border-allow/30';
          } else if (stat.tone === 'block') {
            valueColor = 'text-block';
            borderAccent = 'border-block/30';
          } else if (stat.tone === 'hold') {
            valueColor = 'text-hold';
            borderAccent = 'border-hold/35';
          }

          return (
            <div 
              key={idx} 
              className={`panel-bordered p-4 flex flex-col justify-between ${borderAccent} ${bgStyle}`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-medium text-ink-soft line-clamp-1">
                    {stat.label}
                  </span>
                </div>
                <div className={`font-heading font-bold text-2xl lg:text-3xl ${valueColor} tracking-tight`}>
                  {stat.value}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-rule/50">
                <span className="text-[10px] font-mono text-ink-soft block leading-snug">
                  {stat.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row: 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left chart (7 cols): 14-day timeline */}
        <div className="lg:col-span-7 panel-bordered p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div>
                <h2 className="font-heading font-semibold text-base text-ink">
                  14-day boundary activity trend
                </h2>
                <p className="text-xs text-ink-soft mt-0.5">
                  Comparison of sensitive attempts vs auto-sanitized completions and stopped attacks
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-ink-soft">
                  <span className="w-2.5 h-2.5 rounded-sm bg-ink"></span> Attempts
                </span>
                <span className="flex items-center gap-1.5 text-allow">
                  <span className="w-2.5 h-2.5 rounded-sm bg-allow"></span> Sanitized
                </span>
                <span className="flex items-center gap-1.5 text-block">
                  <span className="w-2.5 h-2.5 rounded-sm bg-block"></span> Attacks
                </span>
              </div>
            </div>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend14Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="attemptsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14233A" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#14233A" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="sanitizedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0E7C66" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0E7C66" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="day" 
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD3DD' }} 
                    tick={{ fill: '#5B6B80', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
                  />
                  <YAxis 
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD3DD' }} 
                    tick={{ fill: '#5B6B80', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#14233A', 
                      borderRadius: '6px', 
                      border: 'none', 
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontFamily: 'IBM Plex Sans'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attempts" 
                    stroke="#14233A" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#attemptsGrad)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sanitized" 
                    stroke="#0E7C66" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#sanitizedGrad)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attacks" 
                    stroke="#C8321E" 
                    strokeWidth={2} 
                    fill="transparent" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-rule/60 flex items-center justify-between text-xs text-ink-soft">
            <span>Peak detection: Day 12 (52 sensitive attempts intercepted)</span>
            <span className="font-mono text-[11px] text-ink">Tokenization latency: 1.4 ms avg</span>
          </div>
        </div>

        {/* Right chart (5 cols): Top risk categories breakdown */}
        <div className="lg:col-span-5 panel-bordered p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div>
                <h2 className="font-heading font-semibold text-base text-ink">
                  Top sensitive risks intercepted
                </h2>
                <p className="text-xs text-ink-soft mt-0.5">
                  Volume breakdown by sensitivity classification
                </p>
              </div>
              <span className="text-[11px] font-mono text-ink-soft bg-paper px-2 py-0.5 rounded border border-rule">
                419 Total
              </span>
            </div>

            {/* Custom Horizontal Bar Stack */}
            <div className="space-y-3.5 mt-4">
              {topRisks.map((risk, index) => {
                const maxCount = 143;
                const widthPct = Math.round((risk.count / maxCount) * 100);

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-ink flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          index === 0 ? 'bg-block' : index === 1 ? 'bg-hold' : 'bg-ink'
                        }`}></span>
                        {risk.category}
                      </span>
                      <span className="font-mono text-ink-soft font-semibold">
                        {risk.count} <span className="font-normal text-[10px] text-ink-soft/70">({risk.pct}%)</span>
                      </span>
                    </div>

                    {/* Bar track */}
                    <div className="w-full bg-paper h-2 rounded overflow-hidden border border-rule/40">
                      <div 
                        className={`h-full rounded transition-all duration-500 ${
                          index === 0 ? 'bg-block' : index === 1 ? 'bg-hold' : 'bg-ink'
                        }`}
                        style={{ width: `${widthPct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rule/60 text-xs text-ink-soft flex items-center justify-between">
            <span>Critical credentials: 34.1% of all detections</span>
            <span className="text-block font-medium font-mono text-[11px]">Zero leaks to model</span>
          </div>
        </div>
      </div>

      {/* Flat tinted band: Zero-trust architecture highlight & Mandatory Privacy Note */}
      <div className="panel-flat p-4 md:p-5 border border-rule flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded bg-surface border border-rule flex items-center justify-center shrink-0 mt-0.5 text-ink">
            <Lock className="w-4 h-4 text-ink" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-semibold text-sm text-ink">
                Zero-Knowledge Administrative Privacy Guarantee
              </span>
              <span className="status-pill status-pill-allow text-[10px] py-0.5">Enforced</span>
            </div>
            {/* Visible privacy note strictly conforming to prompt Section 5.1 */}
            <p className="text-xs text-ink font-medium mt-1">
              "Admins see risk categories and counts, never raw prompts."
            </p>
            <p className="text-[11px] text-ink-soft mt-0.5">
              All reversible tokenization and secret replacements are computed locally within the client boundary.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-ink-soft bg-surface px-3 py-1.5 rounded border border-rule">
          <span className="w-2 h-2 rounded-full bg-allow"></span>
          <span>Hash chain verification: 100% Intact</span>
        </div>
      </div>
    </div>
  );
}
