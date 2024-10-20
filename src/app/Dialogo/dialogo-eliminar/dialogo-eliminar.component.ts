import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estado } from '../../Interfaces/estado';

@Component({
    selector: 'app-dialogo-eliminar',
    templateUrl: './dialogo-eliminar.component.html',
    styleUrl: './dialogo-eliminar.component.css',
})
export class DialogoEliminarComponent implements OnInit {
    constructor(
        private dialogoReferencia: MatDialogRef<DialogoEliminarComponent>,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public dataEliminarEstado: Estado
    ) {}
    ngOnInit(): void {}

    eliminarEstado() {
        console.log(this.dataEliminarEstado);
        this.dialogoReferencia.close('eliminado');
    }
}
