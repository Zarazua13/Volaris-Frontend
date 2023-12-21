import { configureStore } from '@reduxjs/toolkit'

import { responsivesSlice } from './responsives'
import { settingsSlice } from './settings/slice'

export const store = configureStore({
  reducer: {
    responsives: responsivesSlice.reducer,
    settings: settingsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>