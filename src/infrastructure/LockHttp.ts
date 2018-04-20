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

import {LockRoutesApi} from 'nem2-library';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {Observable} from 'rxjs/Observable';
import {Address} from '../model/account/Address';
import {PublicAccount} from '../model/account/PublicAccount';
import {LockFundsInfo} from '../model/lock/LockFundsInfo';
import {SecretLockInfo} from '../model/lock/SecretLockInfo';
import {Mosaic} from '../model/mosaic/Mosaic';
import {MosaicId} from '../model/mosaic/MosaicId';
import {UInt64} from '../model/UInt64';
import {Http} from './Http';
import {LockRepository} from './LockRepository';
import {NetworkHttp} from './NetworkHttp';
import {QueryParams} from './QueryParams';

/**
 * Lock http repository.
 *
 * @since 1.0
 *
 */

export class LockHttp extends Http implements LockRepository {
    /**
     * @internal
     * Nem2 Library lock routes api
     */
    private lockRoutesApi: LockRoutesApi;

    /**
     * Constructor
     * @param url
     * @param networkHttp
     */
    constructor(url: string, networkHttp?: NetworkHttp) {
        networkHttp = networkHttp == null ? new NetworkHttp(url) : networkHttp;
        super(url, networkHttp);
        this.lockRoutesApi = new LockRoutesApi(this.apiClient);
    }

    /**
     * Gets a LockFundsInfo for a given secret.
     * @param hash - Hash
     * @returns Observable<LockFundsInfo>
     */
    getLockFunds(hash: string): Observable<LockFundsInfo> {
        return this.getNetworkTypeObservable()
            .flatMap((networkType) => Observable.fromPromise(
            this.lockRoutesApi.getLockFunds(hash)).map((lockFundsInfoDTO) => {
            return new LockFundsInfo(
                PublicAccount.createFromPublicKey(lockFundsInfoDTO.lock.account, networkType),
                new Mosaic(new MosaicId(lockFundsInfoDTO.lock.mosaicId), new UInt64(lockFundsInfoDTO.lock.amount)),
                new UInt64(lockFundsInfoDTO.lock.height),
                lockFundsInfoDTO.lock.status,
                lockFundsInfoDTO.lock.hash,
                lockFundsInfoDTO.meta.id);
        }));
    }

    /**
     * Gets a SecretLockInfo for a given secret.
     * @param secret - Secret proof hashed
     * @returns Observable<SecretLockInfo>
     */
    getSecretLock(secret: string): Observable<SecretLockInfo> {
        return this.getNetworkTypeObservable()
            .flatMap((networkType) => Observable.fromPromise(
                this.lockRoutesApi.getSecretLock(secret)).map((secretLockInfoDTO) => {
                return new SecretLockInfo(
                    PublicAccount.createFromPublicKey(secretLockInfoDTO.lock.account, networkType),
                    new Mosaic(new MosaicId(secretLockInfoDTO.lock.mosaicId), new UInt64(secretLockInfoDTO.lock.amount)),
                    new UInt64(secretLockInfoDTO.lock.height),
                    secretLockInfoDTO.lock.status,
                    secretLockInfoDTO.lock.hashAlgorithm,
                    secretLockInfoDTO.lock.secret,
                    Address.createFromEncoded(secretLockInfoDTO.lock.recipient),
                    secretLockInfoDTO.meta.id);
            }));
    }

    /**
     * Gets array of LockFundsInfo for an account
     * @param address - Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<LockFundsInfo[]>
     */
    getLockFundsInfoFromAccount(address: Address,
                                queryParams?: QueryParams): Observable<LockFundsInfo[]> {
        return this.getNetworkTypeObservable()
            .flatMap((networkType) => Observable.fromPromise(
                this.lockRoutesApi.getLockFundsInfoFromAccount(address.plain(), queryParams != null ? queryParams : {}))
                .map((lockFundsInfosDTO) => {
                return lockFundsInfosDTO.map((lockFundsInfoDTO) => new LockFundsInfo(
                    PublicAccount.createFromPublicKey(lockFundsInfoDTO.lock.account, networkType),
                    new Mosaic(new MosaicId(lockFundsInfoDTO.lock.mosaicId), new UInt64(lockFundsInfoDTO.lock.amount)),
                    new UInt64(lockFundsInfoDTO.lock.height),
                    lockFundsInfoDTO.lock.status,
                    lockFundsInfoDTO.lock.hash,
                    lockFundsInfoDTO.meta.id));
            }));
    }

    /**
     * Gets array of SecretLockInfo for an account
     * @param address - Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<SecretLockInfo[]>
     */
    getSecretLocksInfoFromAccount(address: Address,
                                  queryParams?: QueryParams): Observable<SecretLockInfo[]> {
        return this.getNetworkTypeObservable()
            .flatMap((networkType) => Observable.fromPromise(
                this.lockRoutesApi.getSecretLocksInfoFromAccount(address.plain(), queryParams != null ? queryParams : {}))
                .map((secretLocksInfoDTO) => {
                    return secretLocksInfoDTO.map((secretLockInfoDTO) => new SecretLockInfo(
                        PublicAccount.createFromPublicKey(secretLockInfoDTO.lock.account, networkType),
                        new Mosaic(new MosaicId(secretLockInfoDTO.lock.mosaicId), new UInt64(secretLockInfoDTO.lock.amount)),
                        new UInt64(secretLockInfoDTO.lock.height),
                        secretLockInfoDTO.lock.status,
                        secretLockInfoDTO.lock.hashAlgorithm,
                        secretLockInfoDTO.lock.secret,
                        Address.createFromEncoded(secretLockInfoDTO.lock.recipient),
                        secretLockInfoDTO.meta.id));
                }));
    }
}
