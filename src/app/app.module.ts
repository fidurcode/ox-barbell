import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../auth/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutsModule } from '../layouts/layouts.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from '../interceptors/loader.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from '../auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LayoutsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButton,
    MatSelect,
    MatOption,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
