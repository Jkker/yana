import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

export default function ClassList(props) {
  const { list, setList, deleteClass } = props;

  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>Catalog #</Th>
          <Th>Title</Th>
          <Th>Class #</Th>
          <Th>Instructor(s)</Th>
          <Th>Meets</Th>
          <Th>Dates</Th>
          <Th>Room</Th>
          <Th>Operation</Th>
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
  );
}
