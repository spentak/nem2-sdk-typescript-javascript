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

import {Observable} from 'rxjs/Observable';
import {Address} from '../model/account/Address';
import {SecretLockInfo} from '../model/lock/SecretLockInfo';
import {QueryParams} from './QueryParams';
import {LockFundsInfo} from '../model/lock/LockFundsInfo';
import {LockRoutesApi} from 'nem2-library';
import {NetworkHttp} from './NetworkHttp';
import {Http} from './Http';
import {PublicAccount} from '../model/account/PublicAccount';
import {Mosaic} from '../model/mosaic/Mosaic';
import {MosaicId} from '../model/mosaic/MosaicId';
import {UInt64} from '../model/UInt64';

/**
 * Lock http repository.
 *
 * @since 1.0
 *
 */

export class LockRepository extends Http {
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
            this.lockRoutesApi.getLockFunds(hash)).map((LockFundsInfoDTO) => {
           return new LockFundsInfo(
               PublicAccount.createFromPublicKey(LockFundsInfoDTO.account, networkType),
               new Mosaic(new MosaicId(LockFundsInfoDTO.mosaicId), new UInt64(LockFundsInfoDTO.amount)),
               new UInt64(LockFundsInfoDTO.height),
               LockFundsInfoDTO.status,
               LockFundsInfoDTO.hash);
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
                    PublicAccount.createFromPublicKey(secretLockInfoDTO.account, networkType),
                    new Mosaic(new MosaicId(secretLockInfoDTO.mosaicId), new UInt64(secretLockInfoDTO.amount)),
                    new UInt64(secretLockInfoDTO.height),
                    secretLockInfoDTO.status,
                    secretLockInfoDTO.hashType,
                    secretLockInfoDTO.secret,
                    Address.createFromEncoded(secretLockInfoDTO.recipient));
            }));
    }

    /**
     * Gets array of LockFundsInfo for an account
     * @param address - Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<SecretLockInfo[]>
     */
    getLockFundssInfoFromAccount(address: Address,
                                 queryParams?: QueryParams): Observable<LockFundsInfo[]> {
        return this.getNetworkTypeObservable()
            .flatMap((networkType) => Observable.fromPromise(
                this.lockRoutesApi.getLockFundsInfoFromAccount(address.plain(), queryParams != null ? queryParams : {}))
                .map((LockFundssInfoDTO) => {
                return LockFundssInfoDTO.map((LockFundsInfoDTO) => new LockFundsInfo(
                    PublicAccount.createFromPublicKey(LockFundsInfoDTO.account, networkType),
                    new Mosaic(new MosaicId(LockFundsInfoDTO.mosaicId), new UInt64(LockFundsInfoDTO.amount)),
                    new UInt64(LockFundsInfoDTO.height),
                    LockFundsInfoDTO.status,
                    LockFundsInfoDTO.hash));
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
                .map((LockFundssInfoDTO) => {
                    return LockFundssInfoDTO.map((secretLockInfoDTO) => new SecretLockInfo(
                        PublicAccount.createFromPublicKey(secretLockInfoDTO.account, networkType),
                        new Mosaic(new MosaicId(secretLockInfoDTO.mosaicId), new UInt64(secretLockInfoDTO.amount)),
                        new UInt64(secretLockInfoDTO.height),
                        secretLockInfoDTO.status,
                        secretLockInfoDTO.hashType,
                        secretLockInfoDTO.secret,
                        Address.createFromEncoded(secretLockInfoDTO.recipient));
                }));
    }
}
