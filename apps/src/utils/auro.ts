interface CustomWindow extends Window {
  mina?: any;
}

export const detectAuro = () => {
  if (
    typeof window !== 'undefined' &&
    typeof (window as CustomWindow).mina !== 'undefined'
  ) {
    return true;
  } else {
    return false;
  }
};

export async function requestMinaAccounts() {
  const account: string[] = await (window as CustomWindow).mina
    .requestAccounts()
    .catch((err: any) => err);
  return account;
}
