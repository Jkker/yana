import {
  Box,
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { createEvents } from '../../utils/scheduleUtils'
import { useClassList } from '../../utils/useClassList'
import CourseDetailsModal from './components/Details'
import './index.css'
import About from './pages/About'
import Calender from './pages/Calender'
import List from './pages/List'

const Popup = () => {
  const [list, setList, isPersistent, error] = useClassList()
  const [tempClass, setTempClass] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const deleteClass = (c) => {
    setList((prevList) =>
      prevList.filter((e) => c['Class Number'] !== e['Class Number'])
    )
  }

  // Get Class Info from Content Script
  useEffect(() => {
    window.onload = () => {
      onOpen()
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'getClassInfo' },
          (response) => {
            if (response.success) {
              // createScheduleField(response.classInfo)
              response.classInfo.event = createEvents(response.classInfo)
              setTempClass(response.classInfo)
            }
          }
        )
      })
    }
  }, [onOpen])

  return (
    <Box w="100%" p={4}>
      <Tabs isFitted variant="enclosed" w="100%">
        <TabList mb="1em">
          <Tab>List</Tab>
          <Tab>Calender</Tab>
          <Tab>Map</Tab>
          <Tab>About</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0} overflowX="scroll">
            <List list={list} setList={setList} deleteClass={deleteClass} />
          </TabPanel>
          <TabPanel>
            <Calender list={list} setList={setList} />
          </TabPanel>
          <TabPanel>
            <p>Map</p>
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
        list={list}
        setList={setList}
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
