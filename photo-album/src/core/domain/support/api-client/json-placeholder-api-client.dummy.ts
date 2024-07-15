import type {
  JsonPlaceholderApiClient,
  JsonPlaceholderApiProps,
  JsonPlaceholderApiResult,
} from "./json-placeholder-api-client";

export type JsonPlaceholderApiClientDummyProps = {
  getReturnValue: JsonPlaceholderApiResult;
};

export class JsonPlaceholderApiClientDummy implements JsonPlaceholderApiClient {
  readonly #getReturnValue: JsonPlaceholderApiResult;

  constructor(props?: JsonPlaceholderApiClientDummyProps) {
    this.#getReturnValue = props?.getReturnValue ?? {
      success: true,
      data: {
        id: 1,
        title: "dummy title",
        userId: 1,
      },
    };
  }

  async get(
    _params: JsonPlaceholderApiProps,
  ): Promise<JsonPlaceholderApiResult> {
    return this.#getReturnValue;
  }
}
