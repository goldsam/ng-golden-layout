import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGoldenLayoutConfiguration, GoldenLayoutConfiguration } from './src/config';
import { GoldenLayoutService } from './src/golden-layout.service';
import { GoldenLayoutComponent } from './src/golden-layout.component';

export * from './src/config';
export * from './src/hooks';
export * from './src/golden-layout.service';
export * from './src/golden-layout.component';

@NgModule({
  imports: [CommonModule],
  exports: [GoldenLayoutComponent],
  declarations: [GoldenLayoutComponent]
})
export class GoldenLayoutModule {
  static forRoot(config: IGoldenLayoutConfiguration): ModuleWithProviders {
    return {
      ngModule: GoldenLayoutModule,
      providers: [
        GoldenLayoutService,
        { provide: GoldenLayoutConfiguration, useValue: config }
      ]
    };
  }
}

