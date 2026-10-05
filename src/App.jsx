import React, { useState, useEffect } from 'react';
import { Shell } from './components/Shell';
import { OverviewScreen } from './screens/OverviewScreen';
import { OutboundScreen } from './screens/OutboundScreen';
import { InboundScreen } from './screens/InboundScreen';
import { SentinelScreen } from './screens/SentinelScreen';
import { AuditScreen } from './screens/AuditScreen';
import { ResultsScreen } from './screens/ResultsScreen';

export default function App() {
  // Read initial query params from URL (e.g. ?screen=inbound&state=final&protected=true)
  const queryParams = new URLSearchParams(window.location.search);
  const initialScreen = queryParams.get('screen') || 'inbound'; // Default to Hero inbound screen or overview
  const initialFinalState = queryParams.get('state') === 'final';
  const initialProtected = queryParams.get('protected') !== 'false'; // Default to true (Protected)

  const [activeScreen, setActiveScreen] = useState(initialScreen);
  const [isProtected, setIsProtected] = useState(initialProtected);
  const [isFinalState, setIsFinalState] = useState(initialFinalState);

  // Keep URL query params synced for easy bookmarking and screenshot URLs
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('screen', activeScreen);
    params.set('protected', isProtected.toString());
    if (isFinalState) {
      params.set('state', 'final');
    } else {
      params.delete('state');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [activeScreen, isProtected, isFinalState]);

  const handleResetAll = () => {
    setIsFinalState(false);
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'overview':
        return <OverviewScreen isFinalState={isFinalState} />;
      case 'outbound':
        return <OutboundScreen isFinalState={isFinalState} />;
      case 'inbound':
        return (
          <InboundScreen 
            isProtected={isProtected} 
            setIsProtected={setIsProtected} 
            isFinalState={isFinalState} 
          />
        );
      case 'sentinel':
        return <SentinelScreen isFinalState={isFinalState} />;
      case 'audit':
        return <AuditScreen isFinalState={isFinalState} />;
      case 'results':
        return <ResultsScreen isFinalState={isFinalState} />;
      default:
        return <OverviewScreen isFinalState={isFinalState} />;
    }
  };

  return (
    <Shell
      activeScreen={activeScreen}
      setActiveScreen={setActiveScreen}
      isProtected={isProtected}
      setIsProtected={setIsProtected}
      isFinalState={isFinalState}
      setIsFinalState={setIsFinalState}
      onResetAll={handleResetAll}
    >
      {renderActiveScreen()}
    </Shell>
  );
}
