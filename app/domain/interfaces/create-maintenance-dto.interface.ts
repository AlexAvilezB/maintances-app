export interface CreateMaintenanceDto {
    fechaInicio: string;
    fechaFin: string;
    descripcion: string;
    observaciones: string;
    equipoId: number;
    trabajadorId: number;
    estadoId: number;
    tipoId: number;
}