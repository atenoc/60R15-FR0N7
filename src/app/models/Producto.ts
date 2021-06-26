export interface Producto{
    _id?:string;
    nombre: string;
    categoria: string;
    descripcion: string;
    imagenPath: string;
    precio: number;
    disponible: boolean;
    usuario_id: string;
}
