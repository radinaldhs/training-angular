// src/app/cv/cv.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  getCvData() {
    return {
      name: 'Radinal',
      profilePicture: 'https://via.placeholder.com/150',
      bio: 'I am a passionate software developer with experience in Angular and modern web technologies.',
      contacts: {
        email: 'radinal@example.com',
        phone: '+123 456 7890',
        website: 'https://radinal.com',
      },
      skills: ['Angular', 'JavaScript', 'TypeScript', 'TailwindCSS', 'Node.js'],
    };
  }
}
