import { LinkIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  SkeletonText,
  useToast,
  IconButton,
  HStack,
  Flex,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { RMPStatView } from './Rmp'
import ColorSelector from './ColorSelector'
import DeleteClassButton from '@components/DeleteClassButton'
import { useClassList } from '@models'

export default function CourseDetailsModal({
  isOpen,
  onOpen,
  onClose,
  tempClass,
  setTempClass,
}) {
  const [list, dispatch, ACTIONS] = useClassList()

  const [isLoading, setIsLoading] = useState(false)
  const saveTempClass = () => {
    dispatch({ type: ACTIONS.UPDATE, payload: tempClass })
    onClose()
  }

  const updateTempClass = (data) => {
    setTempClass((prevClass) => {
      if (data.extendedProps)
        return {
          ...prevClass,
          ...data,
          extendedProps: { ...prevClass?.extendedProps, ...data.extendedProps },
        }
      else return { ...prevClass, ...data }
    })
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <CourseContent
        onClose={onClose}
        isLoading={isLoading}
        tempClass={tempClass}
        saveTempClass={saveTempClass}
        updateTempClass={updateTempClass}
      />
    </Modal>
  )
}
const CourseContent = ({
  tempClass,
  saveTempClass,
  isLoading,
  updateTempClass,
  onClose,
}) => {
  if (isLoading || !tempClass) {
    return (
      <ModalContent>
        <ModalHeader>
          <SkeletonText noOfLines={1} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <SkeletonText noOfLines={6} spacing="4" />
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={saveTempClass}
            mt={4}
            colorScheme="green"
            type="submit"
            isFullWidth
            disabled
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    )
  } else
    return (
      <ModalContent>
        <ModalHeader display="flex" alignItems="center">
          <ColorSelector
            color={tempClass.color ?? tempClass.backgroundColor}
            mr={4}
            onSetColor={(color) =>
              updateTempClass({
                backgroundColor: color,
                borderColor: color,
                color: color,
              })
            }
          />
          {tempClass.extendedProps?.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <SimpleGrid
            templateColumns={'min-content 1fr'}
            spacingY={2}
            spacingX={4}
            fontSize="sm"
          >
            <Box fontWeight="medium" whiteSpace="nowrap">
              Class #
            </Box>
            <Box>{tempClass.extendedProps?.classNumber}</Box>
            <Box fontWeight="medium" whiteSpace="nowrap">
              Catalog #
            </Box>
            <Box>{tempClass.extendedProps?.catalogNumber}</Box>
            <Box fontWeight="medium" whiteSpace="nowrap">
              Dates
            </Box>
            <Box>{tempClass.extendedProps?.Dates}</Box>
            <Box fontWeight="medium" whiteSpace="nowrap">
              Meets
            </Box>
            <Box>{tempClass.extendedProps?.Meets}</Box>
            <Box fontWeight="medium" whiteSpace="nowrap">
              Instructor(s)
            </Box>
            <Box>{tempClass.extendedProps?.instructor}</Box>
            <Box fontWeight="medium" whiteSpace="nowrap">
              Room
            </Box>
            <Box>{tempClass.extendedProps?.Room}</Box>
          </SimpleGrid>
          <Box my={1} fontSize="sm" fontWeight="medium">
            Description
          </Box>
          <p>{tempClass.extendedProps?.Description}</p>

          <RMPStatView
            data={tempClass.extendedProps?.rmp}
            setData={(data) => {
              updateTempClass({ extendedProps: { rmp: data } })
            }}
          />
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          <HStack spacing={4}>
            <Button onClick={saveTempClass} colorScheme="green" type="submit">
              Save
            </Button>
            <DeleteClassButton
              id={tempClass.id}
              title={tempClass.title}
            />
          </HStack>
          <Button onClick={() => onClose()}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    )
}

function AddCourse(props) {
  const [value, setValue] = React.useState('')
  const handleChange = (event) => setValue(event.target.value)

  return (
    <>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<LinkIcon color="gray.300" />}
        />
        <Input
          value={value}
          onChange={handleChange}
          placeholder="https://m.albert.nyu.edu/app/catalog/classsection/NYUNV/1214/7609"
          type="url"
        />
      </InputGroup>
    </>
  )
}
