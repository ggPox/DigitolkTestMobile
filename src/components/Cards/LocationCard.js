import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { PinIcon } from '../../constant/icon'
import { COLOR } from '../../constant/Theme'
const LocationCard = ({item}) => {
  return (
    <View style={styles.container}>
        <View>
            <Image source={PinIcon} style={styles.pin} />
        </View>
   <View>
   <Text style={styles.addressName}>{item.address}</Text>
    <Text style={styles.coordinate}>{`${item.longitude},${item.latitude}`}</Text>
   </View>
  </View>
  )
}

export default LocationCard

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginBottom:16

    },
    pin :{
        width:24,
        height:23
    },
    addressName:{
        fontSize:18,
        fontWeight:"500",
        color:'#575767'
    },
    coordinate:{
        color:'#B9B9BE',
        fontSize:14,
        fontWeight:"600"
    }
})