import {
  TriangleDownIcon,
  TriangleUpIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import {
  Button,
  chakra,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
} from '@chakra-ui/react'
import React from 'react'
import { useSortBy, useTable, useBlockLayout } from 'react-table'
import { useSticky } from 'react-table-sticky'

export default function ClassList({ list, setList, deleteClass }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        sticky: 'left',
      },
      {
        Header: 'Catalog #',
        accessor: 'catalogNumber',
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
  const data = React.useMemo(
    () => list.map((c) => c.extendedProps ?? {}),
    [list]
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy, useBlockLayout, useSticky)

  return (
    <Table
      {...getTableProps()}
      size="sm"
      sx={{ '[data-sticky-td="true"]': { background: 'white', shadow: 'lg' } }}
    >
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
                <Td lineHeight={5} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </Td>
              ))}
              <Td
                lineHeight={5}
                gridGap={2}
                display="grid"
                sx={{ placeItems: 'center' }}
              >
                <Button
                  colorScheme="red"
                  onClick={() => deleteClass(list[idx])}
                >
                  Delete
                </Button>
                <Link href={list[idx].extendedProps.url} isExternal>
                  Albert <ExternalLinkIcon mx="2px" />
                </Link>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
