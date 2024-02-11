'use client'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Tooltip,
} from '@chakra-ui/react'
import AceEditor from 'react-ace'
import { chainInfo } from '@/app/constants'
import { CustomTab } from './CustomTab'
import { CopyButton } from './copy/CopyButton'
import { CustomIcon } from './icon/CustomIcon'

import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-sh'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/theme-pastel_on_dark'

const CodeSnippet = ({
  network,
  base,
  quote,
}: {
  network: string
  base: string
  quote: string
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const codeSnippets: Record<
    string,
    { name: string; mode: string; snippet: string }[]
  > = {
    query: [
      {
        name: 'CLI',
        mode: 'sh',
        snippet: `curl -X GET "${chainInfo[network].lcd}/slinky/oracle/v1/get_price?currency_pair_id=${base}/${quote}"`,
      },
      {
        name: 'Axios',
        mode: 'javascript',
        snippet: `const axios = require('axios');\n
const lcdURL = "${chainInfo[network].lcd}"
const { data: { price }} = await axios.get("${chainInfo[network].lcd}/slinky/oracle/v1/get_price?currency_pair_id=${base}/${quote}")
`,
      },
    ],
  }

  return (
    <>
      <Tooltip label='Code Snippet' placement='top'>
        <div
          className='flex items-center w-8 h-8 justify-center cursor-pointer rounded-md hover:bg-gray-700 hover:bg-opacity-50 transition-all ease-in-out'
          onClick={onOpen}
        >
          <CustomIcon name='code' boxSize={5} color='gray.600' />
        </div>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='4xl'>
        <ModalOverlay />
        <ModalContent w='840px'>
          <ModalHeader display='flex' flexDirection='row'>
            <CustomIcon name='code' boxSize={6} color='gray.600' />
            <div className='text-2xl text-gray-100'>Code Snippet</div>
          </ModalHeader>
          <ModalCloseButton
            color='gray.600'
            className='flex items-center w-8 h-8 justify-center cursor-pointer rounded-md hover:bg-gray-700 hover:bg-opacity-50 transition-all ease-in-out'
          />
          <ModalBody px={4} pt={0} maxH='480px' overflow='scroll'>
            <Tabs>
              <TabList borderBottom='1px solid' borderColor='gray.700'>
                {codeSnippets.query.map((item) => (
                  <CustomTab key={`menu-${item.name}`}>{item.name}</CustomTab>
                ))}
              </TabList>
              <TabPanels>
                {codeSnippets.query.map((item) => (
                  <TabPanel key={item.name} px={2} py={4}>
                    <Box
                      bgColor='background.main'
                      p={4}
                      borderRadius='8px'
                      position='relative'
                      height='256px'
                    >
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/* @ts-ignore */}
                      <AceEditor
                        readOnly
                        mode={item.mode}
                        theme='pastel_on_dark'
                        fontSize='14px'
                        style={{
                          width: '100%',
                          background: 'transparent',
                          height: '256px',
                        }}
                        value={item.snippet}
                        setOptions={{
                          showGutter: false,
                          useWorker: false,
                          printMargin: false,
                          wrap: true,
                        }}
                      />
                      <Box position='absolute' bottom={4} right={4}>
                        <CopyButton value={item.snippet} />
                      </Box>
                    </Box>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CodeSnippet
