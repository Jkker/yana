import { LinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button, Heading, Input,
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
  SkeletonText
} from '@chakra-ui/react'
import React from 'react'
// import RMPSearch from './RMPSearch';

export default function CourseDetailsModal({
  list,
  setList,
  isOpen,
  onOpen,
  onClose,
  tempClass,
  setTempClass,
}) {
  const handleAdd = (event) => {
    event.preventDefault()
    setList((prev) => [...prev, tempClass])
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
            onClick={handleAdd}
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
  } else
    return (
      <Box>
        {tempClass.catalogNumber} {tempClass.title} #{tempClass['Class Number']}
      </Box>
    )
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
      <SimpleGrid templateColumns={'min-content 1fr'} spacing={10}>
        <Heading size="xs">Dates</Heading>
        <Box>{tempClass.Dates}</Box>
        <Heading size="xs">Meets</Heading>
        <Box>{tempClass.Meets}</Box>
        <Heading size="xs">Schedule</Heading>
        {/* <Box>{tempClass.schedule?.toText()}</Box> */}
        {/* <RMPSearch instructors={classInfo['Instructor(s)']} /> */}
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
