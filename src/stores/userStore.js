import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
    persist(
        (set, get) => ({
            user: null,
            setUser: user => set({ user }),
        }),
        {
            name: 'userStore',
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);

export default useUserStore;
