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
import {LockHttp} from '../../src/infrastructure/LockHttp';
import {Address} from '../../src/model/account/Address';
import {PublicAccount} from '../../src/model/account/PublicAccount';
import {NetworkType} from '../../src/model/blockchain/NetworkType';
import {XEM} from '../../src/model/mosaic/XEM';
import {UInt64} from '../../src/model/UInt64';
import {APIUrl} from '../conf/conf.spec';

describe('LockHttp', () => {
    const lockHttp = new LockHttp(APIUrl);
    const publicAccount = PublicAccount.createFromPublicKey('C2F93346E27CE6AD1A9F8F5E3066F83' +
        '26593A406BDF357ACB041E2F9AB402EFE', NetworkType.MIJIN_TEST);

    describe('getLockFunds', () => {
        it('should call getLockFunds successfully', (done) => {
            lockHttp.getLockFunds('9253B3165DF4D4FC0CE831F104BFCFDDAF50A6E36D1BAD35F234AFA0F32B29D6')
                .subscribe((lockFundsInfo) => {
                    expect(lockFundsInfo.account.address.plain()).to.be.equal(publicAccount.address.plain());
                    expect(lockFundsInfo.mosaic.id.toHex()).to.be.equal(XEM.MOSAIC_ID.toHex());
                    done();
                });
        });
    });

    describe('getSecretLock', () => {
        it('should call getSecretLock successfully', (done) => lockHttp
            .getSecretLock('F60CEC9733B94BE27751A54AE91E63FE20B977ADE0064265D225220D460F' +
                'F1137149D27F81430CB59CB0EEAE87A476D7262F3FA36606C1BD3E91EFCF187FEE89').subscribe((secretLockInfo) => {
                expect(secretLockInfo.account.address.plain()).to.be.equal(publicAccount.address.plain());
                expect(secretLockInfo.mosaic.id.toHex()).to.be.equal(XEM.MOSAIC_ID.toHex());
                done();
            }));
    });

    describe('getLockFundsInfoFromAccount', () => {
        it('should call getLockFundsInfoFromAccount successfully', (done) => lockHttp
            .getLockFundsInfoFromAccount(publicAccount.address).subscribe((lockFundsInfo) => {
                expect(lockFundsInfo[0].account.address.plain()).to.be.equal(publicAccount.address.plain());
                expect(lockFundsInfo[0].mosaic.id.toHex()).to.be.equal(XEM.MOSAIC_ID.toHex());
                done();
            }));
    });

    describe('getSecretLocksInfoFromAccount', () => {
        it('should call getSecretLocksInfoFromAccount successfully', (done) => lockHttp
            .getSecretLocksInfoFromAccount(publicAccount.address).subscribe((secretLocksInfo) => {
                expect(secretLocksInfo[0].account.address.plain()).to.be.equal(publicAccount.address.plain());
                expect(secretLocksInfo[0].mosaic.id.toHex()).to.be.equal(XEM.MOSAIC_ID.toHex());
                done();
        }));
    });
});
