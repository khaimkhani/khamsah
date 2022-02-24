import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import { useState, useEffect, useRef, useMemo } from 'react';
import useStateCallback from '../useStateCallback';
import Icon from 'react-native-vector-icons/Ionicons';
import AllPrayersView from './allPrayersView';


export default function Home({ navigation }) {
  
  useEffect(() => {
    apiTimes();
    console.log('this ran');
  }, []);

  

  useEffect(() => {
    // Finish timer
    var updateInterval = null;
    // setInterval(() => {console.log('Failure to fetch API')}, 60 * 1000);
    if (loadAll) {
      updateInterval = setInterval(() => {
        findTimeToAllPrayers();
        console.log('updated');
      }, 30 * 1000);
      
    }

    return () => {
      console.log('destroyed');
      clearInterval(updateInterval);
    };
  });
  
 
  const [loadAll, setLoadAll] = useState(false);
  const [minPrayer, setMinPrayer] = useState(null);
  
  const [prayerTimes, setPrayerTimes] = useStateCallback({
    Fajr: '',
    Zuhr: '',
    Asr: '',
    Maghrib: '',
    Isha: ''
  }, () => {
    findTimeToAllPrayers();
    setLoadAll(true);
  });
  
  const [closestPrayerTimes, setClosestPrayerTimes] = useStateCallback({
    Fajr: '',
    Zuhr: '',
    Asr: '',
    Maghrib: '',
    Isha: ''
  }, () => {
    findMinPrayer();
  });


  const apiTimes = async () => {
    let pTimes = await fetch('https://api.pray.zone/v2/times/today.json?city=toronto')
    .then(res => res.json())
    .then(data => {
      let timesObj = data.results.datetime['0'].times;
      setPrayerTimes({
        Fajr: timesObj['Fajr'],
        Zuhr: timesObj['Dhuhr'],
        Asr: timesObj['Asr'],
        Maghrib: timesObj['Maghrib'],
        Isha: timesObj['Isha']
      });
    })
    .catch(err => console.log(err));
  }
  
  const findTimeToAllPrayers = () => {
    setClosestPrayerTimes({
      Fajr: timeToPrayer(prayerTimes['Fajr']),
      Zuhr: timeToPrayer(prayerTimes['Zuhr']),
      Asr: timeToPrayer(prayerTimes['Asr']),
      Maghrib: timeToPrayer(prayerTimes['Maghrib']),
      Isha: timeToPrayer(prayerTimes['Isha'])
    });
    
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
    
    return diff;
}

  const findMinPrayer = () => {
    let currMin = Infinity;
    let currPrayer = '';
    for (var prayer in closestPrayerTimes) {
      if (closestPrayerTimes[prayer] < currMin) {
        currMin = closestPrayerTimes[prayer];
        currPrayer = prayer;
      }
    }
    setMinPrayer(currPrayer);
  }

  const convertHours = (mins) => {

    return Math.floor(mins / 60);
  }

  const convertMins = (mins) => {
    return mins % 60;
  }

  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.prayers}>
        <Text style={styles.nextPrayer}>
        Next Prayer:
        </Text>
        <Text style={styles.nextPrayerTime}>
          {!loadAll ? 'Loading...' : minPrayer + ' in ' + convertHours(closestPrayerTimes[minPrayer]) + 'h ' + convertMins(closestPrayerTimes[minPrayer]) + 'm'}
        </Text>
        
        </View>
      <ScrollView style={styles.scrollStyle}>
        
        {loadAll ? <AllPrayersView 
                    prayerTimes={prayerTimes} 
                    closestPrayerTimes={closestPrayerTimes}
                    minPrayer={minPrayer}
                    hoursFunc={convertHours}
                    minsFunc={convertMins}
                     /> : <Text>Please Wait</Text>}
                    

        <Pressable style={styles.settingsIcon} onPress={() => navigation.push('Settings')}>
          <Icon name='settings-outline' size={30} />
        </Pressable> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  prayers: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 500,
    paddingBottom: 250,
    borderColor: '#97CD98',
    backgroundColor: '#97CD98',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },
  nextPrayer: {
    fontSize: 20,
    alignSelf: 'center'
  },
  nextPrayerTime: {
    fontSize: 30
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollStyle: {
    position: 'relative',
    top: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  settingsIcon: {
      position: 'absolute',
      top: 20,
      right: 0,
      marginTop: '5',
      marginRight: '5'
  }
  
});