import { HttpContextToken } from '@angular/common/http';

// Par défaut = false -> comportement barre fine standard
export const SHOW_FULLSCREEN_LOADER = new HttpContextToken<boolean>(() => false);