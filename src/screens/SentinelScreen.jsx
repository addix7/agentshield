import React, { useState, useEffect } from 'react';
import { 
  SENTINEL_RISK_TIMELINE, 
  SENTINEL_SIGNALS, 
  SENTINEL_LADDER, 
  REHAB_STEPS 
} from '../data/mockData';
import { 
  Activity, 
  ShieldAlert, 
  ShieldCheck, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertOctagon, 
  Sliders, 
  Layers, 
  Cpu, 
  Flame, 
  GitBranch,
  Shield,
  FileCode2,
  RefreshCcw,
  Check
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceArea, 
  ReferenceLine,
  ReferenceDot
} from 'recharts';

export function SentinelScreen({ isFinalState }) {
  const [currentScore, setCurrentScore] = useState(isFinalState ? 76 : 14);
  const [currentBand, setCurrentBand] = useState(isFinalState ? 'Quarantine' : 'Observe');
  const [rehabActiveStep, setRehabActiveStep] = useState(isFinalState ? 4 : 1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simIndex, setSimIndex] = useState(isFinalState ? SENTINEL_RISK_TIMELINE.length - 1 : 2);

  // Sync with isFinalState
  useEffect(() => {
    if (isFinalState) {
      setCurrentScore(76);
      setCurrentBand('Quarantine');
      setRehabActiveStep(4);
      setSimIndex(SENTINEL_RISK_TIMELINE.length - 1);
    }
  }, [isFinalState]);

  const handleRunDriftingAgent = () => {
    setIsSimulating(true);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < SENTINEL_RISK_TIMELINE.length) {
        const point = SENTINEL_RISK_TIMELINE[idx];
        setSimIndex(idx);
        setCurrentScore(point.score);
        setCurrentBand(point.band);
        idx++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setRehabActiveStep(4);
      }
    }, 350);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setCurrentScore(14);
    setCurrentBand('Observe');
    setRehabActiveStep(1);
    setSimIndex(2);
  };

  // Determine ladder highlights based on current score
  const getActiveLadderLevel = (score) => {
    if (score < 30) return 1; // Observe
    if (score < 50) return 2; // Throttle
    if (score < 70) return 3; // Restrict
    if (score < 90) return 4; // Quarantine
    return 5; // Kill
  };

  const activeLevelNum = getActiveLadderLevel(currentScore);

  return (
    <div className="space-y-6">
      {/* Header & Simulation Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-ink text-surface rounded">
              Sentinel
            </span>
            <span className="text-xs text-ink-soft font-mono">
              Continuous Agent Drift Scoring & Graduated Containment Ladder
            </span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-ink tracking-tight">
            Sentinel: Agent Containment & Rehabilitation
          </h1>
          <p className="text-ink-soft text-sm mt-0.5 max-w-3xl">
            Autonomous agents exhibit behavioral drift when encountering conflicting sub-goals. Sentinel scores anomalies continuously, contains out-of-spec agents on a graduated ladder, and synthesizes verifiable runtime policy patches.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRunDriftingAgent}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-ink text-surface hover:bg-ink/90 rounded text-xs font-medium transition-colors disabled:opacity-60 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? 'Drift in progress...' : 'Run drifting agent'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 bg-paper hover:bg-rule/40 text-ink-soft hover:text-ink rounded text-xs border border-rule"
            title="Reset to baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Graph: Live Risk Score Chart with Color Background Bands */}
      <div className="panel-bordered p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rule">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-ink" />
              <h2 className="font-heading font-semibold text-base text-ink">
                Real-Time Anomaly & Drift Trajectory
              </h2>
            </div>
            <span className={`status-pill ${
              currentScore >= 70 ? 'status-pill-block' : currentScore >= 30 ? 'status-pill-hold' : 'status-pill-allow'
            } text-[11px] font-mono`}>
              Current score: {currentScore}/100 ({currentBand})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
            <span className="px-1.5 py-0.5 rounded bg-allow/10 text-allow border border-allow/30">0-30 Observe</span>
            <span className="px-1.5 py-0.5 rounded bg-hold/10 text-hold border border-hold/30">30-50 Throttle</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 border border-amber-500/30">50-70 Restrict</span>
            <span className="px-1.5 py-0.5 rounded bg-block/10 text-block border border-block/30">70-90 Quarantine</span>
            <span className="px-1.5 py-0.5 rounded bg-red-900/10 text-red-900 border border-red-900/30">90+ Kill</span>
          </div>
        </div>

        {/* Recharts Live Timeline */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={SENTINEL_RISK_TIMELINE.slice(0, simIndex + 1)} 
              margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
            >
              {/* Background Ladder Color Bands */}
              <ReferenceArea y1={0} y2={30} fill="#0E7C66" fillOpacity={0.05} />
              <ReferenceArea y1={30} y2={50} fill="#D9930D" fillOpacity={0.06} />
              <ReferenceArea y1={50} y2={70} fill="#E67E22" fillOpacity={0.07} />
              <ReferenceArea y1={70} y2={90} fill="#C8321E" fillOpacity={0.09} />
              <ReferenceArea y1={90} y2={100} fill="#800000" fillOpacity={0.12} />

              <XAxis 
                dataKey="time" 
                tickLine={false} 
                axisLine={{ stroke: '#CBD3DD' }} 
                tick={{ fill: '#5B6B80', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              />
              <YAxis 
                domain={[0, 100]} 
                ticks={[0, 30, 50, 70, 90, 100]}
                tickLine={false} 
                axisLine={{ stroke: '#CBD3DD' }} 
                tick={{ fill: '#5B6B80', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-ink text-surface p-2.5 rounded shadow-lg text-xs font-sans space-y-1">
                        <div className="font-mono text-[10px] text-ink-soft text-rule">T = {data.time}</div>
                        <div className="font-bold text-sm">Score: {data.score}/100 ({data.band})</div>
                        <div className="text-[11px] text-paper">{data.note}</div>
                        {data.blocked && (
                          <div className="text-[10px] font-mono text-block font-semibold bg-block/20 px-1 py-0.5 rounded">
                            BLOCKED EXECUTION
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#14233A" 
                strokeWidth={2.5} 
                dot={{ r: 4, fill: '#14233A', strokeWidth: 1, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, fill: '#C8321E' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-2 border-t border-rule/60 flex flex-wrap items-center justify-between text-xs text-ink-soft">
          <span>Drift Trigger: Repeated unauthorized outbound egress attempt</span>
          <span className="font-mono text-block font-semibold">
            {currentScore >= 70 ? 'Containment active: Sandbox isolation armed' : 'Monitoring within safety threshold'}
          </span>
        </div>
      </div>

      {/* 2-Column Section: Left Signal List & Right Containment Ladder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (6 cols): Signal List with mini progress bars */}
        <div className="lg:col-span-6 panel-bordered p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rule mb-4">
              <div>
                <h3 className="font-heading font-semibold text-sm text-ink">
                  Behavioral Anomaly Signals
                </h3>
                <p className="text-xs text-ink-soft">Weighted continuous inputs evaluated every 50ms</p>
              </div>
              <span className="font-mono text-[11px] text-ink-soft bg-paper px-2 py-0.5 rounded border border-rule">
                7 Signals
              </span>
            </div>

            <div className="space-y-3">
              {SENTINEL_SIGNALS.map((sig, i) => {
                let barColor = 'bg-ink';
                if (sig.status === 'Critical' || sig.status === 'Triggered') barColor = 'bg-block';
                else if (sig.status === 'High' || sig.status === 'Elevated') barColor = 'bg-hold';

                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-ink flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${barColor}`}></span>
                        {sig.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-ink-soft font-mono">{sig.desc}</span>
                        <span className="font-mono text-[11px] font-bold text-ink w-8 text-right">
                          {sig.value}
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-paper h-1.5 rounded overflow-hidden border border-rule/50">
                      <div 
                        className={`h-full rounded ${barColor}`} 
                        style={{ width: `${sig.value}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rule/60 text-[11px] text-ink-soft flex items-center justify-between font-mono">
            <span>Primary trigger: Canary contact</span>
            <span className="text-block font-semibold">100% confidence</span>
          </div>
        </div>

        {/* Right Column (6 cols): Containment Ladder */}
        <div className="lg:col-span-6 panel-bordered p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rule mb-4">
              <div>
                <h3 className="font-heading font-semibold text-sm text-ink">
                  Graduated Containment Ladder
                </h3>
                <p className="text-xs text-ink-soft">Deterministic throttle, restrict, and isolation states</p>
              </div>
              <span className="text-[11px] font-mono text-ink font-semibold">
                Level {activeLevelNum} of 5
              </span>
            </div>

            {/* Ladder Steps */}
            <div className="space-y-2.5">
              {SENTINEL_LADDER.map((lvl) => {
                const isActive = lvl.level === activeLevelNum;
                let borderStyle = 'border-rule/70 bg-surface';
                let pillStyle = 'bg-paper text-ink-soft';

                if (isActive) {
                  if (lvl.level === 4) {
                    borderStyle = 'border-2 border-block bg-block/5';
                    pillStyle = 'bg-block text-surface';
                  } else if (lvl.level === 2 || lvl.level === 3) {
                    borderStyle = 'border-2 border-hold bg-hold/5';
                    pillStyle = 'bg-hold text-surface';
                  } else {
                    borderStyle = 'border-2 border-allow bg-allow/5';
                    pillStyle = 'bg-allow text-surface';
                  }
                }

                return (
                  <div 
                    key={lvl.level} 
                    className={`p-2.5 rounded border transition-all flex items-center justify-between ${borderStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full font-mono text-[10px] font-bold flex items-center justify-center ${pillStyle}`}>
                        {lvl.level}
                      </span>
                      <div>
                        <div className="font-heading font-bold text-xs text-ink">
                          {lvl.name} <span className="font-mono font-normal text-[10px] text-ink-soft">({lvl.range})</span>
                        </div>
                        <div className="text-[11px] text-ink-soft">{lvl.desc}</div>
                      </div>
                    </div>

                    {isActive && (
                      <span className="status-pill status-pill-block text-[10px] font-mono uppercase shrink-0">
                        Active State
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Session Isolation Status */}
          <div className="mt-4 pt-3 border-t border-rule/60 flex items-center justify-between text-xs">
            <span className="text-ink-soft">Session state:</span>
            <strong className="text-block font-mono text-[11px]">
              "Quarantined in sandbox with mock tools"
            </strong>
          </div>
        </div>
      </div>

      {/* Rehabilitation & Policy Patch Stepper (Section 5.4 requirement) */}
      <div className="panel-bordered p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rule">
          <div>
            <div className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 text-ink" />
              <h3 className="font-heading font-semibold text-base text-ink">
                Autonomous Agent Rehabilitation Workflow
              </h3>
            </div>
            <p className="text-xs text-ink-soft mt-0.5">
              Instead of permanently deleting agent memory, Sentinel rolls back tainted state, synthesizes a policy patch, and relaunches under probation.
            </p>
          </div>
          <span className="status-pill status-pill-allow text-[10px]">
            Rehab Engine Ready
          </span>
        </div>

        {/* Horizontal Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {REHAB_STEPS.map((step) => {
            const isCompleted = step.id < rehabActiveStep;
            const isCurrent = step.id === rehabActiveStep;

            let badgeClass = 'bg-paper text-ink-soft border border-rule';
            if (isCompleted) badgeClass = 'bg-allow text-surface font-bold';
            if (isCurrent) badgeClass = 'bg-ink text-surface font-bold';

            return (
              <div 
                key={step.id} 
                className={`p-3 rounded border text-xs flex flex-col justify-between ${
                  isCurrent 
                    ? 'border-ink bg-paper/60 shadow-xs' 
                    : isCompleted 
                    ? 'border-allow/40 bg-surface' 
                    : 'border-rule/60 bg-surface opacity-60'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] ${badgeClass}`}>
                      {isCompleted ? <Check className="w-3 h-3" /> : step.id}
                    </span>
                    <span className="text-[10px] font-mono text-ink-soft">Step {step.id}</span>
                  </div>
                  <div className="font-heading font-bold text-xs text-ink">{step.title}</div>
                  <div className="text-[10px] text-ink-soft line-clamp-2 leading-tight">{step.desc}</div>
                </div>

                <div className="mt-2 pt-1 border-t border-rule/40 text-[9px] font-mono text-ink-soft uppercase">
                  {isCompleted ? 'Completed' : isCurrent ? 'Under review' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Human-in-the-Loop Patch Rule Review Card */}
        <div className="p-4 bg-paper rounded border border-rule space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-heading font-semibold text-ink flex items-center gap-1.5">
              <FileCode2 className="w-4 h-4 text-ink" />
              Synthesized Runtime Patch Rule (Human Review):
            </span>
            <span className="font-mono text-[10px] text-allow font-bold bg-allow/10 px-2 py-0.5 rounded border border-allow/30">
              Auto-Synthesized
            </span>
          </div>
          
          <div className="p-3 bg-surface rounded border border-rule font-mono text-xs text-ink select-text">
            <code>policy_patch: "Invoices from this sender may not change bank details."</code>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <span className="text-ink-soft">
              Next state transition:
            </span>
            <span className="font-medium text-ink font-mono text-[11px] bg-surface px-2.5 py-1 rounded border border-rule">
              "Relaunched on probation: lower limits, approval on every payment."
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
