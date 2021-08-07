import { createChromeStorageStateHookSync } from 'use-chrome-storage'
const SETTINGS_KEY = 'list'
const INITIAL_VALUE = []

export const useClassList = createChromeStorageStateHookSync(
  SETTINGS_KEY,
  INITIAL_VALUE
)
