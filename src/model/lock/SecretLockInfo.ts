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

import {Address} from '../account/Address';
import {PublicAccount} from '../account/PublicAccount';
import {Mosaic} from '../mosaic/Mosaic';
import {HashType} from '../transaction/HashType';
import {UInt64} from '../UInt64';
import {LockStatus} from './LockStatus';

export class SecretLockInfo {

    constructor(public readonly account: PublicAccount,
                public readonly mosaic: Mosaic,
                public readonly expirationHeight: UInt64,
                public readonly status: LockStatus,
                public readonly hashType: HashType,
                public readonly secret: string,
                public readonly recipient: Address) {

    }
}