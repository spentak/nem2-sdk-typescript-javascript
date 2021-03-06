import 'rxjs/add/operator/toPromise';
import {AccountHttp} from '../../src/infrastructure/AccountHttp';
import {MosaicHttp} from '../../src/infrastructure/MosaicHttp';
import {NamespaceHttp} from '../../src/infrastructure/NamespaceHttp';
import {Address} from '../../src/model/account/Address';
import {MosaicService} from '../../src/service/MosaicService';
import {APIUrl} from '../conf/conf.spec';

describe('MosaicService', () => {

    it('should return the mosaic list skipping the expired mosaics', () => {
        const mosaicService = new MosaicService(
            new AccountHttp(APIUrl),
            new MosaicHttp(APIUrl),
            new NamespaceHttp(APIUrl),
        );

        const address = Address.createFromRawAddress('SCO2JY-N6OJSM-CJPPVS-Z3OX7P-TWPQEJ-GZTI6W-GLKK');

        return mosaicService.mosaicsAmountViewFromAddress(address)
            .flatMap((_) => _)
            .map((mosaic) => console.log('You have', mosaic.relativeAmount(), mosaic.fullName()))
            .toArray()
            .toPromise();
    });
});
