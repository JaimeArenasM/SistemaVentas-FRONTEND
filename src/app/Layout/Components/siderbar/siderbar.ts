import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-siderbar',
  standalone:true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './siderbar.html',
  styleUrl: './siderbar.css',
})
export class Siderbar {

  selectedCategory: string='Todos';

private router = inject(Router);
private route = inject(ActivatedRoute);


ngOnInit(){
  this.route.queryParams.subscribe(params=>{
    if (params['categoria']) {
      this.selectedCategory=params['categoria'];
    }
  });
}

filterByCategory(category:string){
  this.selectedCategory=category;

  this.router.navigate(['/store/catalogo'], {queryParams:{categoria: category}});
}

}
