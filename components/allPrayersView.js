import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrayerDetails from "./prayerDetails";

const AllPrayersView = (props) => {



    return (
        <View style={styles.prayersContainer}>
            {
                Object.keys(props.prayerTimes).map((keyName, index) => {
                    return <PrayerDetails 
                    style={keyName === props.minPrayer ? styles.highlighted : styles.singlePrayer} 
                    prayer={keyName}
                    timeToPrayer={props.closestPrayerTimes[keyName]}
                    key={index} 
                    prayerTime={props.prayerTimes[keyName]} />
                    
                })
            }
        </View>
    )

}

const styles = StyleSheet.create({
    prayersContainer: {
        position: 'relative',
        width: '100%',
        height: 240,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '50%',
        zIndex: 1,
        backgroundColor: 'white'
    },
    singlePrayer: {
        width: '100%',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    highlighted: {
        width: '100%',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'green'
    }
});

export default AllPrayersView;