/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {expect} from 'chai';
import {AccountHttp} from '../../src/infrastructure/AccountHttp';
import {MosaicHttp} from '../../src/infrastructure/MosaicHttp';
import {NamespaceHttp} from '../../src/infrastructure/NamespaceHttp';
import {Address} from '../../src/model/account/Address';
import {Mosaic} from '../../src/model/mosaic/Mosaic';
import {MosaicId} from '../../src/model/mosaic/MosaicId';
import {UInt64} from '../../src/model/UInt64';
import {MosaicAmountView} from '../../src/service/MosaicAmountView';
import {MosaicService} from '../../src/service/MosaicService';
import {MosaicView} from '../../src/service/MosaicView';
import * as conf from '../conf/conf.spec';

describe.skip('MosaicService', () => {
    it('mosaicsView', () => {
        const mosaicId = new MosaicId([3646934825, 3576016193]);
        const mosaicService = new MosaicService(
            new AccountHttp(conf.NIS2_URL), new MosaicHttp(conf.NIS2_URL), new NamespaceHttp(conf.NIS2_URL));
        return mosaicService.mosaicsView([mosaicId]).subscribe((mosaicsView: MosaicView[]) => {
            const mosaicView = mosaicsView[0];
            expect(mosaicView.mosaicName).to.be.equal('xem');
            expect(mosaicView.namespaceName).to.be.equal('nem');
        });
    });

    it('mosaicsView of no existing mosaicId', () => {
        const mosaicId = new MosaicId([1234, 1234]);
        const mosaicService = new MosaicService(
            new AccountHttp(conf.NIS2_URL), new MosaicHttp(conf.NIS2_URL), new NamespaceHttp(conf.NIS2_URL));
        return mosaicService.mosaicsView([mosaicId]).subscribe((mosaicsView: MosaicView[]) => {
            expect(mosaicsView.length).to.be.equal(0);
        });
    });

    it('mosaicsAmountView', () => {
        const mosaicService = new MosaicService(
            new AccountHttp(conf.NIS2_URL), new MosaicHttp(conf.NIS2_URL), new NamespaceHttp(conf.NIS2_URL));
        return mosaicService.mosaicsAmountViewFromAddress(Address.createFromRawAddress('SARNASAS2BIAB6LMFA3FPMGBPGIJGK6IJETM3ZSP'))
            .subscribe((mosaicsAmountView: MosaicAmountView[]) => {
                const mosaicAmountView = mosaicsAmountView[0];
                expect(mosaicAmountView.mosaicName).to.be.equal('xem');
                expect(mosaicAmountView.namespaceName).to.be.equal('nem');
            });
    });

    it('mosaicsAmountView of no existing account', () => {
        const mosaicService = new MosaicService(
            new AccountHttp(conf.NIS2_URL), new MosaicHttp(conf.NIS2_URL), new NamespaceHttp(conf.NIS2_URL));
        return mosaicService.mosaicsAmountViewFromAddress(Address.createFromRawAddress('SCKBZAMIQ6F46QMZUANE6E33KA63KA7KEQ5X6WJW'))
            .subscribe((mosaicsAmountView: MosaicAmountView[]) => {
                expect(mosaicsAmountView.length).to.be.equal(0);
            });
    });

    it('mosaicsAmountView', () => {
        const mosaic = new Mosaic(new MosaicId([3646934825, 3576016193]), UInt64.fromUint(1000));
        const mosaicService = new MosaicService(
            new AccountHttp(conf.NIS2_URL), new MosaicHttp(conf.NIS2_URL), new NamespaceHttp(conf.NIS2_URL));
        return mosaicService.mosaicsAmountView([mosaic]).subscribe((mosaicsAmountView: MosaicAmountView[]) => {
            const mosaicAmountView = mosaicsAmountView[0];
            expect(mosaicAmountView.mosaicName).to.be.equal('xem');
            expect(mosaicAmountView.namespaceName).to.be.equal('nem');
            expect(mosaicAmountView.amount.compact()).to.be.equal(1000);
        });
    });

});
