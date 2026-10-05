import React from 'react';
import { RESULTS_DATA } from '../data/mockData';
import { 
  CheckCircle2, 
  ShieldCheck, 
  BarChart2, 
  Info, 
  AlertCircle, 
  TrendingDown, 
  Layers, 
  SlidersHorizontal 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

export function ResultsScreen() {
  const { metrics, chartData, limitations } = RESULTS_DATA;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-ink text-surface rounded">
              Evaluation
            </span>
            <span className="text-xs text-ink-soft font-mono">
              Empirical Target Benchmark & Security Posture Comparison
            </span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-ink tracking-tight">
            Evaluation & Target Security Benchmarks
          </h1>
          <p className="text-ink-soft text-sm mt-0.5 max-w-3xl">
            Comparison of raw generative agents, traditional DLP/regex keyword filters, and AgentShield's two-way provenance boundary.
          </p>
        </div>

        {/* Prototype Target Notice Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-hold/10 text-hold border border-hold/30 rounded text-xs font-mono shrink-0">
          <Info className="w-3.5 h-3.5" />
          <span>Note: Prototype targets shown</span>
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="panel-bordered overflow-hidden shadow-xs space-y-0">
        <div className="p-4 bg-paper/60 border-b border-rule flex items-center justify-between">
          <h2 className="font-heading font-semibold text-sm text-ink">
            Defense Boundary Performance Matrix
          </h2>
          <span className="text-[11px] font-mono text-ink-soft">
            *All values marked as prototype architectural targets
          </span>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-paper/40 border-b border-rule font-mono text-ink-soft text-[11px]">
              <th className="p-3.5">Metric</th>
              <th className="p-3.5">Raw Agent (Unprotected)</th>
              <th className="p-3.5">DLP / Filter Baseline</th>
              <th className="p-3.5 bg-allow/5 text-allow font-bold">AgentShield</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule/60 text-xs">
            {metrics.map((row, idx) => (
              <tr key={idx} className="hover:bg-paper/30">
                <td className="p-3.5 font-semibold text-ink font-sans">
                  {row.metric}
                </td>
                <td className="p-3.5 font-mono text-block font-medium">
                  {row.rawAgent}
                </td>
                <td className="p-3.5 font-mono text-ink-soft">
                  {row.baseline}
                </td>
                <td className="p-3.5 font-mono bg-allow/5 font-bold text-allow">
                  {row.agentShield}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-3 bg-paper/30 border-t border-rule text-[11px] text-ink-soft flex items-center justify-between">
          <span>Target baseline simulated on 500 multi-turn prompt injection benchmarks</span>
          <span className="font-mono text-allow font-medium">Overhead: &lt; 2.5% latency impact</span>
        </div>
      </div>

      {/* 2-Column Section: Left Bar Chart & Right Honest Limitations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Bar Chart of Attack Success Rate */}
        <div className="lg:col-span-5 panel-bordered p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div>
                <h3 className="font-heading font-semibold text-sm text-ink">
                  Attack Success Rate Comparison
                </h3>
                <p className="text-xs text-ink-soft">Lower is better. Provenance prevents 100% of indirect injections.</p>
              </div>
              <span className="text-[10px] font-mono text-block bg-block/10 px-1.5 py-0.5 rounded border border-block/20">
                80%+ drop
              </span>
            </div>

            <div className="h-56 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD3DD' }} 
                    tick={{ fill: '#5B6B80', fontSize: 11, fontFamily: 'IBM Plex Sans' }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tickLine={false} 
                    axisLine={{ stroke: '#CBD3DD' }} 
                    tick={{ fill: '#5B6B80', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
                    unit="%"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#14233A', 
                      borderRadius: '6px', 
                      border: 'none', 
                      color: '#FFFFFF',
                      fontSize: '12px'
                    }}
                    formatter={(val) => [`${val}%`, 'Attack Success Rate']}
                  />
                  <Bar dataKey="successRate" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 2 ? '#0E7C66' : index === 0 ? '#C8321E' : '#D9930D'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-rule/60 text-[11px] text-ink-soft flex items-center justify-between font-mono">
            <span>AgentShield target: ~0%</span>
            <span className="text-allow font-semibold">Zero indirect execution</span>
          </div>
        </div>

        {/* Right Column (7 cols): Honest Limitations List */}
        <div className="lg:col-span-7 panel-bordered p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rule mb-3">
              <div>
                <h3 className="font-heading font-semibold text-sm text-ink">
                  Honest Limitations & Mitigations
                </h3>
                <p className="text-xs text-ink-soft">Real-world edge cases and boundary defense architectures</p>
              </div>
              <span className="status-pill status-pill-neutral text-[10px]">
                Engineering Reality
              </span>
            </div>

            <div className="space-y-3">
              {limitations.map((item, idx) => (
                <div key={idx} className="p-3 bg-paper/40 rounded border border-rule/60 space-y-1">
                  <div className="font-heading font-bold text-xs text-ink flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-ink/10 text-ink flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-ink-soft pl-6 leading-relaxed">
                    <strong className="text-ink font-medium">Mitigation:</strong> {item.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-rule/60 text-[11px] text-ink-soft font-mono">
            Boundary thesis: "Don't trust the agent. Trust the boundary."
          </div>
        </div>
      </div>
    </div>
  );
}
