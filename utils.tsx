import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from './types';

// Load tasks from AsyncStorage
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem('@tasks');
    if (storedTasks) {
      // Parse and return the stored tasks
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      return parsedTasks;
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

// Save tasks to AsyncStorage
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    // Convert tasks to a JSON string and save it
    await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

// Other utility functions can be added as needed

export default {
  loadTasks,
  saveTasks,
  // Add other utility functions here
};
