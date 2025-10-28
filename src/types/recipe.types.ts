export interface Receta {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  descripcion_larga?: string;

  tags: {
    regiones: string[];
    tipos: string[];
    proteinas: string[];
    metodos: string[];
    momentos: string[];
    caracteristicas: string[];
    dificultad: string;
    ocasiones: string[];
  };

  ingredientes: Ingrediente[];
  preparacion: PasoPreparacion[];

  informacion: {
    tiempo_preparacion: number;
    tiempo_coccion: number;
    tiempo_total: number;
    porciones: number;
    costo_aproximado: string;
    nivel_dificultad: string;
  };

  nutricion?: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    fibra?: number;
    sodio?: number;
  };

  multimedia?: {
    imagen_principal?: string;
    imagenes_pasos?: string[];
    video_url?: string;
    fuente_receta?: string;
  };

  metadata?: {
    fecha_creacion: string;
    fecha_modificacion: string;
    autor: string;
    verificada: boolean;
    popularidad: number;
    valoracion_promedio: number;
    numero_valoraciones: number;
  };

  variantes?: RecetaVariante[];
  consejos_adicionales?: string[];
  historia?: string;
};

export interface Ingrediente {
  nombre: string;
  cantidad: string;
  unidad: string;
  opcional: boolean;
  sinonimos?: string[];
};

export interface PasoPreparacion {
  paso: number;
  titulo: string;
  instruccion: string;
  tiempo_estimado: number;
  consejos?: string[];
};

export interface RecetaVariante {
  nombre: string;
  cambios: string;
};

export interface RecetaConScore extends Receta {
  score: number;
  ingredientesCoincidentes: string[];
  ingredientesFaltantes: string[];
  porcentajeCoincidencia: number;
}
