import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PrayerDetails = (props) => {
    
     
    return (
        <View>
            <View>
                <Text>
                    {props.prayer}
                </Text>
                <Text>
                    {props.timeToPrayer}
                </Text>
            </View> 
            <Text>
                {props.prayerTime}
            </Text>
        </View>
    )

}



export default PrayerDetails;