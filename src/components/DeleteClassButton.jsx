import {
  DeleteIcon
} from '@chakra-ui/icons'
import {
  Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure
} from '@chakra-ui/react'
import { useClassList } from '@models'
import React from 'react'

export default function DeleteClassButton({
  children,
  id,
  title,
  deleteClass,
}) {
  const [list, dispatch, ACTIONS] = useClassList()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const initialFocusRef = React.useRef()

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      returnFocusOnClose
      initialFocusRef={initialFocusRef}
    >
      <PopoverTrigger>
        {children || (
          <IconButton
            title="Delete Class"
            icon={<DeleteIcon />}
            // colorScheme="red"
            // variant="outline"
          />
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <b>Delete {title}</b>
        </PopoverHeader>
        <PopoverBody>Are you sure you want to delete class {id}?</PopoverBody>
        <PopoverFooter display="flex" justifyContent="space-between">
          <Button
            title="Confirm delete"
            colorScheme="red"
            onClick={() => {
              dispatch({ type: ACTIONS.REMOVE, payload: { id } })
              onClose()
            }}
            tabIndex={2}
          >
            Delete
          </Button>
          <Button onClick={() => onClose()} ref={initialFocusRef} tabIndex={1}>
            Cancel
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
