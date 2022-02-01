import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PrayerDetails = (props) => {
    
    const [expand, setExpand] = useState(false);
     
    return (
        <TouchableOpacity style={expand ? styles.singlePrayerExpanded : props.highlight ? styles.highlighted : styles.singlePrayer} onPress={() => setExpand(!expand)}>
            <View>
                <Text>
                    {props.prayer}
                </Text>
                <Text>
                    {'in ' + props.hoursFunc(props.timeToPrayer) + 'h ' + props.minsFunc(props.timeToPrayer) + 'm'}
                </Text>
            </View> 
            <Text>
                {props.prayerTime}
            </Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    singlePrayer: {
        width: '100%',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    highlighted: {
        width: '100%',
        fontSize: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#add'
    },
    singlePrayerExpanded: {
        width: '100%',
        fontSize: 30,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    }
});


export default PrayerDetails;