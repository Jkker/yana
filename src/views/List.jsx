import {
  ExternalLinkIcon,
  TriangleDownIcon,
  DeleteIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import DeleteClassButton from '@components/DeleteClassButton'
import RMP from '@components/Rmp'
import React from 'react'
import {
  useFlexLayout,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'
import { useSticky } from 'react-table-sticky'

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

export default function ClassList({
  list,
  setList,
  deleteClass,
  updateClass,
  showClassDetails,
}) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        sticky: 'left',
        width: 130,
        Cell: ({ row, value }) => (
          <Button
            h="full"
            w="full"
            p={2}
            whiteSpace="initial"
            verticalAlign="initial"
            textAlign="left"
            variant="unstyled"
            onClick={() => {
              showClassDetails(row.original)
            }}
          >
            {value}
          </Button>
        ),
      },
      {
        Header: 'Catalog #',
        accessor: 'extendedProps.catalogNumber',
        width: 100,
      },
      {
        Header: 'Class #',
        accessor: 'extendedProps.classNumber',
        width: 60,
      },
      {
        Header: 'Instructor(s)',
        accessor: 'extendedProps.instructor',
        width: 110,
      },
      {
        Header: 'RateMyProfessor',
        id: 'extendedProps.rmp',
        accessor: 'id',
        width: 110,
        Cell: ({ value: id, row }) => (
          <RMP
            data={row.original.extendedProps?.rmp}
            setData={(data) => updateClass(id, { rmp: data }, true)}
          />
        ),
      },
      {
        Header: 'Meets',
        accessor: 'extendedProps.Meets',
        width: 80,
      },
      {
        Header: 'Dates',
        accessor: 'extendedProps.Dates',
        width: 100,
      },
      {
        Header: 'Room',
        accessor: 'extendedProps.Room',
        width: 140,
      },
    ],
    []
  )
  // const data = React.useMemo(
  //   () => list.map((c) => ({ ...c.extendedProps, id: c.id } ?? {})),
  //   [list]
  // )
  const data = list
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data },
      useSortBy,
      useResizeColumns,
      useFlexLayout,
      useRowSelect,
      useSticky,
      (hooks) => {
        hooks.allColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: 'selection',
            disableResizing: true,
            sticky: 'left',
            minWidth: 35,
            width: 35,
            maxWidth: 35,
            hidden: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Box pl={3}>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </Box>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <Flex h="full" align="center">
                <Box bgColor={row.original.color} h="full" w={1} mr={2} />
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </Flex>
            ),
          },
          ...columns,
          {
            Header: '',
            id: 'operations',
            accessor: 'id',
            disableResizing: true,
            width: 32,
            Cell: ({ value: id, row }) => {
              return (
                <Box>
                  <DeleteClassButton
                    deleteClass={deleteClass}
                    id={id}
                    title={row.original.title}
                  >
                    <IconButton
                      size="sm"
                      title="Delete Class"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      variant="outline"
                    />
                  </DeleteClassButton>
                  <IconButton
                    size="sm"
                    icon={<ExternalLinkIcon />}
                    variant="outline"
                    colorScheme="blue"
                    mt={2}
                  />
                </Box>
              )
            },
          },
        ])
        hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
          // fix the parent group of the selection button to not be resizable
          const selectionGroupHeader = headerGroups[0].headers[0]
          selectionGroupHeader.canResize = false
        })
      }
    )

  return (
    <Table
      {...getTableProps()}
      size="sm"
      sx={{
        '[data-sticky-td="true"]': {
          background: 'white',
          shadow: 'lg',
          zIndex: 8,
        },
      }}
    >
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, idx) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
                overflow="hidden"
                whiteSpace="nowrap"
                display="flex"
                justifyContent="space-between"
                pr={0}
                pl={idx === column.length - 1 || idx === 0 ? 0 : 2}
                zIndex={2}
              >
                <Box zIndex={8}>{column.render('Header')}</Box>
                <HStack spacing={1} zIndex={9} position="relative">
                  <Box>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </Box>
                  {column.canResize && (
                    <Box
                      {...column.getResizerProps()}
                      h="full"
                      pl={1.5}
                      position="relative"
                      sx={{
                        ':after': {
                          content: '""',
                          w: '3px',
                          h: '100%',
                          bgColor: column.isResizing ? 'blue.500' : 'gray.400',
                          position: 'absolute',
                          right: '-1.5px',
                          zIndex: 10,
                        },
                      }}
                      // mr="-1p?x"
                    >
                      {/* <Box
                        w="2px"
                        h="full"
                        bgColor={column.isResizing ? 'blue.500' : 'gray.200'}
                      /> */}
                    </Box>
                  )}
                </HStack>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell, idx) => (
                <Td
                  lineHeight={5}
                  {...cell.getCellProps()}
                  display="grid"
                  alignItems="center"
                  gap={1}
                  py={0.5}
                  px={
                    idx === row.cells.length - 1 || idx === 0 || idx == 1
                      ? 0
                      : 2
                  }
                >
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
