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
import {PublicAccount} from '../../../src/model/account/PublicAccount';
import {LockFundsInfo} from '../../../src/model/lock/LockFundsInfo';
import {Mosaic} from '../../../src/model/mosaic/Mosaic';
import {MosaicId} from '../../../src/model/mosaic/MosaicId';
import {UInt64} from '../../../src/model/UInt64';

describe('LockFundsInfo', () => {
    const lockFundsInfoDTO = {
        lock: {
            account: PublicAccount.createFromPublicKey('B694186EE4AB0558CA4AFCFDD43B42114AE71094F5A1FC4A913FE9971CACD21D',
                NetworkType.MIJIN_TEST),
            mosaicId: new MosaicId([3646934825, 3576016193]),
            amount: new UInt64([1, 0]),
            height: new UInt64([1, 0]),
            status: 0,
            hash: 'B694186EE4AB0558CA4AFCFDD43B42114AE71094F5A1FC4A913FE9971CACD' +
            '21DB694186EE4AB0558CA4AFCFDD43B42114AE71094F5A1FC4A913FE9971CACD21D',
        },
    };

    before(() => {

    });

    it('should create a LockFundsInfo object', () => {
        const lockFundsInfo = new LockFundsInfo(
            lockFundsInfoDTO.lock.account,
            new Mosaic(lockFundsInfoDTO.lock.mosaicId, lockFundsInfoDTO.lock.amount),
            lockFundsInfoDTO.lock.height,
            lockFundsInfoDTO.lock.status,
            lockFundsInfoDTO.lock.hash,
        );

        deepEqual(lockFundsInfo.account, lockFundsInfoDTO.lock.account);
        deepEqual(lockFundsInfo.mosaic, new Mosaic(lockFundsInfoDTO.lock.mosaicId, lockFundsInfoDTO.lock.amount));
        deepEqual(lockFundsInfo.expirationHeight, lockFundsInfoDTO.lock.height);
        expect(lockFundsInfo.status).to.be.equal(lockFundsInfoDTO.lock.status);
        expect(lockFundsInfo.hash).to.be.equal(lockFundsInfoDTO.lock.hash);
    });

});
