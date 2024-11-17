import { Box, HStack, Text } from 'native-base';


const TopBar = ({judul}) => {
    return (
        <>
            <Box safeAreaTop bg="cyan.700">
                <HStack bg="cyan.700" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
                    <HStack alignItems="center">
                        <Text color="white" fontSize="32z" fontWeight="bold">
                            { judul }
                        </Text>
                    </HStack>
                </HStack>
            </Box>
        </>
    );
  }

  export default TopBar;