import React from "react";
import { useEffect, useState } from "react";


export default function useStateCallback(defaultVal, callBackFunc) {

    const [val, setVal] = useState(defaultVal);
    const initialVal = defaultVal;

    useEffect(() => {
        if (val != initialVal) {
            callBackFunc();
            
        }
    }, [val]);
 
    return [val, setVal];
}