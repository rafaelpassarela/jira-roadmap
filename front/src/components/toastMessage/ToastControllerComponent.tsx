import React, { useEffect } from "react";
import { ToastContainer } from "react-bootstrap";
import ToastMessage from "./ToastMessageComponent";
import Cookies from 'js-cookie';

interface IToastControllerProps {
    position: 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
}

export interface IToastMessageProps {
    title?: string;
    message: string;
    timeInfo?: string;
    timeout?: number;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

interface IToastMessageCookie extends IToastMessageProps {
    _timestamp: string;
}

export function toastAddMessage(data: IToastMessageProps) {
    const msgList: IToastMessageCookie[] = JSON.parse(Cookies.get('toastMessages') || '[]');
    if (data.timeInfo === undefined) {
        data.timeInfo = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const toastMessageCookie: IToastMessageCookie = {
        ...data,
        _timestamp: new Date().toISOString()
    };
    msgList.push(toastMessageCookie);
    Cookies.set('toastMessages', JSON.stringify(msgList));
}

export default function ToastController(props: IToastControllerProps) {

    const [toastMessages, setToastMessages] = React.useState<IToastMessageProps[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const msgList: IToastMessageCookie[] = JSON.parse(Cookies.get('toastMessages') || '[]');
            // Iterate through the objects in the array and remove those that have already expired based on _timestamp and timeout
            const now = new Date();
            const newMsgList = msgList.filter((msg) => {
                const msgDate = new Date(msg._timestamp);
                return now.getTime() - msgDate.getTime() < (msg.timeout || 5000);
            });
            // update the cookie with the new list
            Cookies.set('toastMessages', JSON.stringify(newMsgList));

            setToastMessages(newMsgList);

            if (newMsgList.length === 0) {
                Cookies.remove('toastMessages');
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{ minHeight: '1px' }} aria-live="polite" aria-atomic="true">
            <ToastContainer position={props.position} className="p-3" style={{ zIndex: 99 }}>
            {
                toastMessages.map((msg, index) => (
                    <ToastMessage
                        key={index}
                        title={msg.title}
                        message={msg.message}
                        timeInfo={msg.timeInfo}
                        variant={msg.variant}
                        timeout={msg.timeout}
                    />
                ))
            }
            </ToastContainer>
        </div>
    )

}