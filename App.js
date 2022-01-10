import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import useStateCallback from './useStateCallback';
import AllPrayersView from './components/allPrayersView';

export default function App() {
  
  useEffect(() => {
    apiTimes();
    
  }, []);

  useEffect(() => {
    // Finish timer
    var updateInterval = null;
    // setInterval(() => {console.log('Failure to fetch API')}, 60 * 1000);
    if (loadAll) {
      updateInterval = setInterval(() => {
        closestPrayer();
      }, 30 * 1000);
    }

    return () => clearInterval(updateInterval);
  });
  

  const [loadAll, setLoadAll] = useState(false);
  const [closestPTime, setClosestPTime] = useState(['', '']);
  const [prayerTimes, setPrayerTimes] = useStateCallback({
    Fajr: '',
    Zuhr: '',
    Asr: '',
    Maghrib: '',
    Isha: ''
  }, () => {
    closestPrayer();
    setLoadAll(true);
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
  
  
  const closestPrayer = () => {
    //convert hours to minutes and calculate.
    let time = new Date();
    let currentMins = (time.getHours() * 60) + time.getMinutes();
    let minDif = 24*60;
    let maxDif = 0;
    let minPrayer = '';
    let maxPrayer = '';

    for (var prayer in prayerTimes) {
      let prayerTime = (Number.parseInt(prayerTimes[prayer].toString().slice(0, 3), 10) * 60) + Number.parseInt(prayerTimes[prayer].toString().slice(3,5));
      let currDif = currentMins - prayerTime;
      if (currDif < minDif) {    
        if (minDif > 0) {
          minDif = currDif;
          minPrayer = prayer.toString();
        }
      } else {
        if (currDif < 0 && currDif > minDif) {
          minDif = currDif;
          minPrayer = prayer.toString()
        }
      }
      if (currDif > maxDif) {
        maxDif = currDif;
        maxPrayer = prayer.toString();
      }
    }

    if (minDif > 0) {
      minDif = (24*60) - maxDif;
      minPrayer = maxPrayer;
    } else {
      minDif = Math.abs(minDif);
    }
    
    let hourDif = Math.floor(minDif / 60).toString();
    let minuteDif = (minDif % 60);
    if (minuteDif < 10) {
      minuteDif = '0' + minuteDif.toString();
    } else {
      minuteDif = minuteDif.toString();
    }

    setClosestPTime([minPrayer, hourDif + ':' + minuteDif]);
  };

  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.prayers}>
        <Text style={styles.nextPrayer}>
        Next Prayer:
        </Text>
        <Text style={styles.nextPrayerTime}>
          {!loadAll ? 'Loading...' : closestPTime[0] + ': ' + closestPTime[1]}
        </Text>
      </View>
      {loadAll ? <AllPrayersView prayerTimes={prayerTimes} /> : <Text>Please Wait</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  prayers: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 200,
    borderColor: '#97CD98',
    backgroundColor: '#97CD98',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
  }
});