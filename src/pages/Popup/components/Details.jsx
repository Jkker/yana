import { LinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
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
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import createClassSchedule from '../../../utils/createClassSchedule'
// import RMPSearch from './RMPSearch';

export default function CourseDetails({ list, setList }) {
  const [classInfo, setClassInfo] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  const handleAdd = (event) => {
    event.preventDefault()
    setList((prev) => [...prev, classInfo])
    onClose()
  }
  // Get Class Info from Content Script
  useEffect(() => {
    window.onload = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'getClassInfo' },
          (response) => {
            if (response.success) {
              createClassSchedule(response.classInfo)
              setClassInfo(response.classInfo)
            }
          }
        )
      })
    }
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {classInfo.catalogNumber} {classInfo.title} #
          {classInfo['Class Number']}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <Box>
            <Flex justify="space-between">
              <b>Dates</b>
              <span>{classInfo.Dates}</span>
            </Flex>
            <Flex justify="space-between">
              <b>Meets</b>
              <span>{classInfo.Meets}</span>
            </Flex>
            <Flex justify="space-between">
              <b>Schedule</b>
              <span>{classInfo.schedule?.toText()}</span>
            </Flex>
            {/* <RMPSearch instructors={classInfo['Instructor(s)']} /> */}
          </Box>
          <Box>
            <Flex justify="space-between">
              {/* <Button mt={4} colorScheme="gray" type="submit" w={1 / 3}>
            View
          </Button> */}
            </Flex>
          </Box>
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
