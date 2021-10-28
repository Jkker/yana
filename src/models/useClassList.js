import { createChromeStorageStateHookSync } from 'use-chrome-storage'
import { useEffect, useCallback, useState } from 'react'
import { useToast } from '@chakra-ui/toast'

// import { createContext } from 'react'

// const DataContext = () => {
//   const context = createContext({})
// }
// export default DataContext

const SETTINGS_KEY = 'list'
const INITIAL_VALUE = []

export const useClassList = createChromeStorageStateHookSync(
  SETTINGS_KEY,
  INITIAL_VALUE
)

export const useClasses = () => {
  const [list, setList, isPersistent, error] = useClassList()
  const toast = useToast()
  const history = []

  const deleteClass = useCallback((id) => {
    setList((prev) => {
      const event = {
        action: 'delete',
        class: prev.find((c) => c.id === id),
        success: false,
      }
      history.push(event)
      return prev.filter((c) => id !== c.id)
    })
  }, [])
  // const deleteClass = useCallback((c) => {
  //   const event = { action: 'delete', class: c, success: false }
  //   history.push(event)
  //   setList((prev) => prev.filter((e) => c.id !== e.id))
  // }, [])

  const addClass = useCallback((c) => {
    setList((prev) => {
      if (prev.find((o) => o.id === c.id)) {
        toast({
          title: `Class ${c.title} existing already`,
          status: 'info',
          duration: 5000,
          isClosable: true,
        })
        return prev
      } else {
        const event = { action: 'add', class: c, success: false }
        history.push(event)
        return [...prev, c]
      }
    })
  }, [])

  const updateClass = useCallback(
    (id, newData, updateExtendedProps = false) => {
      setList((prev) => {
        const index = prev.findIndex((c) => c.id === id)
        const event = {
          action: 'update',
          class: prev[index],
          success: false,
        }
        history.push(event)
        if (updateExtendedProps) {
          Object.assign(prev[index].extendedProps, newData)
        } else prev[index] = { ...prev[index], ...newData }
        return [...prev]
      })
    },
    []
  )

  // const getClassById = useCallback(
  //   (id) => {
  //     return list.find((e) => e.id == id)
  //   },
  //   [list]
  // )

  useEffect(() => {
    if (error) {
      console.warn('Class List Update Error\n', error)
      toast({
        title: 'Class List Update Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    if (!isPersistent) {
      console.warn('Non-Persistent Class List Update\n')
      toast({
        title: 'Non-Persistent Class List Update',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [error, isPersistent])
  const onChange = (changes) => {
    if (SETTINGS_KEY in changes && history.length > 0) {
      const event = history[history.length - 1]
      if (!event.success) {
        event.success = true
        switch (event.action) {
          case 'add': {
            toast({
              title: `Added ${event.class.title}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            break
          }
          case 'update': {
            toast({
              title: `Updated ${event.class.title}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            break
          }
          case 'delete': {
            toast({
              title: `Deleted ${event.class.title}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            break
          }
        }
      }
    }
  }

  useEffect(() => {
    chrome.storage.onChanged.addListener(onChange)
    return () => {
      chrome.storage.onChanged.removeListener(onChange)
    }
  }, [])

  return {
    list,
    setList,
    error,
    deleteClass,
    addClass,
    updateClass,
  }
}
