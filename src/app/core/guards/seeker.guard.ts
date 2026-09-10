import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const seekerGuard: CanActivateFn = () => {
  const router = inject(Router);
  const role = localStorage.getItem('role');

  if (role === 'JobSeeker') {
    return true;
  }

  return router.createUrlTree(['/login']);
};