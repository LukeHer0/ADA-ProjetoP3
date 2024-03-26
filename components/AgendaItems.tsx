import React, { useCallback } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Button, AlertButton } from 'react-native';
import { aulasAtom } from "../utils/aulas";


interface ItemProps {
    item: any;
}

const AgendaItem = (props: ItemProps) => {
    const {item} = props;
  
    const buttonPressed = useCallback(() => {
      Alert.alert('Aula Info', 'Cancelada', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK'},
      ]);
    }, []);
  
    const itemPressed = useCallback(() => {
      Alert.alert(item.title, "Professor: " + item.name + "\nLocal: " +  item.local);
    }, []);
  
  
    return (
      <TouchableOpacity onPress={itemPressed} style={styles.item} >
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Status'} onPress={buttonPressed}/>
        </View>
      </TouchableOpacity>
    );
  };

  export default React.memo(AgendaItem);

  const styles = StyleSheet.create({
    item: {
      padding: 20,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
      flexDirection: 'row'
    },
    itemHourText: {
      color: 'black'
    },
    itemDurationText: {
      color: 'grey',
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4
    },
    itemTitleText: {
      color: 'black',
      marginLeft: 16,
      fontWeight: 'bold',
      fontSize: 16
    },
    itemButtonContainer: {
      flex: 1,
      alignItems: 'flex-end'
    },
    emptyItem: {
      paddingLeft: 20,
      height: 52,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey'
    },
    emptyItemText: {
      color: 'lightgrey',
      fontSize: 14
    }
  });
  