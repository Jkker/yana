import React from 'react'
import { SketchPicker } from 'react-color'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useTheme,
  Button,
  Portal,
  Box,
  useDisclosure,
} from '@chakra-ui/react'
const COLOR_LIST = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
]
export default function ColorSelector({ color, onSetColor, ...restProps }) {
  const { colors } = useTheme()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [currColor, setCurrColor] = React.useState(color)
  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          title="Change Color"
          size="xs"
          variant="unstyled"
          bgColor={currColor}
          {...restProps}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Box
            sx={{
              '.sketch-picker': {
                boxShadow: 'none !important',
                width: '100% !important',
                padding: '0 !important',
                borderColor: 'transparent !important',
              },
            }}
          >
            <SketchPicker
              color={currColor}
              onChange={(color) => setCurrColor(color.hex)}
              presetColors={COLOR_LIST.map((c) => colors[c][400])}
            />
          </Box>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="space-between">
          <Button
            disabled={color == currColor}
            onClick={() => {
              onSetColor(currColor)
              onClose()
            }}
            colorScheme="blue"
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
