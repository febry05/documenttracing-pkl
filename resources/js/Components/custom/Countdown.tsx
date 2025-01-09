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
        if (timeLeft.days >= 365) {
            const years = Math.floor(timeLeft.days / 365);
            const months = Math.floor(timeLeft.days / 30 - (years * 12));
            const remainingDays = timeLeft.days % 365;
            timerComponents.push(
                <span key="years">
                    {years} Years {separateLines && <br />} {months} Months
                </span>
            );
        } else if (timeLeft.days >= 30) {
            const months = Math.floor(timeLeft.days / 30);
            const remainingDays = timeLeft.days % 30;
            timerComponents.push(
                <span key="months">
                    {months} Months {separateLines && <br />} {remainingDays} Days
                </span>
            );
        } else if (timeLeft.days) {
            timerComponents.push(
                <span key="days" className={timeLeft.days < 7 ? "text-destructive" : timeLeft.days < 15 && "text-yellow-600"}>
                    {timeLeft.days} Days {separateLines && <br />} {timeLeft.hours} Hours
                </span>
            );
        } else if (timeLeft.hours) {
            timerComponents.push(
                <span key="hours" className="text-destructive">
                    {timeLeft.hours} Hours {separateLines && <br />} {timeLeft.minutes} Minutes
                </span>
            );
        } else if (timeLeft.minutes) {
            timerComponents.push(
                <span key="minutes" className="text-destructive">
                    {timeLeft.minutes} Minutes {separateLines && <br />} {timeLeft.seconds} Seconds
                </span>
            );
        } else {
            timerComponents.push(
                <span key="seconds">
                    {timeLeft.seconds} Seconds
                </span>
            );
        }
    }

    return (
        timerComponents.length ? timerComponents : (<span className="italic text-muted-foreground">{ endText }</span>)
    );
};

export default Countdown;
