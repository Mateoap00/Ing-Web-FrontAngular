import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estado } from '../../Interfaces/estado';
import { EstadoService } from '../../Servicios/estado.service';

@Component({
  selector: 'app-dialogo-insertar-editar-estado',
  templateUrl: './dialogo-insertar-editar-estado.component.html',
  styleUrl: './dialogo-insertar-editar-estado.component.css'
})
export class DialogoInsertarEditarEstadoComponent {
    constructor(private dialogoReferencia: MatDialogRef<DialogoInsertarEditarEstadoComponent>,
        private _snackBar: MatSnackBar, private _formBuilder: FormBuilder,
        private estadoServicio:EstadoService){
            this.formEstado = this._formBuilder.group({
                nombre: ['', Validators.required],
                descripcion: ['', Validators.required],
                activo: [true, Validators.required]
            });
    }

    ngOnInit(): void {}

    formEstado!: FormGroup;
    tituloForm: string = 'Agregar estado';
    tituloBoton: string = 'Agregar';
    listaEstados: Estado[] = [];

}
