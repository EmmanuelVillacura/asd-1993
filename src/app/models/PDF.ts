import { Alumno } from "./alumno";
import { Curso, PreciosCurso } from "./curso";
import { Jornada } from "./jornada";
import { Mensualidad } from "./mensualidad";

export interface PDF{
    nombreCompleto:string;
    rutCliente:string;
    edadCliente:string;
    domicilioCliente:string;
    comunaCliente:string;
    telefonoCliente:string;
    horarioDia:string;
    horarioHora:string;
    horarioInicioClases:string;
    primeraMensualidad:string;
    montoCLiente:number;
    noseQueOnda:string;
    cursoId:number;
    mensualidades:Mensualidad[];
    cursoFiltradoJornada:Jornada[];
    preciosCurso:PreciosCurso[];
    alumno:Alumno[];
}