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
} from '@chakra-ui/react'
import AceEditor from 'react-ace'
import { chainInfo } from '@/app/constants'
import { CustomTab } from './CustomTab'

import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-sh'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-one_dark'
import 'ace-builds/src-noconflict/theme-pastel_on_dark'
import { CopyButton } from './copy/CopyButton'
import { CustomIcon } from './icon/CustomIcon'

export const CodeSnippet = ({ network }: { network: string }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const codeSnippets: Record<
    string,
    { name: string; mode: string; snippet: string }[]
  > = {
    query: [
      {
        name: 'CLI',
        mode: 'sh',
        snippet: `# get all supported pairs
curl -X GET "${chainInfo[network].lcd}/slinky/oracle/v1/get_all_tickers"
# get a specific price of base/quote pair
curl -X GET "${chainInfo[network].lcd}/slinky/oracle/v1/get_price?currency_pair_id=<base>/<quote>"`,
      },
      {
        name: 'Axios',
        mode: 'javascript',
        snippet: `const axios = require('axios');\n
const lcdURL = "${chainInfo[network].lcd}"

// get all supported pairs
const { data: { currency_pairs: allPairs }} = await axios.get("${chainInfo[network].lcd}/slinky/oracle/v1/get_all_tickers")

// get a specific price of base/quote pair
const { data: { price }} = await axios.get("${chainInfo[network].lcd}/slinky/oracle/v1/get_price?currency_pair_id=<base>/<quote>")
`,
      },
    ],
  }

  return (
    <>
      <p className='cursor-pointer' onClick={onOpen}>
        Code Snippet
      </p>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='4xl'>
        <ModalOverlay />
        <ModalContent w='840px'>
          <ModalHeader>
            <CustomIcon name='code' boxSize={6} color='gray.600' />
            <Heading as='h5' variant='h5'>
              Code Snippet
            </Heading>
          </ModalHeader>
          <ModalCloseButton color='gray.600' />
          <ModalBody px={4} maxH='640px' overflow='scroll'>
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
                    >
                      <AceEditor
                        readOnly
                        mode={item.mode}
                        theme='pastel_on_dark'
                        fontSize='14px'
                        style={{
                          width: '100%',
                          background: 'transparent',
                        }}
                        value={item.snippet}
                        setOptions={{
                          showGutter: false,
                          useWorker: false,
                          printMargin: false,
                          wrap: true,
                        }}
                      />
                      <Box position='absolute' top={4} right={4}>
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
