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

    if (submission.buyOption) {
      this.buyOption = submission.buyOption;
    }

    if (submission.pokemonToBuy && Array.isArray(submission.pokemonToBuy)) {
      this.pokemonToBuy = await Promise.all(
        submission.pokemonToBuy.map(async (pokemonName: string) => {
          return this.pokemonService.getPokemonByName(pokemonName);
        })
      );
    }

    this.submissionForm.patchValue(submission);

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
      pokemonToBuy: this.pokemonToBuy.map((pokemon) => pokemon.name),
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
