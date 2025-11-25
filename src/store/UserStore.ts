import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface IToken {
  refreshToken: string;
  accessToken: string;
  tokenExpired: number;
}

interface IUser {
  name: string
}

export interface IMeQueryStore {
  account: IUser;
  token: IToken;
  setUser: (data: IUser) => void;
  setToken: (data: IToken) => void;
  logout: () => void;
}

const useBaseUserStore = create<IMeQueryStore>()(
  persist(
    (set) => ({
      account: {} as IUser,
      token: {} as IToken,
      setUser: (data) => set(() => ({ account: data })),
      setToken: (data) => set(() => ({ token: data })),
      logout: () => set(() => ({ account: {} as IUser, token: {} as IToken })),
    }),
    {
      name: 'account',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUserStore = createSelectorFunctions(useBaseUserStore);
