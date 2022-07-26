import {StyleSheet} from 'react-native';
import {COLOR, SIZES} from '../constant/Theme';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: 'white',
    },
    header: {
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 32,
    },
    headerLbl: {
      fontSize: 30,
      fontWeight: 'bold',
      color: COLOR.PRIMARY,
    },
    checkIn: {
      fontWeight: 'bold',
      fontSize: SIZES.md,
      color: '#575767',
    },
    prevLocation:{
        fontSize:18 ,
        fontWeight: '700',
        marginBottom:16
    }
  });
  
  export default styles