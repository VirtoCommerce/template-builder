import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarPanelComponent } from './components/toolbar-panel/toolbar-panel.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarButtonComponent } from './components/toolbar-button/toolbar-button.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { TemplateEditorComponent } from './components/template-editor/template-editor.component';
import { SectionItemComponent } from './components/section-item/section-item.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { CollapsibleItemComponent } from './components/collapsible-item/collapsible-item.component';
import { BlockItemComponent } from './components/block-item/block-item.component';
import { InnerListItemComponent } from './components/inner-list-item/inner-list-item.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { EditSectionComponent } from './components/edit-section/edit-section.component';
import { OverlapPanelComponent } from './components/overlap-panel/overlap-panel.component';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { StringComponent } from './controls/string/string.component';
import { CalendarComponent } from './controls/calendar/calendar.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { ColorComponent } from './controls/color/color.component';
import { FilesComponent } from './controls/files/files.component';
import { ImagesComponent } from './controls/images/images.component';
import { NumberComponent } from './controls/number/number.component';
import { SelectComponent } from './controls/select/select.component';
import { TextComponent } from './controls/text/text.component';
import { ControlHostDirective } from './controls/control-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ToolbarPanelComponent,
    PreviewComponent,
    SidebarComponent,
    ToolbarButtonComponent,
    TemplateSelectorComponent,
    TemplateEditorComponent,
    SectionItemComponent,
    AddSectionComponent,
    CollapsibleItemComponent,
    BlockItemComponent,
    InnerListItemComponent,
    InputSearchComponent,
    SeparatorComponent,
    EditSectionComponent,
    OverlapPanelComponent,
    SectionFormComponent,
    StringComponent,
    CalendarComponent,
    CheckboxComponent,
    ColorComponent,
    FilesComponent,
    ImagesComponent,
    NumberComponent,
    SelectComponent,
    TextComponent,
    ControlHostDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
