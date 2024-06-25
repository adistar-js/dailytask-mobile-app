import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { Swipeable } from 'react-native-gesture-handler';
import { Task } from '../types';

interface Props {
  item: Task;
  onPress: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<Props> = ({ item, onPress, onEdit, onDelete }) => {
  const renderRightActions = () => (
    <>
      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={[styles.rightAction, styles.deleteAction]}
      >
        <FontAwesome name="trash" size={24} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onEdit(item)}
        style={[styles.rightAction, styles.editAction]}
      >
        <Entypo name="edit" size={24} color="#FFF" />
      </TouchableOpacity>
    </>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        style={[styles.taskTile, item.completed ? styles.completedTask : null]}
        onPress={() => onPress(item.id)}
        onLongPress={() => onEdit(item)}
      >
        <View style={styles.taskContent}>
          <Text style={[styles.taskTitle, item.completed ? styles.completedText : null]}>
            {item.title}
          </Text>
        </View>
        <View style={styles.taskActions}>
          {item.completed ? <FontAwesome name="check" size={24} color="#379777" /> :<Entypo name="circle" size={24} color="#6B7280" />}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  completedTask: {
    opacity: 0.9,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  rightAction: {
    padding: 18,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 20,
  },

  deleteAction: {
    backgroundColor: 'red',
  },

  editAction: {
    backgroundColor: 'lightblue',
  },
  taskTile: {
    backgroundColor: '#EEEEEE',
    padding: 18,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: '#00000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    color: '#1F2937',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
})

export default TaskItem;