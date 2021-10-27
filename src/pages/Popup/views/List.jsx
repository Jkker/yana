import {
  TriangleDownIcon,
  TriangleUpIcon,
  ExternalLinkIcon,
  DeleteIcon,
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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
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
        Cell: ({ row, value }) => (
          <Link href={row.original.url} isExternal>
            {value} <ExternalLinkIcon mx="2px" />
          </Link>
        ),
      },
      {
        Header: 'Catalog #',
        accessor: 'catalogNumber',
      },
      {
        Header: 'Class #',
        accessor: 'Class Number',
        width: 100,
      },
      {
        Header: 'Instructor(s)',
        accessor: 'Instructor(s)',
      },
      {
        Header: 'Meets',
        accessor: 'Meets',
        width: 100,
      },
      {
        Header: 'Dates',
        accessor: 'Dates',
        width: 110,
      },
      {
        Header: 'Room',
        accessor: 'Room',
      },
      {
        Header: '',
        id: 'operations',
        accessor: 'Class Number',
        width: 50,
        Cell: ({ value, row }) => {
          console.log(row.original)
          return (
            <Popover>
              <PopoverTrigger>
                <IconButton size="sm" icon={<DeleteIcon />} colorScheme="red" />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  <b>Delete {row.original.title}</b>
                </PopoverHeader>
                <PopoverBody>
                  Are you sure you want to delete class {value}?
                </PopoverBody>
                <PopoverFooter d="flex" justifyContent="flex-end">
                  <Button
                    colorScheme="red"
                    onClick={() =>
                      deleteClass({
                        id: value,
                        title: row.original.title,
                      })
                    }
                  >
                    Delete
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          )
        },
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
                display="flex"
                justifyContent="space-between"
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
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
