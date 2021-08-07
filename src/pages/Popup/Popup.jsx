import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { useClassList } from '../../utils/useClassList'
import Details from './components/Details'
import About from './pages/About'
import List from './pages/List'

function deleteClass(c) {
  chrome.storage.sync.get(['list'], function (result) {
    if (!result.list) {
      return
    } else {
      const filtered = result.list.filter(
        (e) => c['Class Number'] !== e['Class Number']
      )
      chrome.storage.sync.set({ list: filtered }, function () {
        console.log('List is set to ', filtered)
      })
    }
  })
}

const Popup = () => {
  const [list, setList, isPersistent, error] = useClassList()
  const deleteClass = (c) => {
    setList((prevList) =>
      prevList.filter((e) => c['Class Number'] !== e['Class Number'])
    )
    /* chrome.storage.sync.get(['list'], function (result) {
      if (!result.list) {
        return
      } else {
        const filtered = result.list.filter(
          (e) => c['Class Number'] !== e['Class Number']
        )
        chrome.storage.sync.set({ list: filtered }, function () {
          console.log('List is set to ', filtered)
        })
      }
    }) */
  }

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
            <Details list={list} setList={setList} />
          </TabPanel>
          <TabPanel>
            <p>Calender</p>
          </TabPanel>
          <TabPanel>
            <p>Map</p>
          </TabPanel>
          <TabPanel>
            <About />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Popup
