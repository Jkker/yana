import {
  ArrowBackIcon,
  CheckIcon,
  EditIcon,
  RepeatIcon,
} from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Tag,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import { parse } from 'node-html-parser'
import React, { Fragment, useState } from 'react'
import moment from 'moment'

async function getRMPData(url) {
  try {
    const response = await fetch(url)
    const root = parse(await response.text())
    const main = root.querySelector('[class|=TeacherInfo__StyledTeacher]')

    const rating = main.querySelector('[class|=RatingValue__Numerator]').text
    const name = main.querySelector('[class|=NameTitle__Name]').text
    const tags = main.querySelectorAll('[class|=Tag]').map((tag) => tag.text)
    const feedback = main.querySelector(
      '[class|=TeacherFeedback__StyledTeacherFeedback]'
    )
    const count = main
      .querySelector('[class|=RatingValue__NumRatings]')
      ?.querySelector('a')
      ?.text.split('\xa0')?.[0]

    return {
      name,
      rating: parseInt(rating),
      count: parseInt(count),
      difficulity: parseInt(feedback.lastChild.firstChild.text),
      retake: feedback.firstChild.firstChild.text,
      tags,
      url,
      date: Date.now(),
    }
  } catch (err) {
    console.log(err)
  }
}

const listResultMap = {
  rating: 'Rating',
  count: 'Count',
  difficulity: 'Difficulty',
  retake: 'Take again',
}

export default function RMP({ data, setData }) {
  const [isLoading, setLoading] = useState(false)
  const [isEditing, setEdit] = useState(false)
  const [inputValue, setInputValue] = useState('')
  // const [data, setData] = useState()
  const addRMP = async () => {
    setLoading(true)
    const res = await getRMPData(inputValue)
    setData(res)
    setEdit(false)
    setLoading(false)
  }
  const refresh = async () => {
    setLoading(true)
    const res = await getRMPData(data.url)
    setData(res)
    setLoading(false)
  }
  if (!data || isEditing)
    return (
      <InputGroup size="sm">
        {isEditing && (
          <InputLeftElement>
            <IconButton
              borderRightRadius="0"
              size="sm"
              onClick={() => setEdit(false)}
              isLoading={isLoading}
            >
              <ArrowBackIcon />
            </IconButton>
          </InputLeftElement>
        )}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="url"
          name="url"
          placeholder="  RateMyProfessor URL"
        />
        <InputRightElement>
          <IconButton
            borderLeftRadius="0"
            size="sm"
            onClick={addRMP}
            isLoading={isLoading}
          >
            <CheckIcon />
          </IconButton>
        </InputRightElement>
      </InputGroup>
    )
  return (
    <Flex
      wrap="wrap"
      sx={{
        '.rmp-cell-data-item': {
          my: 0.25,
          mx: 0.5,
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          w: 'full',
        },
      }}
    >
      <HStack className="rmp-cell-data-item">
        <Box whiteSpace="nowrap">
          Rating
        </Box>
        <Box>{data.rating}/5</Box>
      </HStack>
      <HStack className="rmp-cell-data-item">
        <Box whiteSpace="nowrap">
          Difficulty
        </Box>
        <Box>{data.difficulity}/5</Box>
      </HStack>
      <HStack className="rmp-cell-data-item">
        <Box whiteSpace="nowrap">
          Take again
        </Box>
        <Box>{data.retake}</Box>
      </HStack>
    </Flex>
  )
}
export function RMPStatView({ data, setData }) {
  const [isLoading, setLoading] = useState(false)
  const [isEditing, setEdit] = useState(false)
  const [inputValue, setInputValue] = useState('')
  // const [data, setData] = useState()
  const addRMP = async () => {
    setLoading(true)
    const res = await getRMPData(inputValue)
    setData(res)
    setEdit(false)
    setLoading(false)
  }
  const refresh = async () => {
    setLoading(true)
    const res = await getRMPData(data.url)
    setData(res)
    setLoading(false)
  }
  if (!data || isEditing)
    return (
      <InputGroup mt={3}>
        {isEditing && (
          <InputLeftElement>
            <IconButton
              borderRightRadius="0"
              onClick={() => setEdit(false)}
              isLoading={isLoading}
            >
              <ArrowBackIcon />
            </IconButton>
          </InputLeftElement>
        )}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="url"
          name="url"
          placeholder="  RateMyProfessor URL"
        />
        <InputRightElement>
          <IconButton
            borderLeftRadius="0"
            onClick={addRMP}
            isLoading={isLoading}
          >
            <CheckIcon />
          </IconButton>
        </InputRightElement>
      </InputGroup>
    )
  return (
    <Flex wrap="wrap" mt={3}>
      <Flex justifyContent="space-between" w="full">
        <HStack>
          <Heading size="md">RateMyProfesser</Heading>
          <IconButton
            title="Edit URL"
            size="sm"
            icon={<EditIcon />}
            onClick={() => setEdit(true)}
            isLoading={isLoading}
          />
        </HStack>
        <HStack ml={1}>
          <Box fontSize="sm" color="gray.600">
            Fetched {moment(data.date).toNow(true)} ago
          </Box>
          <IconButton
            title="Refresh"
            size="sm"
            icon={<RepeatIcon />}
            onClick={refresh}
            isLoading={isLoading}
          />
        </HStack>
      </Flex>

      <StatGroup mb={2} mt={4} w="full">
        <Stat>
          <StatLabel>Rating</StatLabel>
          <StatNumber>{data.rating}/5</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Difficulty</StatLabel>
          <StatNumber>{data.difficulity}/5</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Count</StatLabel>
          <StatNumber>{data.count}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Take again</StatLabel>
          <StatNumber>{data.retake}</StatNumber>
        </Stat>
      </StatGroup>
      {data.tags && data.tags.length > 0 && (
        <Flex wrap="wrap" my={1} align="center">
          {data.tags.map((tag) => (
            <Tag key={tag} m={1}>
              {tag}
            </Tag>
          ))}
        </Flex>
      )}
    </Flex>
  )
}
