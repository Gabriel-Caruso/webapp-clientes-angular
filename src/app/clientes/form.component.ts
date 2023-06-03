import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente()
  titulo: string = "Crear cliente"

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    ){}

  ngOnInit(): void {   
    this.cargarCliente(); 
  }

  cargarCliente(): void {
    this.activateRouter.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

  public create(): void{
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} ${cliente.apellido} creado con éxito`, 'success')
      }
      );    
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} ${cliente.apellido} actualizado con éxito`, 'success')
    })
  }

}
