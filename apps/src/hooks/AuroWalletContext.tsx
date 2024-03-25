'use client';
import type { Dispatch, ReactNode, Reducer } from 'react';
import { createContext, useEffect, useReducer } from 'react';

import { detectAuro } from '../utils';

export type AuroWalletState = {
  auroDetected: boolean;
  error?: Error;
};

const initialState: AuroWalletState = {
  auroDetected: false,
};

type AuroWalletDispatch = { type: AuroWalletActions; payload: any };

export const AuroWalletContext = createContext<
  [AuroWalletState, Dispatch<AuroWalletDispatch>]
>([
  initialState,
  () => {
    /* no op */
  },
]);

export enum AuroWalletActions {
  SetAuroDetected = 'SetAuroDetected',
  SetActiveAccount = 'SetActiveAccount',
  SetListAccounts = 'SetListAccounts',
  SetError = 'SetError',
}

const reducer: Reducer<AuroWalletState, AuroWalletDispatch> = (
  state,
  action
) => {
  switch (action.type) {
    case AuroWalletActions.SetAuroDetected:
      return {
        ...state,
        auroDetected: action.payload,
      };
    case AuroWalletActions.SetActiveAccount:
      return {
        ...state,
        activeAccount: action.payload,
        balance: action.payload,
        accountName: action.payload,
        inferredNonce: action.payload,
      };
    case AuroWalletActions.SetListAccounts:
      return {
        ...state,
        accounts: action.payload,
      };
    case AuroWalletActions.SetError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

/**
 * AuroWallet context provider to handle AuroWallet.
 *
 * @param props - React Props.
 * @param props.children - React component to be wrapped by the Provider.
 * @returns JSX.
 */
export const AuroWalletProvider = ({ children }: { children: ReactNode }) => {
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // Find AuroWallet Provider
  useEffect(() => {
    const detected = detectAuro();
    console.log('detected', detected);
    const setAuroCompatibility = async () => {
      dispatch({
        type: AuroWalletActions.SetAuroDetected,
        payload: detectAuro(),
      });
    };

    setAuroCompatibility().catch(console.error);
  }, [(window as any).mina]);

  useEffect(() => {
    let timeoutId: number;

    if (state.error) {
      timeoutId = window.setTimeout(() => {
        dispatch({
          type: AuroWalletActions.SetError,
          payload: undefined,
        });
      }, 10000);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [state.error]);

  return (
    <AuroWalletContext.Provider value={[state, dispatch]}>
      {children}
    </AuroWalletContext.Provider>
  );
};
