import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Select,
  Button,
  Portal,
} from '@chakra-ui/react'
import options from '@data/semester'
import { CalendarIcon } from '@chakra-ui/icons'

export default function SemesterSelector({ value, onChange }) {
  return (
    <Menu closeOnSelect autoSelect={false}>
      <MenuButton as={Button} leftIcon={<CalendarIcon />} minW="90px">
        {value}
      </MenuButton>
      <MenuList w="100%" minW="max-content" zIndex={10}>
        {Object.entries(options).map(([key, semester]) => (
          <MenuItem
            key={key}
            onClick={() => onChange(key)}
            fontSize="sm"
            textAlign="justify"
          >
            {semester.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
