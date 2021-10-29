import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useTheme,
  useToast,
} from '@chakra-ui/react'
import CourseDetailsModal from '@components/CourseDetails'
import SemesterSelector from '@components/SemesterSelector'
import semesterList from '@data/semester'
import { useSemester, useTabIndex, useClassList } from '@models'
import { createEvents } from '@utils/scheduleUtils'
import About from '@views/About'
import Calender from '@views/Calender'
import ListView from '@views/List'
import React, { useEffect, useRef, useState } from 'react'

export default function Popup() {
  const [classList, dispatch, ACTIONS, state] = useClassList()

  const [tempClass, setTempClass] = useState(null)
  const [tabIndex, setTabIndex] = useTabIndex()
  const [semester, setSemester] = useSemester()
  const { colors } = useTheme()
  const calendarRef = useRef()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const calendarApi = calendarRef.current?.getApi()

  const handleAddClassBtn = () => {
    onOpen()
  }

  // Get Class Info from Content Script
  useEffect(() => {
    window.onload = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url
        if (url.includes('https://m.albert.nyu.edu/app/catalog/classsection')) {
          onOpen()
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: 'getClassInfo' },
            (response) => {
              if (response?.success) {
                setTempClass(createEvents(response.classInfo, colors))
              } else {
                toast({
                  title: 'GetClassInfo Error',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
              }
            }
          )
        }
      })
    }
  }, [onOpen])

  // Load semester
  useEffect(() => {
    if (semester && calendarRef.current) {
      calendarRef.current?.getApi().gotoDate(semesterList[semester].beginDate)
    }
  }, [semester])

  const showClassDetails = (value) => {
    setTempClass(value)
    onOpen()
  }

  return (
    <Box w="100%" p={4}>
      <Tabs
        isFitted
        variant="enclosed"
        w="100%"
        index={tabIndex}
        onChange={(index) => {
          setTabIndex(index)
        }}
      >
        <TabList mb="1em">
          <SemesterSelector
            value={semester}
            onChange={setSemester}
            calendarApi={calendarApi}
          />
          <Tab>List</Tab>
          <Tab>Calender</Tab>
          <Tab>Map</Tab>
          <Tab>Dev</Tab>
          <Tab>About</Tab>
          <IconButton
            onClick={handleAddClassBtn}
            icon={<AddIcon />}
            colorScheme="blue"
          />
        </TabList>
        <TabPanels>
          <TabPanel p={0} overflowX="auto">
            <ListView showClassDetails={showClassDetails} />
          </TabPanel>
          <TabPanel p={0}>
            <Calender
              calendarRef={calendarRef}
              showClassDetails={showClassDetails}
            />
          </TabPanel>
          <TabPanel>
            <p>Map</p>
          </TabPanel>
          <TabPanel>
            <h3>State</h3>
            <div>{JSON.stringify(state, null, 2)}</div>
            <h3>Semester</h3>
            <p>{semester}</p>
          </TabPanel>
          <TabPanel>
            <About />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <CourseDetailsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        tempClass={tempClass}
        setTempClass={setTempClass}
      />
    </Box>
  )
}
