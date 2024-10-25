declare module '@inertiajs/inertia-react' {
    import { ComponentType } from 'react';
    export const Inertia: {
        visit(url: string, options?: any): void;
        post(url: string, data?: any, options?: any): Promise<any>;
        // Add more method declarations as needed
    };

    export const InertiaLink: ComponentType<any>; // Add more components as necessary
}
