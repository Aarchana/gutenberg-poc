import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule, MatSnackBarModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  exports: [MatInputModule,MatIconModule, BrowserAnimationsModule, MatSnackBarModule, MatCardModule]
})
export class AppMaterialModule { }
