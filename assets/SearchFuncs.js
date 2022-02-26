import countries from "./countries";

export const showClosest = (text, data) => {
    if (data.length <= 1 && text !== data[0]) return 0;
    let txtSize = text.length;
    let size = Math.floor(data.length / 2);
    
    if (data[size].slice(0, txtSize).localeCompare(text) > 0) {
        let L = data.slice(0, size);
        let closestIndex = showClosest(text, L);  
        return closestIndex;

    } else if (data[size].slice(0, txtSize).localeCompare(text) < 0) {
        let R = data.slice(size, data.length);
        let closestIndex = showClosest(text, R);
        return size + closestIndex;
    
    } else if (data[size].slice(0, txtSize).localeCompare(text) == 0){
        return size;
    }
}

export const updateClosestHelper = (text) => {
    if (text == '') {
        return {ddArr: [], dd: false};
    } else {
        let repArr = [];
        let closest = showClosest(text, countries);
        let i = closest - 1; let j = closest + 1;
        repArr.push(countries[closest])
        let k = 0;
        while ((k < 6) && (repArr.length < 5)) {
            if (countries[i].slice(0, text.length).localeCompare(text) == 0) {
                repArr.push(countries[i]);
                i -= 1;
            }
            if (countries[j].slice(0, text.length).localeCompare(text) == 0) {
                repArr.push(countries[j]);
                j += 1;
            }
            k += 1
        }
        return {ddArr: repArr, dd: true};
    }
}