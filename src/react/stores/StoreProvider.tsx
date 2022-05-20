import { Context, createContext, ReactNode, useContext } from 'react';
import RootStore from './rootStore';

let StoreContext: Context<RootStore>;

export type TestStore = DeepPartial<RootStore>;

interface Props {
  children: ReactNode;
  store?: any;
}

function StoreProvider({ children, store = new RootStore() }: Props) {
  StoreContext = createContext(store);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);

export default StoreProvider;
