import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Alert, StatusBar, Dimensions, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import TaskItem from './components/TaskItem';
import TaskInputModal from './components/TastInputModal';
import { Task } from './types';
import { loadTasks, saveTasks } from './utils';
import { addTask, updateTask } from './core/Tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const saveTasksToStorage = async () => {
      await saveTasks(tasks);
    };
    saveTasksToStorage();
  }, [tasks]);

  const addTaskOperation = () => {
    addTask({
      title,
      setTitle,
      setTasks,
      setModalVisible,
      setError,
      tasks,
    });
  }

  const updateTaskOperation = () => {
    updateTask({
      title,
      setTitle,
      setTasks,
      setModalVisible,
      setError,
      tasks,
      selectedTask,
      setSelectedTask,
    });
  }

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };


  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };


  const handleCancel = () => {
    setModalVisible(false);
    setTitle('');
    setError(null);
  };

  const renderTaskTile = ({ item }: { item: Task }) => (
    <TaskItem
      item={item}
      onPress={toggleTaskCompletion}
      onEdit={openEditModal}
      onDelete={deleteTask}
    />
  );

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setTitle(task.title);
    setModalVisible(true);
  };

  const confirmDeleteAllTasks = () => {
    if (!tasks.length) {
      return Alert.alert('No Tasks', 'There are no tasks to delete');
    }
    Alert.alert(
      'Delete All Tasks',
      'Are you sure you want to delete all tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setTasks([]) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F8" />
      <View style={styles.header}>
        <FontAwesome name="tasks" size={32} color="#45474B" style={styles.logo} />
        <Text style={styles.heading}>Daily Task</Text>
      </View>

      {tasks.length ? (
        <FlatList
          data={tasks}
          renderItem={renderTaskTile}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.list}>
          <Text style={styles.noTasksText}>
            No tasks available{'\n'}Click plus icon to add some tasks!
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setSelectedTask(null);
          setModalVisible(true);
        }}
      >
        <Entypo name="plus" style={styles.floatButtonIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.addButton, {
          right: 80,
          backgroundColor: 'red'
        }]}
        onPress={confirmDeleteAllTasks}
      >
        <Entypo name="trash" style={styles.floatButtonIcon} />
      </TouchableOpacity>

      <TaskInputModal
        visible={modalVisible}
        task={selectedTask}
        title={title}
        error={error}
        onTitleChange={setTitle}
        onCancel={handleCancel}
        onSave={selectedTask ? updateTaskOperation : addTaskOperation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noTasksText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    marginTop: Dimensions.get('window').height / 2.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7F8',
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  logo: {
    marginRight: 10,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#45474B',
  },
  list: {
    flex: 1,
    backgroundColor: "#468B97",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 5,
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
  floatButtonIcon: {
    fontSize: 34,
    color: '#FFFFFF',
    lineHeight: 36,
  },
  listContent: {
    paddingBottom: 80,
  },
});

export default App;
