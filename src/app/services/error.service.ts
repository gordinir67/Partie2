import { Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorService {

  // signal global (null = pas d'erreur)
  message = signal<string | null>(null);

  setError(error: HttpErrorResponse) {

    if (error.status === 0) {
      this.message.set('Impossible de contacter le serveur. Vérifiez votre connexion.');
    }
    else if (error.status === 404) {
      this.message.set('Ressource introuvable.');
    }
    else if (error.status === 500) {
      this.message.set('Erreur interne. Veuillez réessayer plus tard.');
    }
    else {
      this.message.set('Une erreur inattendue est survenue.');
    }
  }

  clear() {
    this.message.set(null);
  }
}
