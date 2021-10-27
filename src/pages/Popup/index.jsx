import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  ChakraProvider,
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
import { useClasses, useSemester, useTabIndex } from '@models'
import React, { useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
import { createEvents } from '../../utils/scheduleUtils'
import CourseDetailsModal from './components/CourseDetails'
import SemesterSelector from './components/SemesterSelector'
import './index.css'
import About from './views/About'
import Calender from './views/Calender'
import List from './views/List'
import semesterList from '@data/semester'

const Popup = () => {
  const { list, setList, deleteClass, addClass, updateClass } = useClasses()
  const [tempClass, setTempClass] = useState({})
  const [tabIndex, setTabIndex] = useTabIndex()
  const [semester, setSemester] = useSemester()
  const { colors } = useTheme()
  const calendarRef = useRef()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const calendarApi = calendarRef.current?.getApi()
  const showClassPopup = () =>
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currId = tabs[0].url.split('/').slice(-1)[0]
      for (let c in list) {
        if (c.id === currId) {
          return
        }
      }
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'getClassInfo' },
        (response) => {
          if (response.success) {
            setTempClass(createEvents(response.classInfo, colors))
            onOpen()
          } else {
            toast(err, { type: 'error' })
          }
        }
      )
    })

  // Get Class Info from Content Script
  useEffect(() => {
    window.onload = () => {
      showClassPopup()
    }
  }, [onOpen])
  // Load semester
  useEffect(() => {
    if (semester && calendarRef.current) {
      console.log('initialDate', semesterList[semester].beginDate)
      calendarRef.current?.getApi().gotoDate(semesterList[semester].beginDate)
    }
  }, [semester])
  return (
    <Box w="100%" p={4}>
      <Tabs
        isFitted
        variant="enclosed"
        w="100%"
        index={tabIndex}
        onChange={(index) => {
          setTabIndex(index)
          console.log('setTabIndex', index)
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
            onClick={showClassPopup}
            icon={<AddIcon />}
            colorScheme="blue"
          />
        </TabList>
        <TabPanels>
          <TabPanel p={0} overflowX="scroll">
            <List list={list} setList={setList} deleteClass={deleteClass} />
          </TabPanel>
          <TabPanel>
            <Calender list={list} setList={setList} calendarRef={calendarRef} />
          </TabPanel>
          <TabPanel>
            <p>Map</p>
          </TabPanel>
          <TabPanel>
            <h3>List</h3>
            <div>{JSON.stringify(list, null, 2)}</div>
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
        addClass={addClass}
        onOpen={onOpen}
        onClose={onClose}
        tempClass={tempClass}
        setTempClass={setTempClass}
      />
    </Box>
  )
}

render(
  <ChakraProvider>
    <Popup />
  </ChakraProvider>,
  window.document.querySelector('#app-container')
)

if (module.hot) module.hot.accept()
