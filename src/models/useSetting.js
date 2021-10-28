import { createChromeStorageStateHookLocal } from 'use-chrome-storage'
import semester from '@data/semester'

const SETTINGS_KEY = 'settings'
const INITIAL_VALUE = { tab: 1 }

export const useSetting = createChromeStorageStateHookLocal(
  SETTINGS_KEY,
  INITIAL_VALUE
)

export const useTabIndex = createChromeStorageStateHookLocal('tabIndex', 1)
export const useSemester = createChromeStorageStateHookLocal('semester', 'S22')
