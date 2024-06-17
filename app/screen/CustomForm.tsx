import {Input, FormControl, VStack} from 'native-base';
import { useState } from 'react';

export const CustomForm = ({label, errorMessage, value, onChangeText}) => {
    return (
        <VStack width="90%" mx="3" maxW="300px">
            <FormControl isRequired>
              <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
              <Input placeholder={label} value={value} onChangeText={onChangeText}/>
              <FormControl.HelperText _text={{fontSize: 'xs'}}>
                {errorMessage}
              </FormControl.HelperText>
              <FormControl.ErrorMessage _text={{fontSize: 'xs'}}>
                Error Name
              </FormControl.ErrorMessage>
            </FormControl>
        </VStack>
    );
}