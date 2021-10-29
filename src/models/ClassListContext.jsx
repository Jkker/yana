import { useToast } from '@chakra-ui/toast'
import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react'
import {
  createChromeStorageStateHookLocal,
  createChromeStorageStateHookSync,
} from 'use-chrome-storage'
import React from 'react'

export const ClassListContext = createContext()
export const useClassList = () => useContext(ClassListContext)

export const ACTIONS = {
  ADD: 'Added',
  REMOVE: 'Removed',
  UPDATE: 'Updated',
  UPDATE_EXTENDED_PROPS: 'Updated Extended Props',
}
const SETTINGS_KEY = 'ClassList'
export const useChromeStorageClassList =
  createChromeStorageStateHookLocal(SETTINGS_KEY, {})

export const ClassListProvider = ({ children }) => {
  const [state, setState, isPersistent, error] = useChromeStorageClassList()

  const toast = useToast()

  const history = useRef([])

  const reducer = useCallback((state = {}, action = {}) => {
    const event = action
    const payload = action.payload ?? {}
    let ret = state

    try {
      const id = payload.id
      const { [id]: target, ...rest } = state
      event.target = target
      switch (action.type) {
        case ACTIONS.ADD: {
          if (target) {
            throw new Error(`#${id} ${target?.title} already exists`)
          }
          ret = { ...state, [id]: payload }
          break
        }
        case ACTIONS.REMOVE: {
          if (!target) {
            throw new Error(`#${id} ${payload.title} does not exist`)
          }
          ret = rest
          break
        }
        case ACTIONS.UPDATE: {
          const updated = payload.extendedProps
            ? {
                ...target,
                ...payload,
                extendedProps: {
                  ...target?.extendedProps,
                  ...payload.extendedProps,
                },
              }
            : { ...target, ...payload }
          event.payload = updated
          ret = { ...rest, [id]: updated }
          break
        }
        case ACTIONS.UPDATE_EXTENDED_PROPS: {
          const updated = {
            ...target,
            ...payload,
            extendedProps: {
              ...target?.extendedProps,
              ...payload.extendedProps,
            },
          }
          event.payload = updated
          ret = { ...rest, [id]: updated }
          break
        }
        default:
          throw new Error(`Unknown action ${action.type}`)
      }
    } catch (error) {
      event.error = error
      toast({
        title: 'Class List Update Error',
        description: event.error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      console.log(event)
      history.current.push(event)
      return ret
    }
  }, [])

  const dispatch = useCallback(
    (action) => {
      if (typeof action === 'function') {
        action(dispatch)
      } else {
        setState((prevState) => reducer(prevState, action))
      }
    },
    [setState]
  )

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

  // Confirm change to local storage
  const onChange = (changes) => {
    if (SETTINGS_KEY in changes && history.current.length > 0) {
      const event = history.current[history.current.length - 1]

      if (!event.success) {
        if (event.error) {
          toast({
            title: 'Class List Update Error',
            description: event.error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
          return
        }
        event.success = true
        toast({
          title: `${event.type} #${event.payload.id} ${
            event.target?.title || event.payload?.title
          }`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }
  // Change listener
  useEffect(() => {
    chrome.storage.onChanged.addListener(onChange)
    return () => {
      chrome.storage.onChanged.removeListener(onChange)
    }
  }, [])

  const list = React.useMemo(
    () => Object.entries(state ?? []).map(([id, c]) => c),
    [state]
  )

  return (
    <ClassListContext.Provider value={[list, dispatch, ACTIONS, state]}>
      {children}
    </ClassListContext.Provider>
  )
}
