import {View,Text, ScrollView,SafeAreaView,TouchableOpacity} from 'react-native';
import React,{useState,useEffect} from 'react';
import { getLocation } from '../services/todo';
import LocationCard from '../components/Cards/LocationCard';
import { LABEL } from '../constant/constants';
import styles from '../styles/LocationScreenStyle';
const Location = ({navigation}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    async function getLocationList() {
      try {
        let {checkins} = await getLocation()
        setData(checkins)
      } catch (error) {
        console.log(error)
       }
      }
      getLocationList()
      },)

      const CheckIn = () => {
        alert('This feature is available on the next release')
      }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLbl}>{LABEL.LOCATION_LABEL}</Text>
      </View>
      <View style={{marginBottom: 30}}>
        <TouchableOpacity onPress={() => CheckIn()}>
          <Text style={styles.checkIn}>{LABEL.CHECK_IN}</Text>
        </TouchableOpacity>
      </View>
      <View>
      <Text style={styles.prevLocation}>{LABEL.PREV_LOCATION}</Text>
      </View>
    <ScrollView>
  
      <React.Fragment>
          {data?.length > 0  && data?.map((item,i)=>{
        return(
   <LocationCard item={item} key={i} />   
        )
      })}
      </React.Fragment>
    
      
      
    </ScrollView>
    </SafeAreaView>
  );

};

export default Location;
