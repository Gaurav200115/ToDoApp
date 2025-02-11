import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "@react-native-vector-icons/fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const { width, height } = Dimensions.get('window');

const Today = () => {
  interface Task {
    id: string;
    text: string;
    completed: boolean;
    date: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem("tasks");
    const lastSavedDate = await AsyncStorage.getItem("lastSavedDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastSavedDate !== today) {
      await AsyncStorage.setItem("lastSavedDate", today);
    } else if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  const addTask = async () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: taskInput,
      completed: false,
      date: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskInput("");
  };

  const toggleTaskCompletion = async (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = async (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (<View style={{ backgroundColor: "white", flex: 1 }}>
    <View style={style.topbox}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Today's Tasks</Text>
      <Icon name="plus" size={23} onPress={() => setModalVisible(true)} />
    </View>

    <View style={{ flex: 1 }}>
      {tasks.length > 0 ? (
        <FlatList

          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={style.parBox}>
              <Text style={{ flex: 1, fontSize: 18 }}>{item.text}</Text>

              <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)} style={{ marginRight: 10 }}>
                {item.completed ? (
                  <Icon name='check-square-o' color={"green"} size={height * 0.03} />
                ) : (
                  <Icon name='square-o' color={"grey"} size={height * 0.03} />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.id)} style={style.deleteButton}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={style.emptyContainer}>
          <Image source={require("../assets/letsgo.jpg")} style={style.emptyImage} />
        </View>
      )}
    </View>


    <Modal visible={modalVisible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={style.modalContainer}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={style.modalContent}>
              <Text style={style.modalText}>Enter the task</Text>
              <TextInput
                style={style.input}
                placeholder="Type here..."
                value={taskInput}
                onChangeText={setTaskInput}
              />
              <Button title="Add" onPress={() => { setModalVisible(false); addTask(); }} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  </View>
  );
};

const style = StyleSheet.create({
  topbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: width * 0.02,
    backgroundColor: "white",
    elevation: width * 0.05,
    padding: 14,
    alignItems: 'center',
  },
  taskBox: {
    margin: width * 0.02,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: width * 0.04,
  },
  parBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,
    elevation: height * .04,
    backgroundColor: "white"
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "800"
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: height * 0.1,
  },
  emptyImage: {
    height: height * 0.6,
    width: width * 0.6,
    resizeMode: "center",
  },
});

export default Today;
