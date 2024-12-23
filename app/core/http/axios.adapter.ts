import { HttpAdapter } from './http.adapter';
import axios, { AxiosInstance, AxiosError } from 'axios';

interface Options {
    baseURL: string;
    params?: Record<string, string>;
    headers: Record<string, string>;
}

interface RequestOptions {
    headers?: Record<string, string>;
}

export class AxiosAdapter implements HttpAdapter {
    private axiosInstance: AxiosInstance;
    
    constructor(options: Options) {
        this.axiosInstance = axios.create({
            baseURL: options.baseURL,
            params: options.params,
            headers: options.headers,
        });
    }
    
    private handleError(error: AxiosError): never {
        if (error.response) {
            const { status, data } = error.response;
            
            if (status === 400) {
                // Manejo específico de errores 400
                throw new Error(`Bad Request (400): ${JSON.stringify(data)}`);
            }
            
            if (status === 403) {
                throw new Error(error.message);
            }
            
            if (status === 500) {
                // Manejo específico de errores 500
                throw new Error(`Internal Server Error (500): ${JSON.stringify(data)}`);
            }
            
            // Otros errores HTTP
            throw new Error(`HTTP Error (${status}): ${JSON.stringify(data)}`);
        }
        
        // Errores de red o de configuración
        throw new Error(`Network or Axios configuration error: ${error.message}`);
    }
    
    async get<T>(url: string, options?: RequestOptions): Promise<T> {
        try {
            const { data } = await this.axiosInstance.get(url, options);
            return data;
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }
    
    async post<T>(url: string, body: any, options?: RequestOptions): Promise<T> {
        try {
            const { data } = await this.axiosInstance.post(url, body, options);
            return data;
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }
    
    async put<T>(url: string, body: any, options?: RequestOptions): Promise<T> {
        try {
            const { data } = await this.axiosInstance.put(url, body, options);
            return data;
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }
    
    async patch<T>(url: string, body: any, options?: RequestOptions): Promise<T> {
        try {
            const { data } = await this.axiosInstance.patch(url, body, options);
            return data;
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }
    
    async delete(url: string, options?: RequestOptions): Promise<void> {
        try {
            
            const response = await this.axiosInstance.delete(url, { ...options });
            
            if (response.status === 204) {
                return;
            }
            
            throw new Error(`Unexpected status code: ${response.status}`);
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }
}
