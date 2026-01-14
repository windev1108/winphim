import { IUser } from '@/api/auth';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


export interface IAuthStore {
  account: IUser;
  token: string;
  setUser: (data: IUser) => void;
  setToken: (data: string) => void;
  setAuth: (token: string, user: IUser) => void;
  logout: () => void;
}

const useBaseAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      account: {} as IUser,
      token: '',
      setUser: (data) => set(() => ({ account: data })),
      setToken: (data) => set(() => ({ token: data })),
      setAuth: (token, user) => set(() => ({ token, account: user })),
      logout: () => set(() => ({ account: {} as IUser, token: '' })),
    }),
    {
      name: 'account',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAuthStore = createSelectorFunctions(useBaseAuthStore);
