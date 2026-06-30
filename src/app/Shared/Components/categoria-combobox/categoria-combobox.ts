import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-categoria-combobox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-combobox.html',
  styleUrls: ['./categoria-combobox.css']
})
export class CategoriaComboboxComponent {
  @Input() options: string[] = [];
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() categoryCreated = new EventEmitter<string>();

  searchText = '';
  isOpen = false;

  ngOnChanges(): void {
    if (this.searchText !== this.value) {
      this.searchText = this.value ?? '';
    }
  }

  get filteredOptions(): string[] {
    const query = this.searchText.trim().toLowerCase();

    if (!query) {
      return this.options;
    }

    return this.options.filter(option => option.toLowerCase().includes(query));
  }

  get showCreateButton(): boolean {
    return this.isOpen && this.searchText.trim().length > 0 && this.filteredOptions.length === 0;
  }

  openDropdown(): void {
    this.isOpen = true;
    this.searchText = this.value ?? '';
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value;
    this.value = target.value;
    this.valueChange.emit(this.value);
    this.isOpen = true;
  }

  selectOption(option: string): void {
    this.searchText = option;
    this.value = option;
    this.valueChange.emit(this.value);
    this.isOpen = false;
  }

  createCategory(): void {
    const nombre = this.searchText.trim();

    if (nombre) {
      this.value = nombre;
      this.valueChange.emit(this.value);
      this.categoryCreated.emit(nombre);
      this.isOpen = false;
    }
  }

  onFocus(): void {
    this.openDropdown();
  }
}
