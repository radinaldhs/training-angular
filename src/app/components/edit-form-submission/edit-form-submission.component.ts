import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealtimeDatabaseService } from '../../services/realtime-database.service';
import { PokemonService } from '../../services/pokemon.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanComponentDeactivate } from '../../guards/can-deactivate.guard';

@Component({
  selector: 'app-edit-form-submission',
  templateUrl: './edit-form-submission.component.html',
  styleUrls: ['./edit-form-submission.component.css'],
  standalone: false,
})
export class EditFormSubmissionComponent
  implements OnInit, CanComponentDeactivate
{
  submissionId: string = '';
  submissionForm: FormGroup;
  pokemonToBuy: any[] = [];
  buyOption: string = '1';
  formDirty: boolean = false;
  countries = [
    { code: '+1', name: '🇺🇸' },
    { code: '+62', name: '🇮🇩' },
  ];

  constructor(
    private route: ActivatedRoute,
    private databaseService: RealtimeDatabaseService,
    private pokemonService: PokemonService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.submissionForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneCountryCode: ['+1', Validators.required],
      phone: ['', Validators.required],
      address: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    this.submissionId = this.route.snapshot.paramMap.get('id') || '';
    const submission = await this.databaseService.getFormSubmission(
      this.submissionId
    );

    // Update the buyOption if available
    if (submission.buyOption) {
      this.buyOption = submission.buyOption;
    }

    // Fetch Pokemon details for each entry in pokemonToBuy
    if (submission.pokemonToBuy && Array.isArray(submission.pokemonToBuy)) {
      this.pokemonToBuy = await Promise.all(
        submission.pokemonToBuy.map(async (entry: any) => {
          const detailedPokemons = await Promise.all(
            entry.pokemon.map((pokemonName: string) =>
              this.pokemonService.getPokemonByName(pokemonName)
            )
          );
          return {
            pokemon: detailedPokemons,
            quantity: entry.quantity,
          };
        })
      );
    }

    // Patch form values with the fetched submission data
    this.submissionForm.patchValue({
      firstName: submission.firstName || '',
      lastName: submission.lastName || '',
      email: submission.email || '',
      phoneCountryCode: submission.phoneCountryCode || '+1',
      phone: submission.phone || '',
      address: submission.address || '',
    });

    this.submissionForm.valueChanges.subscribe(() => {
      this.formDirty = true;
    });
  }

  async saveChanges(): Promise<void> {
    if (this.submissionForm.invalid) {
      this.submissionForm.markAllAsTouched();
      return;
    }

    const updatedData = {
      ...this.submissionForm.value,
      buyOption: this.buyOption,
      pokemonToBuy: this.pokemonToBuy.map((entry) => ({
        pokemon: entry.pokemon.map((p: any) => p.name), // Map to Pokemon names only
        quantity: entry.pokemon.length, // Ensure quantity matches the number of selected Pokemon
      })),
    };

    try {
      await this.databaseService.updateFormSubmission(
        this.submissionId,
        updatedData
      );
      this.formDirty = false;
      this.router.navigate(['/submission']);
    } catch (error) {
      console.error('Error updating submission:', error);
    }
  }

  canDeactivate(): boolean {
    if (this.formDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
