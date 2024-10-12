import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-buscar-curso',
  templateUrl: './buscar-curso.component.html',
  styleUrls: ['./buscar-curso.component.scss']
})
export class BuscarCursoComponent implements OnInit{

  loading: boolean = true;
  cursos:Curso[]=[];


  constructor(private cursoService:CursoService,private router:Router){}
  ngOnInit(): void {
    this.load();
  }

  async load(){
    await this.cargaCursos();
  }

  editarCurso(cursoId:number){
    this.router.navigateByUrl('editCurso/'+cursoId);
  }

  eliminarCurso(cursoId:number){

  }

  async cargaCursos(){
    const req = await this.cursoService.getCurso();
    this.cursos = req.data;
    this.loading = false;
  }

}
