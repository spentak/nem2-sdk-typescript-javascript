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

import {deepEqual} from 'assert';
import {expect} from 'chai';
import {NetworkType} from '../../..';
import {Address} from '../../../src/model/account/Address';
import {PublicAccount} from '../../../src/model/account/PublicAccount';
import {SecretLockInfo} from '../../../src/model/lock/SecretLockInfo';
import {Mosaic} from '../../../src/model/mosaic/Mosaic';
import {MosaicId} from '../../../src/model/mosaic/MosaicId';
import {UInt64} from '../../../src/model/UInt64';

describe('SecretLockInfo', () => {
    const secretLockInfoDTO = {
        lock: {
            account: PublicAccount.createFromPublicKey('B694186EE4AB0558CA4AFCFDD43B42114AE71094F5A1FC4A913FE9971CACD21D',
                NetworkType.MIJIN_TEST),
            mosaicId: new MosaicId([3646934825, 3576016193]),
            amount: new UInt64([1, 0]),
            height: new UInt64([1, 0]),
            status: 0,
            hashAlgorithm: 0,
            secret: 'B694186EE4AB0558CA4AFCFDD43B42114AE71094F5A1FC4A913FE9971CACD' +
            '21DB694186EE4AB0558CA4AFCFDD43B42114AE71094F5A1FC4A913FE9971CACD21D',
            recipient: Address.createFromRawAddress('SCTVW23D2MN5VE4AQ4TZIDZENGNOZXPRPRLIKCF2'),
        },
    };

    before(() => {

    });

    it('should create a SecretLockInfo object', () => {
        const secretLockInfo = new SecretLockInfo(
            secretLockInfoDTO.lock.account,
            new Mosaic(secretLockInfoDTO.lock.mosaicId, secretLockInfoDTO.lock.amount),
            secretLockInfoDTO.lock.height,
            secretLockInfoDTO.lock.status,
            secretLockInfoDTO.lock.hashAlgorithm,
            secretLockInfoDTO.lock.secret,
            secretLockInfoDTO.lock.recipient,
        );

        deepEqual(secretLockInfo.account, secretLockInfoDTO.lock.account);
        deepEqual(secretLockInfo.mosaic, new Mosaic(secretLockInfoDTO.lock.mosaicId, secretLockInfoDTO.lock.amount));
        deepEqual(secretLockInfo.expirationHeight, secretLockInfoDTO.lock.height);
        expect(secretLockInfo.status).to.be.equal(secretLockInfoDTO.lock.status);
        expect(secretLockInfo.hashType).to.be.equal(secretLockInfoDTO.lock.hashAlgorithm);
        expect(secretLockInfo.secret).to.be.equal(secretLockInfoDTO.lock.secret);
        deepEqual(secretLockInfo.recipient, secretLockInfoDTO.lock.recipient);
    });

});
