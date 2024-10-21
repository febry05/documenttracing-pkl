declare module '@inertiajs/inertia' {
    export function post(url: string, data?: any, options?: any): Promise<any>;
    export function get(url: string, data?: any, options?: any): Promise<any>;
    // Add more methods as needed
}
