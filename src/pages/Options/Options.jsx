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
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { createEvents } from '@utils/scheduleUtils'
import CourseDetailsModal from '@components/CourseDetails'
import SemesterSelector from '@components/SemesterSelector'
import './index.css'
import About from '@views/About'
import Calender from '@views/Calender'
import ListView from '@views/List'
import semesterList from '@data/semester'

const OptionsPage = () => {
  const { list, setList, deleteClass, addClass, updateClass } = useClasses()
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

  const showClassDetails = (value) => {
    setTempClass(value)
    onOpen()
  }

  // Load semester
  useEffect(() => {
    if (semester && calendarRef.current) {
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
          {/* <Tab>Map</Tab> */}
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
            <ListView
              list={list}
              setList={setList}
              deleteClass={deleteClass}
              updateClass={updateClass}
              showClassDetails={showClassDetails}
            />
          </TabPanel>
          <TabPanel>
            <Calender
              list={list}
              setList={setList}
              calendarRef={calendarRef}
              showClassDetails={showClassDetails}
            />
          </TabPanel>
          {/* <TabPanel>
            <p>Map</p>
          </TabPanel> */}
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
        updateClass={updateClass}
      />
    </Box>
  )
}

export default OptionsPage
