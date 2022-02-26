import { convertHours, convertMins, findMinPrayer, timeToPrayer } from '../assets/TimeFunctions';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import { useState, useEffect, useContext} from 'react';
import useStateCallback from '../useStateCallback';
import Icon from 'react-native-vector-icons/Ionicons';
import AllPrayersView from './allPrayersView';
import { CityContext } from '../App';


export default function Home({ navigation }) {

  const currCity = useContext(CityContext);  

  useEffect(() => {
    apiTimes();
    console.log('this ran');
  }, []);

  useEffect(() => {
    var updateInterval = null;
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
    setClosestPrayerTimes({
      Fajr: timeToPrayer(prayerTimes['Fajr']),
      Zuhr: timeToPrayer(prayerTimes['Zuhr']),
      Asr: timeToPrayer(prayerTimes['Asr']),
      Maghrib: timeToPrayer(prayerTimes['Maghrib']),
      Isha: timeToPrayer(prayerTimes['Isha'])
    });
    setLoadAll(true);
  });
  
  const [closestPrayerTimes, setClosestPrayerTimes] = useStateCallback({
    Fajr: '',
    Zuhr: '',
    Asr: '',
    Maghrib: '',
    Isha: ''
  }, () => {
    setMinPrayer(findMinPrayer(closestPrayerTimes));
  });

  const apiTimes = async () => {
    console.log(currCity);
    let pTimes = await fetch('https://api.pray.zone/v2/times/today.json?city=' + currCity)
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