import { useEffect, useState } from "react";

interface CountdownProps {
    startDate?: string | Date;
    endDate: string | Date;
    notStartedText?: string;
    endText?: string;
    separateLines?: boolean;
}

const Countdown: React.FC<CountdownProps> = (
        {
            startDate,
            endDate,
            notStartedText = 'Contract hasn\'t started',
            endText = 'Contract ended',
            separateLines = false
        }
    : CountdownProps) => {

    if (startDate && (+new Date(startDate) > +new Date())) {
        return (<span className="italic text-muted-foreground">{ notStartedText }</span>);
    }

    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
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

    if (timeLeft.days || timeLeft.hours || timeLeft.minutes || timeLeft.seconds) {
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
    }

    return (
        timerComponents.length ? timerComponents : (<span className="italic text-muted-foreground">{ endText }</span>)
    );
};

export default Countdown;
