import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const columns = [
  'Catalog #',
  'Title',
  'Class #',
  'Instructor(s)',
  'Meets',
  'Dates',
  'Room',
  'Operation',
]

export default function ClassList({ list, setList, deleteClass }) {
  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          {columns.map((column, idx) => (
            <Th key={`class-list-column-${idx}`}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {list.map((c) => (
          <Tr>
            <Td>{c.catalogNumber}</Td>
            <Td>{c.title}</Td>
            <Td>{c['Class Number']}</Td>
            <Td>{c['Instructor(s)']}</Td>
            <Td>{c.Meets}</Td>
            <Td>{c.Dates}</Td>
            <Td>{c.Room}</Td>
            <Td>
              <Button colorScheme="red" onClick={() => deleteClass(c)}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
