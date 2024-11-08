import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Estado } from './Interfaces/estado';
import { EstadoService } from './Servicios/estado.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogoInsertarEditarEstadoComponent } from './Dialogo/dialogo-insertar-editar-estado/dialogo-insertar-editar-estado.component';
import { DialogoEliminarComponent } from './Dialogo/dialogo-eliminar/dialogo-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'activo', 'acciones'];
    dataSourceEstado = new MatTableDataSource<Estado>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.listarEstados();
    }

    constructor(
        private _estadoService: EstadoService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {}

    listarEstados() {
        this._estadoService.listar().subscribe({
            next: (listaEstados: Estado[]) => {
                console.log(listaEstados);
                this.dataSourceEstado.data = listaEstados;
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    aperturaDialogo() {
        this.dialog
            .open(DialogoInsertarEditarEstadoComponent, {
                disableClose: true,
                width: '350px',
            })
            .afterClosed()
            .subscribe((resultado) => {
                if (resultado === 'creado') {
                    this.listarEstados();
                }
            });
    }

    editarEstado(estado: Estado) {
        this.dialog
            .open(DialogoInsertarEditarEstadoComponent, {
                disableClose: true,
                width: '350px',
                data: estado,
            })
            .afterClosed()
            .subscribe((resultado) => {
                if (resultado === 'editado') {
                    this.listarEstados();
                }
            });
    }

    alerta(msg: string, accion: string) {
        this._snackBar.open(msg, accion, {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000,
        });
    }

    eliminarEstado(estado: Estado) {
        this.dialog
            .open(DialogoEliminarComponent, {
                disableClose: true,
                width: '350px',
                data: estado,
            })
            .afterClosed()
            .subscribe((resultado) => {
                if (resultado === 'eliminado') {
                    this._estadoService.eliminar(estado.id).subscribe({
                        next: (respuesta: string) => {
                            this.alerta(`Estado eliminado correctamente: ${respuesta}`, 'Listo');
                            this.listarEstados();
                        },
                        error: (error) => {
                            this.alerta('Error al eliminar el estado', 'Error');
                            console.error(error);
                        },
                    });
                }
            });
    }

    exportarExcel(): void {
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSourceEstado.data);
        XLSX.utils.book_append_sheet(wb, ws, 'Estados');
        XLSX.writeFile(wb, 'Estados.xlsx');
    }

    ngAfterViewInit() {
        this.dataSourceEstado.paginator = this.paginator;
    }
}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}
