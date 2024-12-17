import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';

@Component({
  selector: 'app-pokemon-purchase-drawer',
  templateUrl: './pokemon-purchase-drawer.component.html',
  styleUrls: ['./pokemon-purchase-drawer.component.css'],
  standalone: false,
})
export class PokemonPurchaseDrawerComponent implements OnChanges {
  @Input() pokemon: any = null;
  @Input() evolutionChain: any[] = [];
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<void>();

  purchaseForm: FormGroup;

  countries = [
    { code: '+1', name: '🇺🇸' },
    { code: '+62', name: '🇮🇩' },
  ];

  constructor(
    private fb: FormBuilder,
    private dbService: RealtimeDatabaseService
  ) {
    this.purchaseForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneCountryCode: ['+1', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      buyOption: ['1', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && changes['pokemon'].currentValue) {
      console.log('Updated Pokémon:', this.pokemon);
    }
  }

  async submitForm(): Promise<void> {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.purchaseForm.value,
      pokemonToBuy:
        this.purchaseForm.value.buyOption === '1'
          ? [this.pokemon.name]
          : this.evolutionChain.map((i: any) => i.name),
    };
    try {
      await this.dbService.saveFormSubmission(formData);
      this.closeDrawer.emit();
      this.formSubmitted.emit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
}
