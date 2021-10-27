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
} from '@chakra-ui/react'
import React from 'react'
// import RMPSearch from './RMPSearch';
import { createEvents, INPUT_TIME_ZONE } from '../../../utils/scheduleUtils'
import { useClasses } from '../../../models/useClassList'

export default function CourseDetailsModal({
  isOpen,
  onOpen,
  onClose,
  tempClass,
  setTempClass,
  addClass,
}) {
  const addTempClassToList = (event) => {
    event.preventDefault()
    addClass(tempClass)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <CourseHeader tempClass={tempClass} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <CourseDetails tempClass={tempClass} />
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={addTempClassToList}
            mt={4}
            colorScheme="teal"
            type="submit"
            isFullWidth
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const CourseHeader = ({ tempClass }) => {
  if (!tempClass) {
    return (
      <Box>
        <SkeletonText noOfLines={1} />
      </Box>
    )
  } else return <Box>{tempClass.extendedProps?.title}</Box>
}
const CourseDetails = ({ tempClass }) => {
  if (!tempClass) {
    return (
      <Box>
        <SkeletonText noOfLines={6} spacing="4" />
      </Box>
    )
  } else
    return (
      <SimpleGrid templateColumns={'min-content 1fr'} spacingY={2} spacingX={4}>
        <Heading size="xs" whiteSpace="nowrap">
          Class #
        </Heading>
        <Box>{tempClass.extendedProps?.['Class Number']}</Box>
        <Heading size="xs" whiteSpace="nowrap">
          Catalog #
        </Heading>
        <Box>{tempClass.extendedProps?.catalogNumber}</Box>
        <Heading size="xs" whiteSpace="nowrap">
          Dates
        </Heading>
        <Box>{tempClass.extendedProps?.Dates}</Box>
        <Heading size="xs" whiteSpace="nowrap">
          Meets
        </Heading>
        <Box>{tempClass.extendedProps?.Meets}</Box>
        {/* <Heading size="xs">Schedule</Heading> */}
        {/* <Box>{tempClass.extendedProps.schedule?.toText()}</Box> */}
        {/* <RMPSearch instructors={tempClass.extendedProps['Instructor(s)']} /> */}
        {/* <Button mt={4} colorScheme="gray" type="submit" w={1 / 3}>
            View
          </Button> */}
      </SimpleGrid>
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
