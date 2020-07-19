import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MyFilterPipe } from './pipe/my-filter.pipe';
import { FormComponent } from './components/task-form/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskListDbComponent } from './components/task-list-db/task-list-db.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,    
    TaskListComponent, 
    MyFilterPipe, FormComponent, TaskListDbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  entryComponents:[FormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
