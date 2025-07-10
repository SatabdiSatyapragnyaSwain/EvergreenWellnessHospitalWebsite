import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  let IslogedIn = sessionStorage.getItem("IslogedIn");

  console.log('Is user logged in?', IslogedIn);

  if (IslogedIn !== "True") {
    _router.navigate(['/login']);
    return false;
  }
  return true;
};

