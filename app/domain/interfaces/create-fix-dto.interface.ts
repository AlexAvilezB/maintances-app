export interface CreateFixDto {
    equipoId: number;
    trabajadorId: number;
    estadoId: number;
    descripcion: string;
    diagnostico: string;
    solucion: string;
    costoReparacion: number;
    fechaInicio: string;
    fechaFin: string;
    observaciones: string;
}