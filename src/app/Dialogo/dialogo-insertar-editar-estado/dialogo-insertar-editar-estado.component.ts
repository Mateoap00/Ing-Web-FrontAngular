import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estado } from '../../Interfaces/estado';
import { EstadoService } from '../../Servicios/estado.service';

@Component({
    selector: 'app-dialogo-insertar-editar-estado',
    templateUrl: './dialogo-insertar-editar-estado.component.html',
    styleUrl: './dialogo-insertar-editar-estado.component.css',
})
export class DialogoInsertarEditarEstadoComponent implements OnInit {
    constructor(
        private dialogoReferencia: MatDialogRef<DialogoInsertarEditarEstadoComponent>,
        private _snackBar: MatSnackBar,
        private _formBuilder: FormBuilder,
        private estadoServicio: EstadoService,
        @Inject(MAT_DIALOG_DATA) public data: Estado
    ) {
        this.formEstado = this._formBuilder.group({
            id: [''],
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
            activo: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        if (this.data) {
            this.formEstado.patchValue({
                id: this.data.id,
                nombre: this.data.nombre,
                descripcion: this.data.descripcion,
                activo: this.data.activo,
            });
            this.tituloFormulario = 'Editar';
            this.tituloBoton = 'Actualizar';
        }
    }

    formEstado!: FormGroup;
    tituloFormulario: string = 'Nuevo';
    tituloBoton: string = 'Guardar';
    listaEstados: Estado[] = [];

    alerta(msg: string, accion: string) {
        this._snackBar.open(msg, accion, {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000,
        });
    }

    insertarEstado() {
        // console.log(this.formEstado);
        // console.log(this.formEstado.value);
        const modelo: Estado = {
            id: this.formEstado.value.id || 0,
            nombre: this.formEstado.value.nombre,
            descripcion: this.formEstado.value.descripcion,
            activo: this.formEstado.value.activo,
        };

        if (this.data == null) {
            this.estadoServicio.guardar(modelo).subscribe({
                next: (respuesta) => {
                    this.alerta('Estado guardado correctamente', 'Listo');
                    this.dialogoReferencia.close('creado');
                },
                error: (error) => {
                    this.alerta('Error al guardar el estado', 'Error');
                    console.error(error);
                },
            });
        } else {
            this.estadoServicio.actualizar(modelo).subscribe({
                next: (respuesta) => {
                    this.alerta('Estado actualizado correctamente', 'Listo');
                    this.dialogoReferencia.close('editado');
                },
                error: (error) => {
                    this.alerta('Error al actualizar el estado', 'Error');
                    console.error(error);
                },
            });
        }
    }
}
