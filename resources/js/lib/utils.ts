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

export const can = (permissions, permission) => permissions.includes(permission);

export const canAny = (permissions, permissionList) => permissionList.some(permission => permissions.includes(permission));

export const permission = [
    'Create Project',
    'View Project',
    'Update Project',
    'Delete Project',

    'Create Document Project',
    'View Document Project',
    'Update Document Project',
    'Delete Document Project',

    'Create Project Version',
    'View Project Version',
    'Update Document Project Version',
    'Delete Document Project Version',

    'View Update Document Project Version',
    'Add Update Document Project Version',
    'Delete Update Document Project Version',

    'Manage User',
    'Manage Master Data',
];
