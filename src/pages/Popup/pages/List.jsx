import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  Button,
  chakra,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'
import { useSortBy, useTable } from 'react-table'

export default function ClassList({ list, setList, deleteClass }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Catalog #',
        accessor: 'catalogNumber',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Class #',
        accessor: 'Class Number',
      },
      {
        Header: 'Instructor(s)',
        accessor: 'Instructor(s)',
      },
      {
        Header: 'Meets',
        accessor: 'Meets',
      },
      {
        Header: 'Dates',
        accessor: 'Dates',
      },
      {
        Header: 'Room',
        accessor: 'Room',
      },
    ],
    []
  )
  const data = React.useMemo(() => list, [list])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {column.render('Header')}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
            <Th>Operations</Th>
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              ))}
              <Td>
                <Button
                  colorScheme="red"
                  onClick={() => deleteClass(list[idx])}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
