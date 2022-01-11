import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrayerDetails from "./prayerDetails";

const AllPrayersView = (props) => {

    useEffect(() => {
        let minPrayer = Infinity;
        for (var prayer in timeToPrayers) {
            setTimeToPrayers({prayer: timeToPrayer(props.prayerTimes[prayer])});
            console.log(timeToPrayer(props.prayerTimes[prayer]));
        }
        findMinPrayer();
    }, []);

    const [timeToPrayers, setTimeToPrayers] = useState({
        Fajr: [],
        Zuhr: [],
        Asr: [],
        Maghrib: [],
        Isha: []
    });
    const [minPrayer, setMinPrayer] = useState(null);

    const findMinPrayer = () => {
        let currMin = Infinity;
        for (var prayer in timeToPrayers) {
            console.log(timeToPrayers);
            let pMin = (Number.parseInt(timeToPrayers[prayer][0]) * 60) + Number.parseInt(timeToPrayers[prayer][1]);
            if (pMin < currMin) currMin = pMin;
        }
        setMinPrayer(currMin);
    }
    
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
        return [difHour.toString(), difMin.toString()]
    }

    return (
        <View style={styles.prayersContainer}>
            {
                Object.keys(props.prayerTimes).map((keyName, index) => {
                    return <PrayerDetails 
                    style={keyName === minPrayer ? styles.highlighted : styles.singlePrayer} 
                    prayer={keyName}
                    timeToPrayer={timeToPrayers[keyName]}
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