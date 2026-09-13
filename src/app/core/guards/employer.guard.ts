import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const employerGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'Employer') {
    return true;
  }

  return router.createUrlTree(['/login']);
};