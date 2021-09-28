import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {
  Modal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from 'react-native-modals';
import {globalStyles} from '../styles';

const ErrorDialog = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <View style={globalStyles.container}>
      <Modal
        visible={isVisible}
        footer={
          <ModalFooter>
            <ModalButton
              text="OK"
              onPress={() => {
                setIsVisible(!isVisible);
              }}
            />
          </ModalFooter>
        }
        modalTitle={
          <ModalTitle title="AN ERROR OCCURED!" hasTitleBar={true} />
        }>
        <ModalContent>
          <Text style={globalStyles.errorText}>{'message'}</Text>
        </ModalContent>
      </Modal>
    </View>
  );
};

export default ErrorDialog;
