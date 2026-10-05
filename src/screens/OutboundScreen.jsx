import React, { useState, useEffect } from 'react';
import { OUTBOUND_DATA } from '../data/mockData';
import { 
  Play, 
  RotateCcw, 
  RefreshCw, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Info,
  CheckCircle,
  FileSearch,
  Eye,
  Check
} from 'lucide-react';

export function OutboundScreen({ isFinalState }) {
  const [activeTab, setActiveTab] = useState('tokenization'); // 'tokenization' | 'semantic'
  const [isSanitized, setIsSanitized] = useState(isFinalState);
  const [isRestored, setIsRestored] = useState(isFinalState);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingTokenIdx, setAnimatingTokenIdx] = useState(-1);

  // Sync with isFinalState prop
  useEffect(() => {
    if (isFinalState) {
      setIsSanitized(true);
      setIsRestored(true);
    }
  }, [isFinalState]);

  const handleRunScenario = () => {
    setIsAnimating(true);
    setIsSanitized(false);
    setIsRestored(false);
    
    // Step through token replacements sequentially
    let step = 0;
    const interval = setInterval(() => {
      if (step < OUTBOUND_DATA.tokens.length) {
        setAnimatingTokenIdx(step);
        step++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
        setIsSanitized(true);
        setAnimatingTokenIdx(-1);
      }
    }, 180);
  };

  const handleReset = () => {
    setIsSanitized(false);
    setIsRestored(false);
    setIsAnimating(false);
    setAnimatingTokenIdx(-1);
  };

  const handleRestore = () => {
    setIsRestored(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-ink tracking-tight">
            Outbound Shield: Reversible Tokenization & Semantic Filtering
          </h1>
          <p className="text-ink-soft text-sm mt-1 max-w-2xl">
            Sensitive customer data and credentials are intercepted at the boundary, tokenized locally before reaching the AI model, and restored in model responses.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-paper p-1 rounded-md border border-rule shrink-0">
          <button
            onClick={() => setActiveTab('tokenization')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'tokenization'
                ? 'bg-surface text-ink font-semibold shadow-xs border border-rule/50'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Tokenization Boundary
          </button>
          <button
            onClick={() => setActiveTab('semantic')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'semantic'
                ? 'bg-surface text-ink font-semibold shadow-xs border border-rule/50'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            Semantic Risk Check
          </button>
        </div>
      </div>

      {activeTab === 'tokenization' ? (
        <div className="space-y-6">
          {/* Action toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-surface p-3 rounded-panel border border-rule">
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunScenario}
                disabled={isAnimating}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-ink text-surface hover:bg-ink/90 rounded text-xs font-medium transition-colors disabled:opacity-60"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isAnimating ? 'Intercepting tokens...' : 'Run scenario'}</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hover:bg-rule/40 text-ink rounded text-xs font-medium transition-colors border border-rule"
              >
                <RotateCcw className="w-3 h-3 text-ink-soft" />
                <span>Reset</span>
              </button>
            </div>

            {/* Token Category Legend */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-mono">
              <span className="text-ink-soft font-sans font-medium mr-1">Legend:</span>
              <span className="token-secret">Secret (Password/Key)</span>
              <span className="token-pii">PII / Financial</span>
              <span className="token-entity">Entity / Context</span>
            </div>
          </div>

          {/* Vertical Boundary Split View (Hero of Outbound) */}
          <div className="panel-bordered overflow-hidden">
            {/* Header labels */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-paper/60 border-b border-rule">
              <div className="p-3.5 px-5 flex items-center justify-between border-b md:border-b-0 md:border-r border-rule">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-ink"></span>
                  <span className="font-heading font-semibold text-xs text-ink uppercase tracking-wider">
                    Your side (Local environment)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-ink-soft">Raw confidential prompt</span>
              </div>

              <div className="p-3.5 px-5 flex items-center justify-between bg-paper/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-allow"></span>
                  <span className="font-heading font-semibold text-xs text-ink uppercase tracking-wider">
                    What the AI receives (Cloud model)
                  </span>
                </div>
                <span className="status-pill status-pill-allow text-[10px]">
                  Zero sensitive data
                </span>
              </div>
            </div>

            {/* Split Content with Vertical Boundary Motif */}
            <div className="grid grid-cols-1 md:grid-cols-2 relative">
              {/* Left Column: Your side original prompt */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-rule flex flex-col justify-between bg-surface">
                <div>
                  <div className="text-xs text-ink-soft font-mono mb-2 flex items-center justify-between">
                    <span>INPUT_PAYLOAD</span>
                    <span className="text-[11px] text-block font-semibold">3 sensitive spans detected</span>
                  </div>

                  {/* Rendered prompt with highlighted tokens */}
                  <div className="p-4 bg-paper/40 rounded border border-rule/70 font-mono text-xs leading-relaxed text-ink space-y-2 select-text">
                    <p>
                      Debug this query. Database:{' '}
                      <span className="token-entity">prod_customer_db</span>, user:{' '}
                      <span className="token-entity">admin</span>, password:{' '}
                      <span className="token-secret">company123</span>.
                    </p>
                    <p>
                      Customer <span className="token-pii">Rahul Sharma</span>, account{' '}
                      <span className="token-pii">782194</span>, balance ₹84,000.
                    </p>
                    <p>
                      Also email <span className="token-entity">Acme Corporation</span> that{' '}
                      <span className="token-entity">Project Phoenix</span> is delayed because our{' '}
                      <span className="token-entity">Bengaluru</span> supplier failed.
                    </p>
                  </div>
                </div>

                {/* Left side Risk Meter */}
                <div className="mt-5 pt-3 border-t border-rule/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-block" />
                    <span className="text-xs font-medium text-ink">Exposure Risk Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-paper h-2 rounded overflow-hidden border border-rule/60">
                      <div className="bg-block h-full w-[84%] rounded"></div>
                    </div>
                    <span className="font-mono text-xs font-bold text-block">84 / 100</span>
                  </div>
                </div>
              </div>

              {/* Right Column: What the AI receives */}
              <div className="p-6 bg-surface flex flex-col justify-between">
                <div>
                  <div className="text-xs text-ink-soft font-mono mb-2 flex items-center justify-between">
                    <span>SANITIZED_TRANSMISSION</span>
                    <span className="text-[11px] text-allow font-semibold font-mono">
                      8 placeholders substituted
                    </span>
                  </div>

                  {/* Rendered sanitized prompt */}
                  <div className="p-4 bg-paper/40 rounded border border-rule/70 font-mono text-xs leading-relaxed text-ink space-y-2 select-text">
                    {isSanitized || isFinalState ? (
                      <>
                        <p>
                          Debug this query. Database:{' '}
                          <span className="token-placeholder">[DATABASE_NAME]</span>, user:{' '}
                          <span className="token-placeholder">[USERNAME]</span>, password:{' '}
                          <span className="token-placeholder text-block">[REDACTED_SECRET]</span>.
                        </p>
                        <p>
                          Customer <span className="token-placeholder text-hold">[CUSTOMER_NAME]</span>, account{' '}
                          <span className="token-placeholder text-hold">[ACCOUNT_ID]</span>, balance ₹84,000.
                        </p>
                        <p>
                          Also email <span className="token-placeholder">[CLIENT_1]</span> that{' '}
                          <span className="token-placeholder">[PROJECT_1]</span> is delayed because our{' '}
                          <span className="token-placeholder">[LOCATION_1]</span> supplier failed.
                        </p>
                      </>
                    ) : (
                      <div className="py-6 flex flex-col items-center justify-center text-ink-soft">
                        <ArrowRight className="w-5 h-5 mb-2 text-ink-soft animate-pulse" />
                        <span className="text-xs font-mono">Click "Run scenario" to stream through tokenization boundary</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side status badge */}
                <div className="mt-5 pt-3 border-t border-rule/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-allow" />
                    <span className="text-xs font-medium text-ink">Egress Compliance</span>
                  </div>
                  <span className="status-pill status-pill-allow text-[10px]">
                    100% Policy Clean
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Mock Reply & Local Restoration Section */}
          <div className="panel-bordered p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-rule">
              <div>
                <h3 className="font-heading font-semibold text-sm text-ink">
                  AI Model Response & Local Value Restoration
                </h3>
                <p className="text-xs text-ink-soft">
                  The model generates solutions referencing placeholders. Real values are restored locally inside your browser/API client.
                </p>
              </div>

              {/* Action Button: Restore Values */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestore}
                  disabled={!isSanitized && !isFinalState}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-medium transition-colors ${
                    isRestored
                      ? 'bg-allow text-surface'
                      : 'bg-ink text-surface hover:bg-ink/90 disabled:opacity-50'
                  }`}
                >
                  {isRestored ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Values restored</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restore values</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Reply Display */}
            <div className="p-4 bg-paper/30 rounded border border-rule font-mono text-xs leading-relaxed space-y-2">
              {isRestored ? (
                <>
                  <div className="text-[11px] text-allow font-bold mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-allow" />
                    <span>Restored on your device. The AI never saw these.</span>
                  </div>
                  <p>
                    Here is the query diagnostic for <span className="token-restored">prod_customer_db</span>:
                  </p>
                  <p>
                    1. The connection pool for user <span className="token-restored">admin</span> shows connection starvation under load.
                  </p>
                  <p>
                    2. Recommended index on <span className="token-restored">782194</span> for faster lookup when fetching record for <span className="token-restored">Rahul Sharma</span>.
                  </p>
                  <p>
                    3. For <span className="token-restored">Acme Corporation</span>: I have generated a notification template referencing the supplier disruption in <span className="token-restored">Bengaluru</span> impacting <span className="token-restored">Project Phoenix</span>.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-[11px] text-ink-soft font-semibold mb-2">
                    Raw AI output as received from server (placeholder encoded):
                  </div>
                  <p>
                    Here is the query diagnostic for <span className="token-placeholder">[DATABASE_NAME]</span>:
                  </p>
                  <p>
                    1. The connection pool for user <span className="token-placeholder">[USERNAME]</span> shows connection starvation under load.
                  </p>
                  <p>
                    2. Recommended index on <span className="token-placeholder">[ACCOUNT_ID]</span> for faster lookup when fetching record for <span className="token-placeholder">[CUSTOMER_NAME]</span>.
                  </p>
                  <p>
                    3. For <span className="token-placeholder">[CLIENT_1]</span>: I have generated a notification template referencing the supplier disruption in <span className="token-placeholder">[LOCATION_1]</span> impacting <span className="token-placeholder">[PROJECT_1]</span>.
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-ink-soft">
              <span>Token Vault: In-memory session key (ephemeral, zero server persistence)</span>
              <span className="font-mono text-allow font-semibold">Local de-tokenization latency: &lt; 0.4 ms</span>
            </div>
          </div>
        </div>
      ) : (
        /* Semantic Check Tab */
        <div className="space-y-6">
          <div className="panel-bordered p-6 space-y-6">
            <div className="pb-4 border-b border-rule">
              <span className="text-xs font-mono text-ink-soft uppercase tracking-wider block mb-1">
                Zero-Pattern Confidentiality Detection
              </span>
              <h2 className="font-heading font-bold text-xl text-ink">
                Semantic & Material Non-Public Information (MNPI) Analysis
              </h2>
              <p className="text-xs text-ink-soft mt-1">
                Even without explicit passwords or regex-matchable tokens, AgentShield's boundary evaluator detects severe business confidentiality leaks.
              </p>
            </div>

            {/* Prompt sample */}
            <div>
              <div className="text-xs font-mono text-ink-soft mb-2">EVALUATED PROMPT</div>
              <div className="p-4 bg-paper rounded border border-rule font-mono text-sm text-ink select-text">
                "{OUTBOUND_DATA.semanticCheck.prompt}"
              </div>
            </div>

            {/* Risk Assessment Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Score meter */}
              <div className="panel-bordered p-4 bg-block/5 border-block/30 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-ink-soft">Semantic Risk Rating</span>
                  <div className="font-heading font-bold text-4xl text-block mt-2">
                    {OUTBOUND_DATA.semanticCheck.riskScore}
                    <span className="text-base text-ink-soft font-normal"> / 100</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-block/20">
                  <span className="status-pill status-pill-block text-xs font-mono">
                    CRITICAL EXPOSURE
                  </span>
                </div>
              </div>

              {/* Action disposition */}
              <div className="panel-bordered p-4 md:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-ink-soft">Boundary Decision</span>
                  <div className="text-sm font-semibold text-ink mt-1 flex items-center gap-2">
                    <span className="status-pill status-pill-block">BLOCKED AT BOUNDARY</span>
                    <span>No payload transmitted to external provider</span>
                  </div>
                  <p className="text-xs text-ink-soft mt-2 leading-relaxed">
                    {OUTBOUND_DATA.semanticCheck.recommendation}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-rule text-[11px] text-ink-soft font-mono">
                  Enforcement: Outbound Intent Filter #MNPI-904
                </div>
              </div>
            </div>

            {/* Specific Reasons Table */}
            <div>
              <h3 className="font-heading font-semibold text-sm text-ink mb-3">
                Identified Risk Factors
              </h3>
              <div className="panel-bordered overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-paper/80 border-b border-rule font-mono text-ink-soft text-[11px]">
                      <th className="p-3">Risk Factor</th>
                      <th className="p-3">Severity</th>
                      <th className="p-3">Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule/60">
                    {OUTBOUND_DATA.semanticCheck.reasons.map((reason, i) => (
                      <tr key={i} className="hover:bg-paper/30">
                        <td className="p-3 font-semibold text-ink">{reason.factor}</td>
                        <td className="p-3">
                          <span className={`status-pill ${
                            reason.weight === 'Critical' ? 'status-pill-block' : 'status-pill-hold'
                          } text-[10px]`}>
                            {reason.weight}
                          </span>
                        </td>
                        <td className="p-3 text-ink-soft">{reason.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
