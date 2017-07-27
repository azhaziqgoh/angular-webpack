import {platformBrowser} from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import {AppModuleNgFactory} from '../aot/src/app/app.module.ngfactory';

import './assets/styles';

if (process.env.ENV === 'production'){
    enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);