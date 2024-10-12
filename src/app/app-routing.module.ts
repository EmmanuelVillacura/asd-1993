import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCursoComponent } from './pages/curso/crear-curso/crear-curso.component';
import { EditarCursoComponent } from './pages/curso/editar-curso/editar-curso.component';
import { EliminarCursoComponent } from './pages/curso/eliminar-curso/eliminar-curso.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CrearComponent } from './pages/matricula/crear/crear.component';
import { EditarComponent } from './pages/matricula/editar/editar.component';
import { EliminarComponent } from './pages/matricula/eliminar/eliminar.component';
import { ContratoComponent } from './pages/pdf/contrato/contrato.component';
import { CrearProfeComponent } from './pages/profesor/crear-profe/crear-profe.component';
import { EditarProfeComponent } from './pages/profesor/editar-profe/editar-profe.component';
import { EliminarProfeComponent } from './pages/profesor/eliminar-profe/eliminar-profe.component';
import { AuthGuard } from './_helpers/auth.guard';
import { PruebapdfComponent } from './pages/pruebapdf/pruebapdf.component';
import { CrearAlumnoComponent } from './pages/alumno/crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './pages/alumno/editar-alumno/editar-alumno.component';
import { EliminarAlumnoComponent } from './pages/alumno/eliminar-alumno/eliminar-alumno.component';
import { BuscarCursoComponent } from './pages/curso/buscar-curso/buscar-curso.component';
import { ListarAlumnoComponent } from './pages/alumno/listar-alumno/listar-alumno.component';
import { AuthComponent } from './pages/auth/auth.component';
import { GuestGuard } from './_helpers/guest.guard';

const routes: Routes = [

  {path:'',redirectTo:'inicio',pathMatch:'full'},
  {path:'inicio',component:InicioComponent,canActivate:[AuthGuard]},
  {path:'addMatricula',component:CrearComponent,canActivate:[AuthGuard]},
  {path:'editMatricula',component:EditarComponent,canActivate:[AuthGuard]},
  {path:'deleteMatricula',component:EliminarComponent,canActivate:[AuthGuard]},

  {path:'addCurso',component:CrearCursoComponent,canActivate:[AuthGuard]},
  {path:'editCurso/:cursoId',component:EditarCursoComponent,canActivate:[AuthGuard]},
  {path:'deleteCurso',component:EliminarCursoComponent,canActivate:[AuthGuard]},
  {path:'buscarCurso',component:BuscarCursoComponent,canActivate:[AuthGuard]},
  
  {path:'addProfe',component:CrearProfeComponent,canActivate:[AuthGuard]},
  {path:'editProfe',component:EditarProfeComponent,canActivate:[AuthGuard]},
  {path:'deleteProfe',component:EliminarProfeComponent,canActivate:[AuthGuard]},
  {path:'contrato',component:ContratoComponent,canActivate:[AuthGuard]},
  {path:'prueba',component:PruebapdfComponent,canActivate:[AuthGuard]},


  {path:'addAlumno',component:CrearAlumnoComponent,canActivate:[AuthGuard]},
  {path:'editAlumno',component:EditarAlumnoComponent,canActivate:[AuthGuard]},
  {path:'deleteAlumno',component:EliminarAlumnoComponent,canActivate:[AuthGuard]},
  {path:'BuscarAlumno',component:ListarAlumnoComponent,canActivate:[AuthGuard]},
  {path:'login',component:AuthComponent,canActivate:[GuestGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
