export interface Curso{
    idCurso:number;
    nombreCurso:string;
    idJornada:number;
    cursonombre:string;
    mesInicio:string;
    mesTermino:string;
    nombreJornada:string;
}

export interface PreciosCurso{
    certificacion:number;
    cursoId:number;
    idPrecios:number;
    matricula:number;
}

export interface cursoEditar{
    certificacion:number;
    dia:string;
    duracion:number;
    horaInicio:string;
    horaTermino:string;
    idCurso:number;
    jornadaId:number;
    matricula:number;
    mensualidad:number;
    mesInicio:string;
    mesTermino:string;
    nombreCurso:string;
    nombreJornada:string;
    diasConcatenados:string;
}
