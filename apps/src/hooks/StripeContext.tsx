'use client';
import type { Dispatch, ReactNode, Reducer } from 'react';
import { createContext, useEffect, useReducer } from 'react';
// import { loadStripe } from '@stripe/stripe-js';

export type StripeState = {
  stripeLoaded: boolean;
  cart: any[];
  price: number;
  error?: Error;
};

const initialState: StripeState = {
  stripeLoaded: false,
  cart: [],
  price: 0,
};

type StripeDispatch = { type: StripeActions; payload: any };

export const StripeContext = createContext<
  [StripeState, Dispatch<StripeDispatch>]
>([
  initialState,
  () => {
    /* no op */
  },
]);

export enum StripeActions {
  SetStripeLoaded = 'SetStripeLoaded',
  SetCart = 'SetCart',
  SetPrice = 'SetPrice',
  SetError = 'SetError',
}

const reducer: Reducer<StripeState, StripeDispatch> = (state, action) => {
  switch (action.type) {
    case StripeActions.SetStripeLoaded:
      return {
        ...state,
        stripeLoaded: action.payload,
      };
    case StripeActions.SetCart:
      return {
        ...state,
        cart: action.payload,
      };
    case StripeActions.SetPrice:
      return {
        ...state,
        price: action.payload,
      };
    case StripeActions.SetError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

/**
 * Stripe context provider to handle Stripe.
 *
 * @param props - React Props.
 * @param props.children - React component to be wrapped by the Provider.
 * @returns JSX.
 */
export const StripeProvider = ({ children }: { children: ReactNode }) => {
  //const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
  //const stripePromise = loadStripe(stripePublishableKey);

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   if (stripePublishableKey !== '' && stripePromise !== undefined) {
  //     dispatch({
  //       type: StripeActions.SetStripeLoaded,
  //       payload: true,
  //     });
  //   }
  // }, [stripePublishableKey, stripePromise]);

  useEffect(() => {
    let timeoutId: number;

    if (state.error) {
      timeoutId = window.setTimeout(() => {
        dispatch({
          type: StripeActions.SetError,
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
    <StripeContext.Provider value={[state, dispatch]}>
      {children}
    </StripeContext.Provider>
  );
};
