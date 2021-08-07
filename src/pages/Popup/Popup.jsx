import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ClassInfo from './components/ClassInfo';
import ClassList from './components/ClassList';
import './Popup.css';

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
            <ClassList list={list} setList={setList} deleteClass ={deleteClass}/>
            <ClassInfo />
          </TabPanel>
          <TabPanel>
            <p>Calender</p>
          </TabPanel>
          <TabPanel>
            <p>Map</p>
          </TabPanel>
          <TabPanel>
            <header className="popup-header">
              <Heading>YANA</Heading>
              <Text as="em">Yet Another NYU Albert</Text>
            </header>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Popup;
