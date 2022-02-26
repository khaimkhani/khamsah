import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import PrayerDetails from "./prayerDetails";

const AllPrayersView = (props) => {



    return (
        <ScrollView style={styles.prayersContainer}>
            {
                Object.keys(props.prayerTimes).map((keyName, index) => {
                    return <PrayerDetails 
                    highlight={keyName === props.minPrayer} 
                    prayer={keyName}
                    timeToPrayer={props.closestPrayerTimes[keyName]}
                    key={index} 
                    prayerTime={props.prayerTimes[keyName]}
                    />
                    
                })
            }
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    prayersContainer: {
        position: 'relative',
        width: '100%',
        height: 740,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '50%',
        zIndex: 1,
        backgroundColor: 'white'
    }
});

export default AllPrayersView;