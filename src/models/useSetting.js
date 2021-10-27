import { createChromeStorageStateHookSync } from 'use-chrome-storage'
import semester from '@data/semester'

const SETTINGS_KEY = 'settings'
const INITIAL_VALUE = { tab: 1 }

export const useSetting = createChromeStorageStateHookSync(
  SETTINGS_KEY,
  INITIAL_VALUE
)

export const useTabIndex = createChromeStorageStateHookSync('tabIndex', 1)
export const useSemester = createChromeStorageStateHookSync('semester', 'S22')
