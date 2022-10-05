import { useState , useEffect, useRef } from 'react';
import { DeviceEventEmitter, Text, TouchableOpacity, View } from 'react-native'
import { SHOW_TOAST_MESSAGE } from '../helpers/constants/toast';

const colors ={
    info: '#343a40',
    success: '#28a745',
    danger: '#db0007'
}
const Toast = () => {
    const [ messageType, setMessageType ] = useState(null);
    const [ message, setMessage ] = useState(null);
    const [ timeDuration, setTimeDuration] = useState(1000);

    const timeOutRef = useRef(null);

    const onNewToast = (data) =>{

        if(data.duration){
            setTimeDuration(duration);
        }
        setMessage(data.message);
        setMessageType(data.type);
        
    }

    const closeToast = () =>{
        setMessage(null)
        setTimeDuration(2000)
    }

    useEffect( () =>{
        if(message){
            timeOutRef.current = setInterval( () =>{
                if(timeDuration === 0 ){
                    closeToast()
                }else{
                    setTimeDuration(prev=>prev-1000)
                }
            }, 1000)
        }

        return () =>{clearInterval(timeOutRef.current)}
    },[message, timeDuration])

    useEffect(() => {
            DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);
            return () =>{DeviceEventEmitter.removeAllListeners();};
        }, [])
        if(!message){
            return null
        }
    
    return (
      <View style={{
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        backgroundColor: colors[messageType],
        zIndex: 1,

      }}>
        <TouchableOpacity>
            <Text style={{padding:14, color:"white",fontSize:14, textAlign:"center"}}>{message}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  export default Toast;