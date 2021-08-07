import {
  Box, Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import About from './pages/About';
import Details from './pages/Details';
import List from './pages/List';

function deleteClass(c) {
  chrome.storage.sync.get(['list'], function (result) {
    if (!result.list) {
      return;
    } else {
      const filtered = result.list.filter(
        (e) => c['Class Number'] !== e['Class Number']
      );
      chrome.storage.sync.set({ list: filtered }, function () {
        console.log('List is set to ', filtered);
      });
    }
  });
}

const Popup = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
      chrome.storage.sync.get(['list'], function (result) {
        setList(result.list);
      });
    });
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
            <List list={list} setList={setList} deleteClass ={deleteClass}/>
            <Details />
          </TabPanel>
          <TabPanel>
            <p>Calender</p>
          </TabPanel>
          <TabPanel>
            <p>Map</p>
          </TabPanel>
          <TabPanel>
            <About/>

          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Popup;
