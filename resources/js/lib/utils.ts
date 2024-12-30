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

    'Create Project Document Version',
    'View Project Document Version',
    'Update Document Project Document Version',
    'Delete Document Project Document Version',

    'View Update Document Project Document Version',
    'Add Update Document Project Document Version',
    'Delete Update Document Project Document Version',

    'Manage User',
    'Manage Master Data',
];

export const permissionGroups = {
    project: {
        name: "Project",
        permissions: [
            {
                "id": 1,
                "name": "Create Project"
            },
            {
                "id": 2,
                "name": "View Project"
            },
            {
                "id": 3,
                "name": "Update Project"
            },
            {
                "id": 4,
                "name": "Delete Project"
            },
            {
                "id": 5,
                "name": "Handle Owned Project",
                "description": "Can only update data related to their own project (person in charge of a project)"
            },
        ]
    },
    projectDocument: {
        name: "Project Document",
        permissions: [
            {
                "id": 6,
                "name": "Create Project Document"
            },
            {
                "id": 7,
                "name": "View Project Document"
            },
            {
                "id": 8,
                "name": "Update Project Document"
            },
            {
                "id": 9,
                "name": "Delete Project Document"
            },
        ]
    },
    projectDocumentVersion: {
        name: "Project Document Version",
        permissions: [
            {
                "id": 10,
                "name": "Create Project Document Version"
            },
            {
                "id": 11,
                "name": "View Project Document Version"
            },
            {
                "id": 12,
                "name": "Update Project Document Version"
            },
            {
                "id": 13,
                "name": "Delete Project Document Version"
            },
        ]
    },
    projectDocumentVersionUpdate: {
        name: "Project Document Version Update",
        permissions: [
            {
                "id": 14,
                "name": "View Project Document Version Update"
            },
            {
                "id": 15,
                "name": "Create Project Document Version Update"
            },
        ]
    },
    miscellaneous: {
        name: "Miscellaneous",
        permissions: [
            {
                "id": 16,
                "name": "Manage User"
            },
            {
                "id": 17,
                "name": "Manage Master Data"
            }
        ]
    },
}
