import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ContentItem, Preferences } from "@/types/content";

const initialPreferences: Preferences = { categories: ["technology", "sports"] };

const preferencesSlice = createSlice({
  name: "preferences", initialState: initialPreferences,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => { state.categories = action.payload; }
  }
});

const contentSlice = createSlice({
  name: "content", initialState: { items: [] as ContentItem[], loading: false, error: "" },
  reducers: {
    setItems: (state, action: PayloadAction<ContentItem[]>) => { state.items = action.payload; state.error = ""; },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
    setError: (state, action: PayloadAction<string>) => { state.error = action.payload; state.loading = false; }
  }
});

const favoritesSlice = createSlice({
  name: "favorites", initialState: [] as ContentItem[],
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ContentItem>) => {
      const exists = state.some((item) => item.id === action.payload.id);
      return exists ? state.filter((item) => item.id !== action.payload.id) : [...state, action.payload];
    }
  }
});

export const { setCategories } = preferencesSlice.actions;
export const { setItems, setLoading, setError } = contentSlice.actions;
export const { toggleFavorite } = favoritesSlice.actions;

export const makeStore = () => configureStore({ reducer: { preferences: preferencesSlice.reducer, content: contentSlice.reducer, favorites: favoritesSlice.reducer } });
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
