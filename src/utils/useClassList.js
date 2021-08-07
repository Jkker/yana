import { createChromeStorageStateHookSync } from 'use-chrome-storage'
const SETTINGS_KEY = 'list'
const INITIAL_VALUE = []

export const useClassList = createChromeStorageStateHookSync(
  SETTINGS_KEY,
  INITIAL_VALUE
)

function add(val) {
  chrome.storage.sync.get({ list: [] }, (result) => {
    const temp = result.list
    temp.push(val)
    chrome.storage.sync.set({ list: temp }, function () {
      if (chrome.runtime.error) {
        console.log('Runtime error.')
      }
    })
  })
}

function deleteClass(c) {
  chrome.storage.sync.get(['list'], function (result) {
    if (!result.list) {
      return
    } else {
      const filtered = result.list.filter(
        (e) => c['Class Number'] !== e['Class Number']
      )
      chrome.storage.sync.set({ list: filtered }, function () {
        console.log('List is set to ', filtered)
      })
    }
  })
}

function get(val) {
  chrome.storage.sync.get({ list: [] }, (result) => {
    const temp = result.list
    temp.push(val)
    chrome.storage.sync.set({ list: temp }, function () {
      if (chrome.runtime.error) {
        console.log('Runtime error.')
      }
    })
  })
}
