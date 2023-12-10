import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
    getEventsApi,
    getUserLikedEventsApi,
    // getUserEventsApi,
    // createEventApi,
    // getEventApi,
    // updateEventApi,
    // deleteEventApi,
    // getUserParticipatedEvents,
} from './event'; // yourApiFileにはAPI関数を定義したファイルを指定します
import { API_HOST } from '../utils/constant';

// Axios Mockを初期化
const mock = new MockAdapter(axios);

describe('API Tests', () => {
    // テスト前に各API呼び出しに対するモックを設定する
    beforeEach(() => {
        mock.reset();
    });

    // getEventsApiのテスト
    it('should get events', async () => {
        const page = 1;
        const pageSize = 10;

        // Mock the response
        mock.onGet(`${API_HOST}/api/user/events?page=${page}&pageSize=${pageSize}`).reply(200, { data: 'mocked data' });

        const response = await getEventsApi(page, pageSize);

        expect(response.data.data).toEqual('mocked data'); // Update the assertion here
    });


    // getUserEventsApi、createEventApi、getEventApi、updateEventApi、deleteEventApiのテストも同様に書くことができます

    // getUserLikedEventsApiのテスト
    it('should get user liked events', async () => {
        const userId = 123;
        const page = 1;
        const pageSize = 10;

        // モックの設定
        mock.onGet(`${API_HOST}/api/user/events/${userId}/liked_events?page=${page}&pageSize=${pageSize}`).reply(200, { data: 'mocked data' });

        const response = await getUserLikedEventsApi(userId, page, pageSize);

        expect(response.data).toEqual('mocked data');
    });

    // getUserParticipatedEventsのテストも同様に書くことができます
});
