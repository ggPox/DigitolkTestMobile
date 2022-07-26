import {StyleSheet,SafeAreaView, Text, View, ScrollView,TextInput,TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
import React,{useState} from 'react';
import { createTask } from '../services/todo';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { COLOR } from '../constant/Theme'; 
import { SummaryIcon, descriptionIcon, clockIcon } from '../constant/icon';
import CustomButton from '../components/CustomButton/CustomButton';
const NewTaskScreen = ({navigation}) => {
const [title,setTitle] = useState('')
const [desc,setDesc] = useState('')
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [dateSelected , setDateSelected]= useState('')
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateSelected(moment(date).format('lll'))
    hideDatePicker();
  };

  const clearFields = () => {
    setTitle('')
    setDesc('')
    setDateSelected('')
  }

  const newTask = async() => {
    const body = {
      title,
      description:desc,
      status: "incomplete",
      due_at: dateSelected
    }

    try {
      const {message, code} = await createTask(body)
     alert(message)
     clearFields()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.headerBack}>Back</Text>
          </TouchableOpacity>
        <Text style={styles.headerLbl}>New Task</Text>
        <View />
      </View>

      <View style={styles.form}>
        <Image source={SummaryIcon} />
        <TextInput value={title} placeholder='Summary' onChangeText={text => setTitle(text)} />
      </View>
      <View style={styles.form}>
        <Image source={descriptionIcon} />
        <TextInput
        value={desc}
         placeholder='Description' 
         onChangeText={text => setDesc(text)}
        numberOfLines={5}
        multiline={true}
        />
      </View>

      <View style={styles.formDate}>
        <Image source={clockIcon} />
     <TouchableWithoutFeedback onPress={showDatePicker}>
     <Text>{dateSelected === '' ? ' Due Date' :dateSelected}</Text>
     </TouchableWithoutFeedback>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton label={'Save'} action={() => newTask()}/>
      </View>

      <DateTimePickerModal
  isVisible={isDatePickerVisible}
  mode="date"
  onConfirm={handleConfirm}
  onCancel={hideDatePicker}
/>

    </SafeAreaView>
  )
   
};

export default NewTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center"
  },
  headerLbl:{
    fontSize: 30,
    fontWeight: 'bold',
    color: COLOR.PRIMARY,
  },
  headerBack:{
    fontSize: 15,
    fontWeight: '500',
    color: COLOR.PRIMARY,
  },
   form :{
  
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#BDBDBD80'
   },
   buttonContainer:{
    marginTop:33
   },
   formDate:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:10,
   
    borderBottomWidth:1,
    borderBottomColor:'#BDBDBD80'
   }
});
