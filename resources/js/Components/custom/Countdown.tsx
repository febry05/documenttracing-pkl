import { useEffect, useState } from "react";

interface CountdownProps {
    targetDate: string | Date;
    separateLines?: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, separateLines = false }: CountdownProps) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: { days?: number; hours?: number; minutes?: number; seconds?: number } = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    if (timeLeft.days) {
        timerComponents.push(
            <span key="days">
                {timeLeft.days} Days {separateLines && <br />} {timeLeft.hours} Hours
            </span>
        );
    } else if (timeLeft.hours) {
        timerComponents.push(
            <span key="hours">
                {timeLeft.hours} Hours {separateLines && <br />} {timeLeft.minutes} Minutes
            </span>
        );
    } else if (timeLeft.minutes) {
        timerComponents.push(
            <span key="minutes">
                {timeLeft.minutes} Minutes {separateLines && <br />} {timeLeft.seconds} Seconds
            </span>
        );
    } else {
        timerComponents.push(
            <span key="seconds">
                {timeLeft.seconds} seconds
            </span>
        );
    }

    return (
        timerComponents.length ? timerComponents : "Time's up!"
    );
};

export default Countdown;
