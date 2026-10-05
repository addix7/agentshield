import React, { useState, useEffect } from 'react';
import { AUDIT_ENTRIES } from '../data/mockData';
import { 
  FileText, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  Lock, 
  Fingerprint, 
  AlertTriangle,
  Bug
} from 'lucide-react';

export function AuditScreen({ isFinalState }) {
  const [entries, setEntries] = useState(AUDIT_ENTRIES);
  const [verifiedCount, setVerifiedCount] = useState(isFinalState ? AUDIT_ENTRIES.length : 0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTampered, setIsTampered] = useState(false);
  const [tamperedIndex, setTamperedIndex] = useState(-1);

  // Sync with isFinalState
  useEffect(() => {
    if (isFinalState) {
      setEntries(AUDIT_ENTRIES);
      setVerifiedCount(AUDIT_ENTRIES.length);
      setIsTampered(false);
      setTamperedIndex(-1);
    }
  }, [isFinalState]);

  const handleVerifyChain = () => {
    setIsVerifying(true);
    setVerifiedCount(0);

    let current = 0;
    const interval = setInterval(() => {
      if (isTampered && current >= tamperedIndex) {
        clearInterval(interval);
        setIsVerifying(false);
        return;
      }

      current++;
      setVerifiedCount(current);

      if (current >= entries.length) {
        clearInterval(interval);
        setIsVerifying(false);
      }
    }, 120);
  };

  const handleTamperTest = () => {
    // Corrupt entry #4 (pay_requested)
    const corrupted = AUDIT_ENTRIES.map((item, idx) => {
      if (idx === 3) {
        return {
          ...item,
          hash: 'deadbeef', // Corrupt the hash
          detail: '[TAMPERED] Agent memory silently modified by unauthorized thread injection.',
        };
      }
      return item;
    });

    setEntries(corrupted);
    setIsTampered(true);
    setTamperedIndex(3);
    setVerifiedCount(0);
  };

  const handleReset = () => {
    setEntries(AUDIT_ENTRIES);
    setVerifiedCount(0);
    setIsVerifying(false);
    setIsTampered(false);
    setTamperedIndex(-1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-ink text-surface rounded">
              Cryptographic Provenance
            </span>
            <span className="text-xs text-ink-soft font-mono">
              SHA-256 Hash-Chained Immutable Audit Stream
            </span>
          </div>
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-ink tracking-tight">
            Audit Log & Execution Integrity
          </h1>
          <p className="text-ink-soft text-sm mt-0.5 max-w-3xl">
            Every boundary decision, tokenization step, and tool execution is linked cryptographically in a backward-pointer hash chain. Any tampering breaks subsequent hashes deterministically.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleVerifyChain}
            disabled={isVerifying}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-ink text-surface hover:bg-ink/90 rounded text-xs font-medium transition-colors disabled:opacity-50 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verify chain</span>
          </button>

          <button
            onClick={handleTamperTest}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-paper hover:bg-block/10 text-block rounded text-xs font-medium transition-colors border border-block/30"
            title="Inject corrupted payload into entry #4 to test cryptographic breakage"
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Tamper test</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 bg-paper hover:bg-rule/40 text-ink-soft hover:text-ink rounded text-xs border border-rule"
            title="Reset audit log"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Verification Status Banner */}
      <div className="panel-flat p-4 border border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isTampered && verifiedCount >= tamperedIndex 
              ? 'bg-block/15 text-block' 
              : verifiedCount === entries.length || isFinalState
              ? 'bg-allow/15 text-allow'
              : 'bg-paper text-ink-soft border border-rule'
          }`}>
            {isTampered && verifiedCount >= tamperedIndex ? (
              <XCircle className="w-4 h-4" />
            ) : verifiedCount === entries.length || isFinalState ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Fingerprint className="w-4 h-4" />
            )}
          </div>

          <div>
            <div className="font-heading font-bold text-sm text-ink">
              {isTampered && verifiedCount >= tamperedIndex ? (
                <span className="text-block">Cryptographic Verification Failed at Row 4</span>
              ) : verifiedCount === entries.length || isFinalState ? (
                <span className="text-allow">Chain intact. 10 of 10 entries verified.</span>
              ) : (
                <span>Hash Chain Ready for Verification</span>
              )}
            </div>
            <div className="text-[11px] text-ink-soft font-mono mt-0.5">
              Root Anchor: <code>0x4a91...e201</code> | Linked Parent Hash Mode: SHA256(Record || PrevHash)
            </div>
          </div>
        </div>

        <div className="font-mono text-[11px] text-ink shrink-0 bg-surface px-3 py-1.5 rounded border border-rule">
          Verified: <strong className="text-allow">{verifiedCount}</strong> / {entries.length} records
        </div>
      </div>

      {/* Hash Chained Table */}
      <div className="panel-bordered overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-paper/80 border-b border-rule font-mono text-ink-soft text-[11px]">
              <th className="p-3 w-12 text-center">#</th>
              <th className="p-3">Time</th>
              <th className="p-3">Event</th>
              <th className="p-3">Source</th>
              <th className="p-3">Decision</th>
              <th className="p-3 font-mono">Hash</th>
              <th className="p-3 font-mono">Previous hash</th>
              <th className="p-3 text-right">Integrity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule/60 font-mono text-[11px]">
            {entries.map((item, idx) => {
              const isVerified = (idx < verifiedCount) || (isFinalState && !isTampered);
              const isCorruptedRow = isTampered && idx === tamperedIndex;
              const isBrokenDownstream = isTampered && idx > tamperedIndex;

              let rowClass = 'hover:bg-paper/30';
              if (isCorruptedRow) rowClass = 'bg-block/15 text-block';
              else if (isBrokenDownstream) rowClass = 'bg-block/5 opacity-70';

              let decisionBadge = 'status-pill status-pill-neutral';
              if (item.decision === 'ALLOW') decisionBadge = 'status-pill status-pill-allow';
              else if (item.decision === 'BLOCK' || item.decision === 'CONTAIN') decisionBadge = 'status-pill status-pill-block';
              else if (item.decision === 'HELD' || item.decision === 'HOLD' || item.decision === 'FLAG') decisionBadge = 'status-pill status-pill-hold';

              return (
                <tr key={item.id} className={`transition-colors ${rowClass}`}>
                  <td className="p-3 text-center text-ink-soft font-semibold">{item.id}</td>
                  <td className="p-3 text-ink-soft">{item.time}</td>
                  <td className="p-3 font-bold text-ink font-sans">{item.event}</td>
                  <td className="p-3 text-ink-soft">{item.source}</td>
                  <td className="p-3">
                    <span className={`${decisionBadge} text-[9px]`}>
                      {item.decision}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-ink">
                    <code className={isCorruptedRow ? 'text-block font-bold' : ''}>
                      {item.hash}
                    </code>
                  </td>
                  <td className="p-3 text-ink-soft">
                    <code>{item.prevHash}</code>
                  </td>
                  <td className="p-3 text-right">
                    {isCorruptedRow ? (
                      <span className="status-pill status-pill-block text-[9px]">
                        CORRUPTED
                      </span>
                    ) : isBrokenDownstream ? (
                      <span className="status-pill status-pill-block text-[9px]">
                        CHAIN BROKEN
                      </span>
                    ) : isVerified ? (
                      <span className="status-pill status-pill-allow text-[9px]">
                        VALID
                      </span>
                    ) : (
                      <span className="text-ink-soft text-[10px]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-ink-soft">
        <span>Auditable by external compliance frameworks (SOC2 Type II, ISO 27001, FedRAMP).</span>
        <span className="font-mono text-[11px] text-ink">Zero storage of sensitive payload text</span>
      </div>
    </div>
  );
}
