//General Functions for Home Component.

export const convertHours = (mins) => {return Math.floor(mins / 60);}
export const convertMins = (mins) => {return mins % 60;}

export const findMinPrayer = (cpTimes) => {
    let currMin = Infinity;
    let currPrayer = '';
    for (var prayer in cpTimes) {
      if (cpTimes[prayer] < currMin) {
        currMin = cpTimes[prayer];
        currPrayer = prayer;
      }
    }
    return currPrayer
  }

export const timeToPrayer = (targetTime) => {
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