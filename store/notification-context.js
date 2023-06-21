import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
    notification: null,//{title, message, status}
    showNotification:(notificationData)=>{},
    hideNotification:()=>{},
})

export const NotificationContextProvider = (props)=>{
    const [activeNotification, setActiveNotification] = useState(null);

    useEffect(()=>{
        if(activeNotification && activeNotification.status !== 'pending'){
            const timer = setTimeout(()=>{
                hideNotification();
            },3000)
            return ()=>{clearTimeout(timer)}
        }

    },[activeNotification])
    const showNotification = (notificationData)=>{
        setActiveNotification(notificationData)
    };
    const hideNotification=()=>{
        setActiveNotification(null)
    }

    const context = {
        notification:activeNotification,
        showNotification,
        hideNotification
    }
    return(
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext