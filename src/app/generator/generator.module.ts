import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorComponent } from './generator.component';
import { GeneratorRoutingModule } from './generator-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'



@NgModule({
  declarations: [
    GeneratorComponent
  ],
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ReactiveFormsModule, FormsModule]
})

export class GeneratorModule {}
