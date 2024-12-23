export abstract class HttpAdapter {
    abstract get<T>(url: string, options?: any): Promise<T>;
    abstract post<T>(url: string, body: any, options?: any): Promise<T>;
    abstract put<T>(url: string, body: any, options?: any): Promise<T>;
    abstract delete(url: string, options?: any): Promise<void>
    abstract patch<T>(url: string, body: any, options?: any): Promise<T>;
}