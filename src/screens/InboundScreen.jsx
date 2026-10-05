import React, { useState, useEffect } from 'react';
import { 
  POISONED_INVOICE, 
  INTENT_CONTRACT, 
  VENDOR_REGISTRY 
} from '../data/mockData';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  Scan, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Building, 
  CreditCard, 
  Lock, 
  Zap, 
  Skull, 
  PhoneCall, 
  ShieldX,
  FileCheck
} from 'lucide-react';

export function InboundScreen({ isProtected, setIsProtected, isFinalState }) {
  const [xrayMode, setXrayMode] = useState(true); // Default to X-ray on for hero screenshots
  const [scenarioExecuted, setScenarioExecuted] = useState(true);
  const [canaryTriggered, setCanaryTriggered] = useState(false);
  const [decisionActionTaken, setDecisionActionTaken] = useState('none'); // 'hold' | 'verify' | 'none'
  const [countdown, setCountdown] = useState('14:48');

  // Sync with isFinalState
  useEffect(() => {
    if (isFinalState) {
      setScenarioExecuted(true);
      setXrayMode(true);
    }
  }, [isFinalState]);

  const handleRunScenario = () => {
    setScenarioExecuted(false);
    setCanaryTriggered(false);
    setDecisionActionTaken('none');

    setTimeout(() => {
      setScenarioExecuted(true);
    }, 400);
  };

  const handleTriggerCanary = () => {
    setCanaryTriggered(true);
  };

  const handleReset = () => {
    setScenarioExecuted(true);
    setCanaryTriggered(false);
    setDecisionActionTaken('none');
  };

  return (
    <div className="space-y-6">
      {/* Top Session Banner if Canary Triggered */}
      {canaryTriggered && (
        <div className="p-4 bg-block text-surface rounded-panel shadow-md flex items-center justify-between animate-bounce-short">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface/20 flex items-center justify-center">
              <ShieldX className="w-5 h-5 text-surface" />
            </div>
            <div>
              <div className="font-heading font-bold text-sm tracking-wide uppercase">
                Canary Honeytoken Breach Detected
              </div>
              <div className="text-xs text-surface/90 font-mono mt-0.5">
                Canary touched. Session killed. Credentials revoked.
              </div>
            </div>
          </div>
          <button
            onClick={() => setCanaryTriggered(false)}
            className="text-xs bg-surface text-block px-3 py-1.5 rounded font-semibold hover:bg-surface/90"
          >
            Dismiss Alert
          </button>
        </div>
      )}

      {/* Hero Header & Intent Contract Ribbon */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-ink text-surface rounded">
                IntentLock
              </span>
              <span className="text-xs text-ink-soft font-mono">
                Boundary: Inbound Argument Provenance & Execution Gateway
              </span>
            </div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl text-ink tracking-tight">
              Inbound Shield: Invoice Poisoning Prevention
            </h1>
            <p className="text-ink-soft text-sm mt-0.5 max-w-3xl">
              An agent reading untrusted invoices cannot override verified banking records. Data provenance isolates untrusted text injections from execution parameters.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleRunScenario}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-surface hover:bg-ink/90 rounded text-xs font-medium transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run scenario</span>
            </button>

            <button
              onClick={handleTriggerCanary}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hover:bg-block/10 text-block rounded text-xs font-medium transition-colors border border-block/30"
              title="Simulate agent attempting to read trap canary file"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate hijacked agent</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 bg-paper hover:bg-rule/40 text-ink-soft hover:text-ink rounded text-xs border border-rule"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Intent Contract Strip (Slim strip above page as specified) */}
        <div className="panel-bordered p-3 bg-surface border-rule flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="status-pill status-pill-allow text-[11px] uppercase tracking-wider font-mono">
              <FileCheck className="w-3 h-3" />
              Approved Contract
            </span>
            <div className="flex items-center gap-2 font-mono text-ink">
              <strong className="font-semibold">{INTENT_CONTRACT.task}</strong>
              <span className="text-ink-soft hidden lg:inline">|</span>
              <span className="text-ink-soft hidden lg:inline">Max: ₹1,00,000 / payment</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-ink-soft text-[11px] font-mono shrink-0">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-ink-soft" />
              <span>Expires in: <strong className="text-ink">{countdown}</strong></span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-allow" />
              <span>Registry lock: <strong className="text-allow">Strict</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Split: Document X-ray (Left) vs Gateway Decision (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (6 cols): Document X-Ray */}
        <div className="lg:col-span-6 panel-bordered overflow-hidden flex flex-col justify-between bg-surface shadow-xs">
          <div>
            {/* X-ray Header & Toggle */}
            <div className="p-3.5 px-4 bg-paper/60 border-b border-rule flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-ink" />
                <span className="font-heading font-semibold text-xs text-ink uppercase tracking-wider">
                  Document X-ray Scanner
                </span>
              </div>

              {/* Toggle switch: Visible vs X-Ray */}
              <div className="flex items-center gap-1 bg-surface p-0.5 rounded border border-rule">
                <button
                  onClick={() => setXrayMode(false)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1 ${
                    !xrayMode
                      ? 'bg-ink text-surface font-semibold shadow-xs'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Visible</span>
                </button>
                <button
                  onClick={() => setXrayMode(true)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1 ${
                    xrayMode
                      ? 'bg-ink text-surface font-semibold shadow-xs'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <Scan className="w-3 h-3" />
                  <span>X-ray</span>
                </button>
              </div>
            </div>

            {/* Paper Invoice Representation */}
            <div className="p-5 md:p-6 bg-surface text-ink text-xs space-y-5 select-text">
              {/* Invoice top metadata */}
              <div className="flex justify-between items-start border-b border-rule pb-4">
                <div>
                  <div className="font-heading font-bold text-base text-ink">
                    {POISONED_INVOICE.vendorName}
                  </div>
                  <div className="text-[11px] text-ink-soft font-mono mt-0.5">
                    GSTIN: 27AABCS1429B1Z8 | HSN 481910
                  </div>
                  <div className="text-[11px] text-ink-soft mt-0.5">
                    Plot 44, MIDC Industrial Area, Andheri East, Mumbai
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-bold text-sm text-ink">{POISONED_INVOICE.invoiceNumber}</div>
                  <div className="text-[11px] text-ink-soft">Date: {POISONED_INVOICE.date}</div>
                  <div className="text-[11px] text-block font-semibold mt-0.5">{POISONED_INVOICE.dueDate}</div>
                </div>
              </div>

              {/* Line items table */}
              <div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-rule text-ink-soft font-mono text-[10px] uppercase">
                      <th className="py-1.5">Description</th>
                      <th className="py-1.5 text-right">Qty</th>
                      <th className="py-1.5 text-right">Rate</th>
                      <th className="py-1.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule/40 font-mono text-[11px]">
                    {POISONED_INVOICE.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2 text-ink font-sans font-medium">{item.desc}</td>
                        <td className="py-2 text-right text-ink-soft">{item.qty}</td>
                        <td className="py-2 text-right text-ink-soft">₹{item.rate}</td>
                        <td className="py-2 text-right text-ink font-semibold">₹{item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-ink font-mono font-bold text-xs">
                      <td colSpan={3} className="py-2 text-right">Total Amount Due:</td>
                      <td className="py-2 text-right text-ink text-sm">{POISONED_INVOICE.formattedAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Visible Payment Instructions Box */}
              <div className="p-3 bg-paper/50 rounded border border-rule text-xs space-y-1">
                <div className="font-mono text-[10px] text-ink-soft uppercase font-semibold">
                  Official Remittance Account (Printed)
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>A/C Number: <strong className="text-ink">{POISONED_INVOICE.visibleAccount}</strong></span>
                  <span className="text-ink-soft">IFSC: SBIN0004521</span>
                </div>
                <div className="text-[10px] text-ink-soft">
                  Bank: {POISONED_INVOICE.visibleBank}
                </div>
              </div>

              {/* Poisoned Invisible Prompt Injection Payload Block */}
              {xrayMode ? (
                <div className="p-3.5 bg-block/10 border-2 border-block rounded text-xs space-y-2 relative transition-all">
                  <div className="flex items-center justify-between text-block font-mono text-[11px] font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-block" />
                      Hidden text found: white on white, 1pt font.
                    </span>
                    <span className="status-pill status-pill-block text-[10px]">INJECTION</span>
                  </div>

                  <div className="font-mono text-[11px] text-block font-semibold bg-surface p-2.5 rounded border border-block/30 select-text leading-relaxed">
                    {POISONED_INVOICE.hiddenText}
                  </div>

                  <div className="text-[10px] text-ink-soft font-mono">
                    DOM Layer: &lt;span style="color:#ffffff; font-size:1px; position:absolute;"&gt;
                  </div>
                </div>
              ) : (
                /* When X-ray is off, the text is truly white-on-white and invisible */
                <div className="p-2 border border-dashed border-rule/50 rounded text-center text-ink-soft/40 text-[11px]">
                  <span className="select-none text-surface">
                    {POISONED_INVOICE.hiddenText}
                  </span>
                  <span>(Document rendering in normal visual mode. Hidden text is zero-contrast to human eye)</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-paper/40 border-t border-rule text-[11px] font-mono text-ink-soft flex items-center justify-between">
            <span>Scanner: Quarantined isolated PDF reader</span>
            <span className="text-allow font-semibold">Taint analysis: Armed</span>
          </div>
        </div>

        {/* Right Column (6 cols): Gateway Decision Panel */}
        <div className="lg:col-span-6 space-y-5">
          {/* Proposed Call & Provenance Badges Panel */}
          <div className="panel-bordered p-5 bg-surface space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div>
                <span className="text-[10px] font-mono text-ink-soft uppercase tracking-wider block">
                  AI Agent Interception
                </span>
                <h2 className="font-heading font-semibold text-base text-ink">
                  Gateway Decision & Argument Provenance
                </h2>
              </div>

              {isProtected ? (
                <span className="status-pill status-pill-allow">
                  <ShieldCheck className="w-3 h-3 text-allow" />
                  Protected Gateway
                </span>
              ) : (
                <span className="status-pill status-pill-block">
                  <ShieldAlert className="w-3 h-3 text-block" />
                  Unprotected Raw Agent
                </span>
              )}
            </div>

            {/* Proposed Tool Call */}
            <div>
              <div className="text-xs font-mono text-ink-soft mb-1.5 flex items-center justify-between">
                <span>INTERCEPTED_TOOL_CALL</span>
                <span className="font-mono text-[10px] text-ink">pay() execution attempt</span>
              </div>
              <div className="p-3 bg-paper/60 rounded border border-rule font-mono text-xs text-ink leading-relaxed">
                <code>
                  pay(<br />
                  &nbsp;&nbsp;vendor = <span className="font-semibold text-ink">"Sharma Packaging"</span>,<br />
                  &nbsp;&nbsp;account = <span className={`font-bold ${isProtected ? 'text-block bg-block/10 px-1 rounded' : 'text-block'}`}>"{POISONED_INVOICE.attackerAccount}"</span>,<br />
                  &nbsp;&nbsp;amount = <span className="font-semibold text-ink">84000</span><br />
                  )
                </code>
              </div>
            </div>

            {/* Argument Provenance Verification Matrix (Crucial Feature) */}
            <div>
              <div className="text-xs font-mono text-ink-soft mb-2">ARGUMENT PROVENANCE BREAKDOWN</div>
              <div className="panel-bordered overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-paper/80 border-b border-rule text-ink-soft font-mono text-[10px]">
                      <th className="p-2.5">Argument</th>
                      <th className="p-2.5">Proposed Value</th>
                      <th className="p-2.5">Data Provenance Source</th>
                      <th className="p-2.5 text-right">Trust Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule/60 font-mono text-[11px]">
                    {/* vendor argument */}
                    <tr>
                      <td className="p-2.5 font-bold text-ink">vendor</td>
                      <td className="p-2.5 text-ink">Sharma Packaging</td>
                      <td className="p-2.5 text-allow font-sans font-medium">Vendor registry (trusted)</td>
                      <td className="p-2.5 text-right">
                        <span className="status-pill status-pill-allow text-[9px]">TRUSTED</span>
                      </td>
                    </tr>
                    {/* amount argument */}
                    <tr>
                      <td className="p-2.5 font-bold text-ink">amount</td>
                      <td className="p-2.5 text-ink">₹84,000</td>
                      <td className="p-2.5 text-ink-soft font-sans">Invoice (untrusted, within limit)</td>
                      <td className="p-2.5 text-right">
                        <span className="status-pill status-pill-neutral text-[9px]">VERIFIED</span>
                      </td>
                    </tr>
                    {/* account argument (The poisoned one) */}
                    <tr className={isProtected ? 'bg-block/5' : ''}>
                      <td className="p-2.5 font-bold text-block">account</td>
                      <td className="p-2.5 font-bold text-block">{POISONED_INVOICE.attackerAccount}</td>
                      <td className="p-2.5 text-block font-sans font-semibold">Invoice, hidden text (untrusted)</td>
                      <td className="p-2.5 text-right">
                        <span className="status-pill status-pill-block text-[9px]">TAINTED</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Decision Outcome Card based on Protection Toggle */}
            {isProtected ? (
              /* Protection ON: Held with Plain Language Alert */
              <div className="p-4 bg-hold/10 border-2 border-hold rounded space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-hold" />
                    <span className="font-heading font-bold text-xs text-ink uppercase tracking-wider">
                      HELD: account came from an untrusted source and differs from registry
                    </span>
                  </div>
                  <span className="status-pill status-pill-hold text-[10px]">PAYMENT HELD</span>
                </div>

                {/* Plain-language alert card */}
                <div className="p-3 bg-surface rounded border border-hold/30 text-xs text-ink leading-relaxed">
                  <p className="font-medium text-ink">
                    "Bank account changed on invoice <strong>INV-2291</strong>. It doesn't match the vendor registry. Payment held. Verify with Sharma Packaging by phone."
                  </p>
                  <div className="mt-2 text-[11px] text-ink-soft font-mono">
                    Registered: {POISONED_INVOICE.visibleAccount} &nbsp;≠&nbsp; Proposed: {POISONED_INVOICE.attackerAccount}
                  </div>
                </div>

                {/* Two Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => setDecisionActionTaken('hold')}
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                      decisionActionTaken === 'hold'
                        ? 'bg-ink text-surface'
                        : 'bg-ink text-surface hover:bg-ink/90 shadow-xs'
                    }`}
                  >
                    Hold payment
                  </button>

                  <button
                    onClick={() => setDecisionActionTaken('verify')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 bg-surface hover:bg-paper text-ink border border-rule rounded text-xs font-medium transition-all ${
                      decisionActionTaken === 'verify' ? 'bg-paper font-semibold' : ''
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-ink-soft" />
                    <span>Verify out of band</span>
                  </button>

                  {decisionActionTaken !== 'none' && (
                    <span className="text-[11px] font-mono text-allow flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Action registered
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* Protection OFF: Attack Succeeded Alert */
              <div className="p-4 bg-block/10 border-2 border-block rounded space-y-2">
                <div className="flex items-center justify-between text-block font-heading font-bold text-xs">
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-block" />
                    ATTACK SUCCEEDED: Zero Boundary Enforcement
                  </span>
                  <span className="status-pill status-pill-block text-[10px]">UNPROTECTED</span>
                </div>
                <p className="text-xs text-ink leading-relaxed">
                  The raw agent followed the hidden prompt injection and executed a bank transfer to the attacker's account (<strong>5021 XXXX 7765</strong>).
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Bank Transaction Ledger */}
      <div className="panel-bordered p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-rule">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-ink" />
            <h3 className="font-heading font-semibold text-sm text-ink">
              Corporate Bank Execution Ledger
            </h3>
          </div>
          <span className="text-xs font-mono text-ink-soft">
            Account: HDFC Current #901928310
          </span>
        </div>

        <div className="panel-bordered overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-paper/70 border-b border-rule font-mono text-ink-soft text-[10px]">
                <th className="p-2.5">Date/Time</th>
                <th className="p-2.5">Beneficiary / Memo</th>
                <th className="p-2.5">Destination Account</th>
                <th className="p-2.5">Amount</th>
                <th className="p-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/50 font-mono text-[11px]">
              {/* Benign historic transaction */}
              <tr>
                <td className="p-2.5 text-ink-soft">2026-10-02 10:14</td>
                <td className="p-2.5 text-ink font-sans">Kaveri Logistics (INV-8910)</td>
                <td className="p-2.5 text-ink-soft">6209 XXXX 8830</td>
                <td className="p-2.5 text-ink font-semibold">₹34,500</td>
                <td className="p-2.5 text-right">
                  <span className="status-pill status-pill-allow text-[9px]">SETTLED</span>
                </td>
              </tr>

              {/* The scenario row */}
              {isProtected ? (
                <tr className="bg-hold/5">
                  <td className="p-2.5 text-hold font-semibold">2026-10-02 14:22</td>
                  <td className="p-2.5 text-ink font-sans font-medium">
                    Sharma Packaging Pvt Ltd (INV-2291)
                    <span className="block text-[10px] text-hold font-sans">Held: untrusted destination override</span>
                  </td>
                  <td className="p-2.5 text-ink-soft line-through">{POISONED_INVOICE.attackerAccount}</td>
                  <td className="p-2.5 text-hold font-bold">₹84,000</td>
                  <td className="p-2.5 text-right">
                    <span className="status-pill status-pill-hold text-[9px]">HELD</span>
                  </td>
                </tr>
              ) : (
                /* Protection Off: Attack Succeeded Red Row */
                <tr className="bg-block/10">
                  <td className="p-2.5 text-block font-semibold">2026-10-02 14:22</td>
                  <td className="p-2.5 text-block font-sans font-bold">
                    Sharma Packaging Pvt Ltd (INV-2291)
                    <span className="block text-[10px] text-block font-sans font-normal">Paid to attacker account.</span>
                  </td>
                  <td className="p-2.5 text-block font-bold">{POISONED_INVOICE.attackerAccount}</td>
                  <td className="p-2.5 text-block font-bold">₹84,000</td>
                  <td className="p-2.5 text-right">
                    <span className="status-pill status-pill-block text-[9px]">COMPLETED</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
