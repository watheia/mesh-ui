import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { async, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Checkbox, GenticsUICoreModule, ModalService } from 'gentics-ui-core';

import { TAGS_FIELD_TYPE } from '../../../common/models/common.model';
import { ConfigService } from '../../../core/providers/config/config.service';
import { MockConfigService } from '../../../core/providers/config/config.service.mock';
import { I18nService } from '../../../core/providers/i18n/i18n.service';
import { MockI18nService } from '../../../core/providers/i18n/i18n.service.mock';
import { AudioPlayButtonComponent } from '../../../shared/components/audio-play-button/audio-play-button.component';
import { FilePreviewComponent } from '../../../shared/components/file-preview/file-preview.component';
import { MockI18nPipe } from '../../../shared/pipes/i18n/i18n.pipe.mock';
import { ApplicationStateService } from '../../../state/providers/application-state.service';
import { TestApplicationState } from '../../../state/testing/test-application-state.mock';

import { MockModalService } from '../../../../testing/modal.service.mock';
import { ConflictedFieldComponent } from './conflicted-field.component';

describe('ConflictedFieldComponent', () => {
    let component: ConflictedFieldComponent;
    let fixture: ComponentFixture<ConflictedFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConflictedFieldComponent, FilePreviewComponent, AudioPlayButtonComponent, MockI18nPipe],
            providers: [
                { provide: I18nService, useClass: MockI18nService },
                { provide: ModalService, useClass: MockModalService },
                { provide: ApplicationStateService, useClass: TestApplicationState },
                { provide: ConfigService, useClass: MockConfigService }
            ],
            imports: [GenticsUICoreModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConflictedFieldComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.conflictedField = {
            field: { type: TAGS_FIELD_TYPE, name: 'somename' },
            localValue: 'somavalue',
            remoteValue: 'somevalue',
            overwrite: false,
            conflictedFields: []
        };
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render simple text', () => {
        component.conflictedField = {
            field: { type: 'string', name: 'somename' },
            localValue: 'local value',
            remoteValue: 'remote value',
            overwrite: false,
            conflictedFields: []
        };
        fixture.detectChanges();

        const mineElement: DebugElement = fixture.debugElement.query(By.css('.local-val'));
        const theirElement: DebugElement = fixture.debugElement.query(By.css('.remote-val'));

        expect(mineElement.nativeElement.innerHTML).toContain(component.conflictedField.localValue);
        expect(theirElement.nativeElement.innerHTML).toContain(component.conflictedField.remoteValue);
    });

    it('should render checkboxes for boolean conflicts', () => {
        component.conflictedField = {
            field: { type: 'boolean', name: 'somename' },
            localValue: true,
            remoteValue: false,
            overwrite: false,
            conflictedFields: []
        };
        fixture.detectChanges();

        const mineElement: DebugElement = fixture.debugElement.query(By.css('.local-val gtx-checkbox'));
        expect(mineElement).toBeDefined();
        expect((mineElement.componentInstance as Checkbox).checked).toBeTruthy();

        const theirElement: DebugElement = fixture.debugElement.query(By.css('.remote-val gtx-checkbox'));
        expect(theirElement).toBeDefined();
        expect((theirElement.componentInstance as Checkbox).checked).toBeFalsy();
    });

    it('should render recursively for the micronode', () => {
        component.conflictedField = {
            field: { type: 'micronode', name: 'micronode' },
            localValue: 'somavalue',
            remoteValue: 'somevalue',
            overwrite: false,
            conflictedFields: [
                {
                    field: { type: 'number', name: 'number' },
                    localValue: '1',
                    remoteValue: '2',
                    overwrite: false
                },

                {
                    field: { type: 'string', name: 'title' },
                    localValue: 'mine title',
                    remoteValue: 'theirs title',
                    overwrite: true
                }
            ]
        };
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('.micronode-row')).length).toEqual(1);
        expect(fixture.debugElement.queryAll(By.css('.micronode-row .change-item')).length).toEqual(
            component.conflictedField.conflictedFields!.length
        );
    });

    it('should allow the user to select the prefered version', () => {
        component.conflictedField = {
            field: { type: TAGS_FIELD_TYPE, name: 'somename' },
            localValue: 'somavalue',
            remoteValue: 'somevalue',
            overwrite: false,
            conflictedFields: []
        };
        fixture.detectChanges();

        const theirElement: DebugElement = fixture.debugElement.query(By.css('.remote-val'));
        const mineElement: DebugElement = fixture.debugElement.query(By.css('.local-val'));

        // First their version is selected because of overwrite: false in the conflictedField definition
        expect(theirElement.classes['selected']).toBeTruthy();
        expect(mineElement.classes['selected']).toBeFalsy();

        mineElement.triggerEventHandler('click', null);
        fixture.detectChanges();

        // Now our version should be selected
        expect(theirElement.classes['selected']).toBeFalsy();
        expect(mineElement.classes['selected']).toBeTruthy();
    });
});

