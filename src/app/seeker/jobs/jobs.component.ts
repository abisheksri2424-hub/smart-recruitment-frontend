import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent {

  jobs = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'ABC Company',
      location: 'Jaffna',
      matchScore: 85
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Tech Solutions',
      location: 'Colombo',
      matchScore: 78
    }
  ];

}
