import {LocalDataSource} from "../../../data/repository/LocalDataSource";
import {LocalRepository} from "../../../data/repository/LocalRepository";
import {Constants} from "../../../utils/Constants";
import StorageMock from "../../mock/StorageMock";

const dataSource: LocalDataSource = new StorageMock();
const subject = LocalRepository.getNewInstanceWithDataSource(dataSource);


beforeEach(() => {
    dataSource.clear();
});
it('returns a true if token is persisted and isAuthTokenPersisted is called', async (done) => {
    await dataSource.setItem(Constants.JWT_TOKEN_KEY, '123');
    subject.isAuthTokenPersisted().then((result: boolean) => {
        expect(result).toBe(true);
        done();
    });
});

it('returns a false if token is not persisted and isAuthTokenPersisted is called', async (done) => {
    await subject.isAuthTokenPersisted().then((_: boolean) => {
        expect(_).toBe(false);
        done();
    });
});

it('refreshes a token successfully', async (done) => {
    subject.refreshAuthToken('123').then((result) => {
        expect(result).toEqual('123');
        done();
    });

});

it('caches a session correctly', () => {

});