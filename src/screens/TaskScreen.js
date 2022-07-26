import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TaskCardsIncomplete from '../components/Cards/TaskCardsIncomplete';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler/';

import TaskCardDeleteComponent from '../components/Cards/TaskCardDeleteComponent';
import TaskCardCompleted from '../components/Cards/TaskCardCompleted';

import {LABEL} from '../constant/constants';
import styles from '../styles/TaskScreenStyle';
import Reminder from '../components/Modal/Reminder';

import { getTask, updateTask,DeleteTask} from '../services/todo';
const TaskScreen = ({navigation}) => {
  
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState([])
 const [iscomplete, setcomplete] = useState([])
 const [isincomplete, setincomplete] = useState([])
  useEffect(() => {
    setIsShowModal(!isShowModal);
  }, []);

  useEffect(() => {
 
async function getTaskItem() {
  try {
    let {tasks} = await getTask()
    const incomplete = tasks.filter((item) => item.status == 'incomplete')
    const complete = tasks.filter((item) => item.status == 'completed')
    setcomplete(complete.reverse())
    setincomplete(incomplete.reverse())
    setData(tasks)
    
  } catch (error) {
    console.log(error)
    
   }
  }

  const unsubscribe = navigation.addListener('focus', () => {
    getTaskItem()
  });

  return unsubscribe;


  }, [navigation])
  
  const deleteItem =async({item}) =>{
    
    try {
    
     const{message} = await DeleteTask(item.id)
     const removeFromIncomplete= isincomplete.filter((data) => {
      return  data.id !== item.id
    })
    setincomplete(removeFromIncomplete)
alert(message)


    } catch (error) {
      
    }
   
  }

  const check = async ({item})=>{
    
    const {id, title, description,due_at} = item
    const body = {
      title,
      description,
      "status":"completed",
      due_at
    }
    try {
      const {message} = await updateTask(id,body)
      const removeFromIncomplete= isincomplete.filter((item) => {
        return  item.id !== id 
      })

      const find=data.map(item => {
        if(item.id === id) {
          return {...item, status : 'completed'}
        } else {
          return item
        }
      })

      const completeStatus = find.filter((item) => item.status == 'completed')
      setcomplete(completeStatus.reverse())
      setincomplete(removeFromIncomplete)
       alert(message)
       
    } catch (error) {
      console.log(error)
      
    }

  
  }

  let row = [];
  let prevOpenedRow;
  

  const renderItem = ({item, index}, onClick, check) => {
   
    const closeRow = index => {
      console.log('closerow');
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };
    const renderRightActions = (progress, dragX, onClick) => {
      return <TaskCardDeleteComponent onClick={onClick} />;
    };
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={ref => (row[index] = ref)}
          rightOpenValue={-100}>
          <TaskCardsIncomplete  item={item} check={check}/>
        </Swipeable>
      </GestureHandlerRootView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLbl}>{LABEL.TASK_LABEL}</Text>
      </View>
      <View style={{marginBottom: 30}}>
        <TouchableOpacity onPress={() => navigation.navigate('NewTaskScreen')}>
          <Text style={styles.addNewTask}>{LABEL.ADD_NEW_TASK_LABEL}</Text>
        </TouchableOpacity>
      </View>

    
        <React.Fragment>
           <View style={{height: 220}}>
         <Text style={styles.lblTitle}>{LABEL.INCOMPLETTE_TASK_LABEL}</Text>
         <FlatList
           data={isincomplete}
           renderItem={data =>
             renderItem(data,() => deleteItem(data), () => check(data))
           }
           keyExtractor={item => item.id}
         />
       </View>
       <View>
         <Text style={styles.lblTitle}>{LABEL.COMPLETED_TASK_LABEL}</Text>
        
         <FlatList
           data={iscomplete}
           renderItem={item => <TaskCardCompleted data={item} />}
           keyExtractor={item => item.id}
         />
       </View>
        </React.Fragment>
      

     

      {/* Modal */}
      <Reminder
        isShow={isShowModal}
        action={() => setIsShowModal(!isShowModal)}
      />
    </SafeAreaView>
  );
};

export default TaskScreen;
