import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'react-native';
import {
  Modal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
} from 'react-native-modals';
import {connect} from 'react-redux';
import {removeAlert} from '../../redux/actions/alert';
import {globalStyles} from '../styles';

const ErrorDialog = ({errors, removeAlert}) => {
  return (
    <Modal
      visible={errors?.length > 0}
      footer={
        <ModalFooter>
          <ModalButton
            text="OK"
            onPress={() => {
              removeAlert();
            }}
          />
        </ModalFooter>
      }
      modalTitle={<ModalTitle title="AN ERROR OCCURED!" hasTitleBar={true} />}>
      <ModalContent>
        <Text style={globalStyles.errorText}>{errors?.[0]?.message}</Text>
      </ModalContent>
    </Modal>
  );
};

ErrorDialog.propTypes = {
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.alert,
});

export default connect(mapStateToProps, {removeAlert})(ErrorDialog);
