import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, MatProgressSpinner],
  exports: [LoaderComponent, MatProgressSpinner],
  providers: [LoaderService],
})
export class LayoutsModule {}
