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
import { useTheme } from '@chakra-ui/react'

const Popup = () => {
  const [list, setList, isPersistent, error] = useClassList()
  const [tempClass, setTempClass] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colors } = useTheme()

  const deleteClass = (c) => {
    setList((prevList) => prevList.filter((e) => c.id !== e.id))
  }

  // Get Class Info from Content Script
  useEffect(() => {
    window.onload = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currId = tabs[0].url.split('/').slice(-1)[0]
        console.log("🚀 ~ file: index.jsx ~ line 37 ~ currId", currId)
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
            }
          }
        )
      })
    }
  }, [onOpen])

  return (
    <Box w="100%" p={4}>
      <Tabs isFitted variant="enclosed" w="100%" defaultIndex={1}>
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
