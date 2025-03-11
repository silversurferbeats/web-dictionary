import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchEntry {
  word: string;
  timestamp: string;
}

interface SearchHistoryState {
  history: { user: string; searches: SearchEntry[] }[];
  addSearch: (user: string, word: string) => void;
  clearHistory: (user: string) => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      history: [],

      addSearch: (user, word) =>
        set((state) => {
          const userHistory = state.history.find((h) => h.user === user);
          const timestamp = new Date().toLocaleString();

          if (userHistory) {
            return {
              history: state.history.map((h) =>
                h.user === user
                  ? { ...h, searches: [{ word, timestamp }, ...h.searches] }
                  : h
              ),
            };
          } else {
            return {
              history: [...state.history, { user, searches: [{ word, timestamp }] }],
            };
          }
        }),

      clearHistory: (user) =>
        set((state) => ({
          history: state.history.filter((h) => h.user !== user),
        })),
    }),
    { name: "search-history" } // Guarda en localStorage
  )
);
