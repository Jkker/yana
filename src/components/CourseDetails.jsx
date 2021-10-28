import { LinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
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
  Grid,
  Tag,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RMPStatView } from './Rmp'

export default function CourseDetailsModal({
  isOpen,
  onOpen,
  onClose,
  tempClass,
  setTempClass,
  addClass,
  updateClass,
}) {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const saveTempClass = (event) => {
    event.preventDefault()
    addClass(tempClass)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <CourseContent
        isLoading={isLoading}
        tempClass={tempClass}
        saveTempClass={saveTempClass}
        updateClass={updateClass}
      />
    </Modal>
  )
}
const CourseContent = ({
  tempClass,
  saveTempClass,
  isLoading,
  updateClass,
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
        <ModalHeader>
          <Box>{tempClass.extendedProps?.title}</Box>
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
          </SimpleGrid>

          <RMPStatView
            data={tempClass.extendedProps?.rmp}
            setData={(data) => updateClass(tempClass.id, { rmp: data }, true)}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={saveTempClass}
            mt={4}
            colorScheme="green"
            type="submit"
            isFullWidth
          >
            Save
          </Button>
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
