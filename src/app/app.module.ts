import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CrearComponent } from './pages/matricula/crear/crear.component';
import { EditarComponent } from './pages/matricula/editar/editar.component';
import { EliminarComponent } from './pages/matricula/eliminar/eliminar.component';
import { CrearProfeComponent } from './pages/profesor/crear-profe/crear-profe.component';
import { EditarProfeComponent } from './pages/profesor/editar-profe/editar-profe.component';
import { EliminarProfeComponent } from './pages/profesor/eliminar-profe/eliminar-profe.component';
import { CrearCursoComponent } from './pages/curso/crear-curso/crear-curso.component';
import { EditarCursoComponent } from './pages/curso/editar-curso/editar-curso.component';
import { EliminarCursoComponent } from './pages/curso/eliminar-curso/eliminar-curso.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ContratoComponent } from './pages/pdf/contrato/contrato.component';
import { PruebapdfComponent } from './pages/pruebapdf/pruebapdf.component';
import { CrearAlumnoComponent } from './pages/alumno/crear-alumno/crear-alumno.component';
import { EditarAlumnoComponent } from './pages/alumno/editar-alumno/editar-alumno.component';
import { EliminarAlumnoComponent } from './pages/alumno/eliminar-alumno/eliminar-alumno.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { BuscarCursoComponent } from './pages/curso/buscar-curso/buscar-curso.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ListarAlumnoComponent } from './pages/alumno/listar-alumno/listar-alumno.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { NzFormModule } from 'ng-zorro-antd/form';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoaderComponent } from './pages/loader/loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './pages/alert/alert.component';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CrearComponent,
    EditarComponent,
    EliminarComponent,
    CrearProfeComponent,
    EditarProfeComponent,
    EliminarProfeComponent,
    CrearCursoComponent,
    EditarCursoComponent,
    EliminarCursoComponent,
    ContratoComponent,
    PruebapdfComponent,
    CrearAlumnoComponent,
    EditarAlumnoComponent,
    EliminarAlumnoComponent,
    BuscarCursoComponent,
    ListarAlumnoComponent,
    AuthComponent,
    LoaderComponent,
    AlertComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzIconModule,
    NzButtonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzEmptyModule,
    NzUploadModule,
    NzModalModule,
    NzSwitchModule,
    NzImageModule,
    NzCardModule,
    NzTimePickerModule,
    NzCheckboxModule,
    NzListModule,
    NzSkeletonModule,
    NzAvatarModule,
    NzFormModule,
    ReactiveFormsModule,
    NgbModule 

  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
