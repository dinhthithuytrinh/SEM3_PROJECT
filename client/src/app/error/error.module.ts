import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { RouterModule } from '@angular/router';
import { ErrorRoutes } from './error.routing';

@NgModule({
  declarations: [ErrorComponent, NotFoundComponent, ServerErrorComponent],
  imports: [CommonModule, RouterModule.forChild(ErrorRoutes)],
})
export class ErrorModule {}
