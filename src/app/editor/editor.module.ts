import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ModalService, OverlayHostService } from 'gentics-ui-core';

import { FormGeneratorModule } from '../form-generator/form-generator.module';
import { BlobService } from '../core/providers/blob/blob.service';
import { TagsEffectsService } from '../core/providers/effects/tags-effects.service';
import { SharedModule } from '../shared/shared.module';
import { EditorEffectsService } from './providers/editor-effects.service';
import { NodeEditorGuard } from './providers/node-editor-guard';
import { routes } from './editor.routes';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ConfirmNavigationModalComponent } from './components/confirm-navigation-modal/confirm-navigation-modal.component';
import { ContainerContentsComponent } from './components/container-contents/container-contents.component';
import { MasterDetailComponent } from './components/master-detail/master-detail.component';
import { NodeEditorComponent } from './components/node-editor/node-editor.component';
import { NodeLanguageLabelComponent } from './components/language-label/language-label.component';
import { NodeLanguageSwitcherComponent } from './components/node-language-switcher/node-language-switcher.component';
import { ProjectSwitcherComponent } from './components/project-switcher/project-switcher.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { VersionLabelComponent } from './components/version-label/version-label.component';
import { CreateNodeButtonComponent } from './components/create-node-button/create-node-button.component';
import { ContainerLanguageSwitcherComponent } from './components/container-language-switcher/container-language-switcher.component';
import { AvailableLanguagesListComponent } from './components/available-languages-list/available-languages-list.component';
import { NodeRowComponent } from './components/node-row/node-row.component';
import { ProgressbarModalComponent } from './components/progressbar-modal/progressbar-modal.component';
import { NodeTagsBarComponent } from './components/node-tags-bar/node-tags-bar.component';
import { CreateTagDialogComponent } from './components/create-tag-dialog/create-tag-dialog.component';
import { ContainerFileDropAreaComponent } from './components/container-file-drop-area/container-file-drop-area.component';
import { MultiFileUploadDialogComponent } from './components/multi-file-upload-dialog/multi-file-upload-dialog.component';
import { NodeConflictDialogComponent } from './components/node-conflict-dialog/node-conflict-dialog.component';
import { ConflictedFieldComponent } from './components/conflicted-field/conflicted-field.component';

@NgModule({
    imports: [
        SharedModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        FormGeneratorModule
    ],
    declarations: [
        AvailableLanguagesListComponent,
        BreadcrumbsComponent,
        ConfirmNavigationModalComponent,
        ContainerContentsComponent,
        ContainerLanguageSwitcherComponent,
        CreateNodeButtonComponent,
        MasterDetailComponent,
        NodeEditorComponent,
        NodeLanguageLabelComponent,
        NodeLanguageSwitcherComponent,
        ProjectSwitcherComponent,
        SearchBarComponent,
        VersionLabelComponent,
        NodeRowComponent,
        ProgressbarModalComponent,
        NodeTagsBarComponent,
        CreateTagDialogComponent,
        ContainerFileDropAreaComponent,
        MultiFileUploadDialogComponent,
        NodeConflictDialogComponent,
        ConflictedFieldComponent,
    ],
    entryComponents: [
        ConfirmNavigationModalComponent,
        ProgressbarModalComponent,
        CreateTagDialogComponent,
        MultiFileUploadDialogComponent,
        NodeConflictDialogComponent
    ],
    providers: [
        EditorEffectsService,
        TagsEffectsService,
        NodeEditorGuard,
        ModalService,
        OverlayHostService,
        BlobService,
        HttpClientModule
    ]
})
export class EditorModule {
    public static routes = routes;
}