import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrayerDetails from "./prayerDetails";

const AllPrayersView = (props) => {

    return (
        <View style={styles.prayersContainer}>
            {
                Object.keys(props.prayerTimes).map((keyName, index) => {
                    return <PrayerDetails prayer={keyName} key={index} prayerTime={props.prayerTimes[keyName]} />
                    
                })
            }
        </View>
    )

}

const styles = StyleSheet.create({
    prayersContainer: {
        position: 'relative',
        width: 350,
        height: 240,
        borderColor: '#',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: '35%',
        zIndex: 1,
        backgroundColor: 'white'
    }
});

export default AllPrayersView;