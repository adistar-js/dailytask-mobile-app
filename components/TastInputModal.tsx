import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Task } from '../types';

interface Props {
  visible: boolean;
  task: Task | null;
  title: string;
  error: string | null;
  onTitleChange: (text: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const TastInputModal: React.FC<Props> = ({
  visible,
  task,
  title,
  error,
  onTitleChange,
  onCancel,
  onSave,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalView}
          >
            <Text style={styles.modalTitle}>{task ? 'Edit Task' : 'Add New Task'}</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
              placeholder="Please enter task title"
              value={title}
              onChangeText={onTitleChange}
              style={[styles.input, error ? styles.inputError : null]}
              placeholderTextColor="rgba(31, 41, 55, 0.5)"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={onSave}
              >
                <Text style={[styles.modalButtonText, styles.saveButtonText]}>
                  {task ? 'Update Task' : 'Add Task'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={onCancel}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1F2937',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 15,
    color: 'red',
  },
  inputError: {
    borderColor: '#FF6347',
  },

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#379777',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD2D9',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
    color: '#1F2937',
    paddingHorizontal: 20
  },
  errorText: {
    color: '#FF6347',
    marginBottom: 15,
  },
  saveButtonText: {
    color: 'green',
  },

  cancelButtonText: {
    color: 'red',
  },
});



export default TastInputModal;