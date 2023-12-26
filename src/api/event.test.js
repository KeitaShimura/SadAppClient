import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getEventsApi,
  getUserEventsApi,
  createEventApi,
  getEventApi,
  updateEventApi,
  deleteEventApi,
  getUserLikedEventsApi,
  getUserParticipatedEvents,
} from "./event";
import { API_HOST } from "../utils/constant";

// Axios Mockを初期化
const mock = new MockAdapter(axios);

describe("API Tests", () => {
  // テスト前に各API呼び出しに対するモックを設定する
  beforeEach(() => {
    mock.reset();
  });

  // getEventsApiのテスト
  it("should get events", async () => {
    const page = 1;
    const pageSize = 10;

    // Mock the response
    mock
      .onGet(`${API_HOST}/api/user/events?page=${page}&pageSize=${pageSize}`)
      .reply(200, { data: "mocked data" });

    const response = await getEventsApi(page, pageSize);

    expect(response.data.data).toEqual("mocked data");
  });

  // getUserEventsApiのテスト
  it("should get user events", async () => {
    const userId = 123;
    const page = 1;
    const pageSize = 10;

    // モックの設定
    mock
      .onGet(
        `${API_HOST}/api/user/user_events/${userId}?page=${page}&pageSize=${pageSize}`,
      )
      .reply(200, { data: "mocked user events" });

    const response = await getUserEventsApi(userId, page, pageSize);

    expect(response.data).toEqual("mocked user events"); // データを直接検証する
  });

  // createEventApiのテスト
  it("should create an event", async () => {
    const eventData = { title: "Event Title", content: "Event Content" };

    // モックの設定
    mock
      .onPost(`${API_HOST}/api/user/events`)
      .reply(200, { data: "event created" });

    const response = await createEventApi(eventData, null);

    expect(response.data).toEqual("event created"); // データを直接検証する
  });

  // getEventApiのテスト
  it("should get an event", async () => {
    const eventId = 456;

    // モックの設定
    mock
      .onGet(`${API_HOST}/api/user/events/${eventId}`)
      .reply(200, { data: "mocked event" });

    const response = await getEventApi(eventId);

    expect(response.data.data).toEqual("mocked event");
  });

  // updateEventApiのテスト
  it("should update an event", async () => {
    const eventId = 789;
    const eventData = {
      title: "Updated Event",
      content: "This is an updated event",
      event_url: "https://updated-example.com",
      // event_date: "2024-01-01",
    };

    // モックの設定
    mock
      .onPut(`${API_HOST}/api/user/events/${eventId}`)
      .reply(200, { data: "event updated" });

    const response = await updateEventApi(eventId, eventData);

    expect(response.data.data).toEqual("event updated");
  });

  // deleteEventApiのテスト
  it("should delete an event", async () => {
    const eventId = 789;

    // モックの設定
    mock.onDelete(`${API_HOST}/api/user/events/${eventId}`).reply(204);

    const response = await deleteEventApi(eventId);

    expect(response.status).toEqual(204);
  });

  // getUserLikedEventsApiのテスト
  it("should get user liked events", async () => {
    const userId = 123;
    const page = 1;
    const pageSize = 10;

    // モックの設定
    mock
      .onGet(
        `${API_HOST}/api/user/events/${userId}/liked_events?page=${page}&pageSize=${pageSize}`,
      )
      .reply(200, { data: "mocked liked events" });

    const response = await getUserLikedEventsApi(userId, page, pageSize);

    expect(response.data).toEqual("mocked liked events");
  });

  // getUserParticipatedEventsのテスト
  it("should get user participated events", async () => {
    const userId = 123;
    const page = 1;
    const pageSize = 10;

    // モックの設定
    mock
      .onGet(
        `${API_HOST}/api/user/events/${userId}/participated_events?page=${page}&pageSize=${pageSize}`,
      )
      .reply(200, { data: "mocked participated events" });

    const response = await getUserParticipatedEvents(userId, page, pageSize);

    expect(response.data).toEqual("mocked participated events");
  });
});
