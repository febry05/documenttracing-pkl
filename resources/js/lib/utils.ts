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
                "name": "Create Project",
                "label": "Create Projects",
            },
            {
                "id": 2,
                "name": "View Project",
                "label": "View Any Projects"
            },
            {
                "id": 3,
                "name": "Update Project",
                "label": "Update Any Projects",
            },
            {
                "id": 4,
                "name": "Delete Project",
                "label": "Delete Any Projects",
            },
            {
                "id": 5,
                "name": "Handle Owned Project",
                "label": "Handle Only Owned Project",
                "description": "This permission enables a user to be assigned to a project, allowing them to make changes to all aspects of the project, except for deleting it."
            },
        ]
    },
    projectDocument: {
        name: "Project Document",
        permissions: [
            {
                "id": 6,
                "name": "Create Project Document",
                "label": "Create Project Documents",
            },
            {
                "id": 7,
                "name": "View Project Document",
                "label": "View Any Project Documents",
            },
            {
                "id": 8,
                "name": "Update Project Document",
                "label": "Update Any Project Documents",
            },
            {
                "id": 9,
                "name": "Delete Project Document",
                "label": "Delete Any Project Documents",
            },
        ]
    },
    projectDocumentVersion: {
        name: "Project Document Version",
        permissions: [
            {
                "id": 10,
                "name": "Create Project Document Version",
                "label": "Create Project Document Versions",
            },
            {
                "id": 11,
                "name": "View Project Document Version",
                "label": "View Any Project Document Versions",
            },
            {
                "id": 12,
                "name": "Update Project Document Version",
                "label": "Update Any Project Document Versions",
            },
            {
                "id": 13,
                "name": "Delete Project Document Version",
                "label": "Delete Project Any Document Versions",
            },
        ]
    },
    projectDocumentVersionUpdate: {
        name: "Project Document Version Update",
        permissions: [
            {
                "id": 14,
                "name": "View Project Document Version Update",
                "label": "View Any Project Document Version Updates",
            },
            {
                "id": 15,
                "name": "Create Project Document Version Update",
                "label": "Create Any Project Document Version Updates",
            },
        ]
    },
    miscellaneous: {
        name: "Miscellaneous",
        permissions: [
            {
                "id": 16,
                "name": "Manage User",
                "label": "Manage Any User Data",
            },
            {
                "id": 17,
                "name": "Manage Master Data",
                "label": "Manage Any Master Data",
            }
        ]
    },
}
