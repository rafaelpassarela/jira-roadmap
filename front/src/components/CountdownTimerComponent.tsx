import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

interface CountdownTimerProps {
    initialTime: number; // Initial time in seconds
    onEndtimerCallback: () => void;
}

export default function CountdownTimer(props: CountdownTimerProps) {
    const [time, setTime] = useState(props.initialTime);
    let notified: boolean = false;

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (time > 0) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [time]);

    function getView() {
        if (!notified && time === 0) {
            console.log('Send timer callback');
            notified = true;
            props.onEndtimerCallback();
        }
        return (
            <div>
                <ProgressBar now={time} label={`${time}`} min={0} max={props.initialTime} animated/>
            </div>
        );
    }

    return (
        getView()
    );
};
