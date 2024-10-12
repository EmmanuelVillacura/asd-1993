export interface Jornada{
    dia:string;
    horaInicio:string;
    horaTermino:string;
    idCurso:number;
    nombreCurso:string;
    nombreJornada:string;
    mesInicio:string;
    mesTermino:string;
}

export interface JornadaCurso{
    idJornada:number;
    nombreJornada:string;
}