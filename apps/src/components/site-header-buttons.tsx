'use client';
import { use, useContext, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { HeaderButtons } from './buttons';
import { AuroWalletContext, AuroWalletActions } from '@/hooks';
import { requestMinaAccounts } from '@/utils';

export const SiteHeaderButtons = () => {
  const [state, dispatch] = useContext(AuroWalletContext);
  const [network, setNetwork] = useState('');
  const [accounts, setAccounts] = useState<string[]>([]);

  const handleConnectClick = async () => {
    try {
      const results = await requestMinaAccounts();
      setAccounts(results);
      console.log('results', results);
      dispatch({
        type: AuroWalletActions.SetActiveAccount,
        payload: results[0],
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: AuroWalletActions.SetError, payload: error });
    }
  };
  return (
    <div>
      <ThemeToggle />
      <HeaderButtons state={state} onConnectClick={handleConnectClick} />
    </div>
  );
};
