import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function handleNumericInput(event: React.KeyboardEvent<HTMLInputElement>) {
    const char = event.key;
    // Check if the pressed key is not a digit or is not a control key
    if (!/^[0-9]$/.test(char) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(char)) {
        event.preventDefault(); // Prevent the input if not a number
    }
}
