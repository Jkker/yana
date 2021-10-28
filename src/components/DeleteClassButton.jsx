import React from 'react'
import {
  Button,
  chakra,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  HStack,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ExternalLinkIcon,
  DeleteIcon,
} from '@chakra-ui/icons'
export default function DeleteClassButton({
  children,
  id,
  title,
  deleteClass,
}) {
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
              deleteClass(id)
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
