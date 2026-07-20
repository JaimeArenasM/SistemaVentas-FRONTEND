import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDetailModalComponent } from './product-detail-modal';

describe('ProductDetailModalComponent', () => {
  let component: ProductDetailModalComponent;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ProductDetailModalComponent>>;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ProductDetailModalComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '1',
            name: 'Producto prueba',
            price: 10,
            description: 'Descripción',
            category: 'Cereales',
            image: 'image.png'
          }
        },
        { provide: MatDialogRef, useValue: dialogRef }
      ]
    });

    component = TestBed.createComponent(ProductDetailModalComponent).componentInstance;
  });

  it('should allow entering a custom quantity manually', () => {
    component.onCantidadInput({ target: { value: '7' } } as unknown as Event);

    expect(component.cantidad).toBe(7);
  });

  it('should keep at least one unit when the input is invalid', () => {
    component.onCantidadInput({ target: { value: '0' } } as unknown as Event);

    expect(component.cantidad).toBe(1);
  });
});
