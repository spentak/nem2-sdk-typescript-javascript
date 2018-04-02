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
import {XEM} from '../../src/model/mosaic/XEM';
import {APIUrl} from '../conf/conf.spec';

describe('LockHttp', () => {
    const lockHttp = new LockHttp(APIUrl);
    const accountAddress = Address.createFromRawAddress('SDRDGFTDLLCB67D4HPGIMIHPNSRYRJRT7DOBGWZY');

    describe('getLockFunds', () => {
        it('should call getLockFunds successfully', (done) => {
            lockHttp.getLockFunds('ADF6E45D8C21BC3B835A2C3ABAC90800A270601F0B1361BC46C26E00968105E6')
                .subscribe((lockFundsInfo) => {
                    expect(lockFundsInfo.account.address).to.be.equal(accountAddress);
                    expect(lockFundsInfo.mosaic).to.be.equal(XEM.createAbsolute(10));
                    done();
                });
        });
    });

    describe('getSecretLock', () => {
        it('should call getSecretLock successfully', (done) => lockHttp
            .getSecretLock('E70D37DA074D5F2CEF6BCE7E3E06D3D7E42E5A653EDDE49EDEB0628C295883' +
                'CE6685494FE64B835762BB2D5959AE48F87501E7DB3B826B4C1BA9D3BA70BC5DC5').subscribe((secretLockInfo) => {
                expect(secretLockInfo.account.address).to.be.equal(accountAddress);
                expect(secretLockInfo.mosaic).to.be.equal(XEM.createAbsolute(10));
                done();
            }));
    });

    describe('getLockFundsInfoFromAccount', () => {
        it('should call getLockFundsInfoFromAccount successfully', (done) => lockHttp
            .getLockFundsInfoFromAccount(accountAddress).subscribe((lockFundsInfo) => {
                expect(lockFundsInfo[0].account.address).to.be.equal(accountAddress);
                expect(lockFundsInfo[0].mosaic).to.be.equal(XEM.createAbsolute(10));
                done();
            }));
    });

    describe('getSecretLocksInfoFromAccount', () => {
        it('should call getSecretLocksInfoFromAccount successfully', (done) => lockHttp
            .getSecretLocksInfoFromAccount(accountAddress).subscribe((secretLocksInfo) => {
                expect(secretLocksInfo[0].account.address).to.be.equal(accountAddress);
                expect(secretLocksInfo[0].mosaic).to.be.equal(XEM.createAbsolute(10));
                done();
        }));
    });
});
