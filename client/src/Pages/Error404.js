import { Stack, Text} from '@chakra-ui/react'
import React from 'react'

export default function Error404() {
  return (
    <div>
        <Stack>
            <Text textStyle="7xl" color={'red'}>Error 404. Not Found</Text>
        </Stack>
    </div>
  )
}
