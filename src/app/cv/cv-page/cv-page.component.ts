// src/app/cv/cv-page/cv-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CvService } from '../cv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.css'],
  standalone: false,
})
export class CvPageComponent implements OnInit {
  title: string = 'Biodata';
  cvData: any;
  isBgToggled: boolean = false;

  constructor(private cvService: CvService, private router: Router) {}

  ngOnInit() {
    this.cvData = this.cvService.getCvData();
  }

  toggleBackground() {
    this.isBgToggled = !this.isBgToggled;
  }

  toggleMovePage() {
    this.router.navigate(['/pokemon']);
  }

  toggleSubmission() {
    this.router.navigate(['/submission']);
  }
}
