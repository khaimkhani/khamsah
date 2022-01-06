import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PrayerDetails = (props) => {

    const timeToPrayer = (targetTime) => {
        let currTime = new Date();
        
        let prayerMins = (Number.parseInt(targetTime.slice(0, 2)) * 60) + Number.parseInt(targetTime.slice(3,5));
        let currMins = (currTime.getHours() * 60) + currTime.getMinutes();
        let diff = 0;
        if (currMins < prayerMins) {
            diff = prayerMins - currMins;
        } else {
            diff = (24*60) - (currMins - prayerMins);
        }
        let difHour = Math.floor(diff / 60);
        let difMin = diff % 60;
        return difHour.toString() + 'h ' + difMin.toString() + 'm'
    }
     
    return (
        <View style={styles.singlePrayer}>
            <View>
                <Text>
                    {props.prayer}
                </Text>
                <Text>
                    {timeToPrayer(props.prayerTime)}
                </Text>
            </View> 
            <Text>
                {props.prayerTime}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    singlePrayer: {
        width: '100%',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    }
});

export default PrayerDetails;