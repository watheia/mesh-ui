import { Injectable } from '@angular/core';
import { CloneDepth, Immutable, StateActionBranch } from 'immutablets';

import { AppState } from '../models/app-state.model';
import { UIState } from '../models/ui-state.model';
import { UILanguage } from '../../shared/providers/i18n/i18n.service';
import { Project } from '../../common/models/project.model';


@Injectable()
@Immutable()
export class UIStateActions extends StateActionBranch<AppState> {
    @CloneDepth(1) private ui: UIState;

    constructor() {
        super({
            uses: ['ui'],
            initialState: {
                ui: {
                    currentLanguage: 'en',
                    currentProject: '55f6a4666eb8467ab6a4666eb8867a84'
                }
            }
        });
    }

    setLanguage(newUiLanguage: UILanguage): void {
        this.ui.currentLanguage = newUiLanguage;
    }

    setProject(newProjectUuid: string): void {
        this.ui.currentProject = newProjectUuid;
    }
}
