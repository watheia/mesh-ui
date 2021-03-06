import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { routes } from './login.routes';
import { AuthEffectsService } from './providers/auth-effects.service';

@NgModule({
    declarations: [LoginComponent],
    imports: [SharedModule, RouterModule.forChild(routes)]
})
export class LoginModule {
    public static routes = routes;
}
