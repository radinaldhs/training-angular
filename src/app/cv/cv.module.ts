// src/app/cv/cv.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvPageComponent } from './cv-page/cv-page.component';
import { CvService } from './cv.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CvPageComponent],
  imports: [CommonModule, FormsModule],
  providers: [CvService],
  exports: [CvPageComponent],
})
export class CVModule {}
