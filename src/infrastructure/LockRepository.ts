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

/**
 * Lock interface repository.
 *
 * @since 1.0
 */
export interface LockRepository {

    /**
     * Gets a LockFundsInfo for a given secret.
     * @param hash - Hash
     * @returns Observable<LockFundsInfo>
     */
    getLockFunds(hash: string): Observable<LockFundsInfo>;

    /**
     * Gets a SecretLockInfo for a given secret.
     * @param secret - Secret proof hashed
     * @returns Observable<SecretLockInfo>
     */
    getSecretLock(secret: string): Observable<SecretLockInfo>;

    /**
     * Gets array of LockFundsInfo for an account
     * @param address - Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<SecretLockInfo[]>
     */
    getLockFundsInfoFromAccount(address: Address,
                                queryParams?: QueryParams): Observable<LockFundsInfo[]>;

    /**
     * Gets array of SecretLockInfo for an account
     * @param address - Address
     * @param queryParams - (Optional) Query params
     * @returns Observable<SecretLockInfo[]>
     */
    getSecretLocksInfoFromAccount(address: Address,
                                  queryParams?: QueryParams): Observable<SecretLockInfo[]>;
}
