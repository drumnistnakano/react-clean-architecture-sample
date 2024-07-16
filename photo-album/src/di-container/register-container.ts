import type { AlbumRepository } from "@/core/domain/repository/album-repository";
import type { PhotoRepository } from "@/core/domain/repository/photo-repository";
import type { JsonPlaceholderApiClient } from "@/core/domain/support/api-client";
import type { Logger } from "@/core/domain/support/logger";
import { JsonPlaceholderApiClientImpl } from "@/core/infrastructure/api-client/json-placeholder-api-client-impl";
import { LoggerImpl } from "@/core/infrastructure/logger/logger-impl";
import { AlbumRepositoryImpl } from "@/core/infrastructure/repository/album-repository-impl";
import { PhotoRepositoryImpl } from "@/core/infrastructure/repository/photo-repository-impl";
import { buildFindAlbumUseCase } from "@/core/usecase/find-album-use-case-impl";
import { buildFindPhotoUseCase } from "@/core/usecase/find-photo-use-case-impl";
import * as serviceId from "@/di-container/service-id";
import { Container } from "inversify";
import { unwrapEnvForCli, unwrapEnvForVite } from "./env-util";

/**
 * DIコンテナに値を登録し、そのDIコンテナを返す
 *
 * @param {frameWorkMode} framework種別（CLI/WEB）
 * @returns {Container} DIコンテナ
 */

export const registerContainer = (params: {
  frameWorkMode?: string;
}): Container => {
  const { frameWorkMode } = params;
  const container = new Container();

  /**
   * Environment
   */
  container
    .bind(serviceId.JSON_PLACEHOLDER_API_ENDPOINT)
    .toDynamicValue(() => {
      if (frameWorkMode === "CLI") {
        return unwrapEnvForCli("JSON_PLACEHOLDER_API_ENDPOINT");
      }
      return unwrapEnvForVite("JSON_PLACEHOLDER_API_ENDPOINT");
    })
    .inSingletonScope();

  /**
   * ユーティリティ
   */
  container
    .bind(serviceId.LOGGER)
    .toDynamicValue(() => new LoggerImpl())
    .inSingletonScope();

  /**
   * API
   */
  container
    .bind(serviceId.JSON_PLACEHOLDER_API_CLIENT)
    .toDynamicValue(
      (ctx) =>
        new JsonPlaceholderApiClientImpl({
          apiUrl: ctx.container.get<string>(
            serviceId.JSON_PLACEHOLDER_API_ENDPOINT,
          ),
        }),
    )
    .inSingletonScope();

  /**
   * リポジトリ
   */
  container
    .bind(serviceId.ALBUM_REPOSITORY)
    .toDynamicValue((ctx) => {
      return new AlbumRepositoryImpl(
        ctx.container.get<JsonPlaceholderApiClient>(
          serviceId.JSON_PLACEHOLDER_API_CLIENT,
        ),
        ctx.container.get<Logger>(serviceId.LOGGER),
      );
    })
    .inSingletonScope();

  container
    .bind(serviceId.PHOTO_REPOSITORY)
    .toDynamicValue((ctx) => {
      return new PhotoRepositoryImpl(
        ctx.container.get<JsonPlaceholderApiClient>(
          serviceId.JSON_PLACEHOLDER_API_CLIENT,
        ),
        ctx.container.get<Logger>(serviceId.LOGGER),
      );
    })
    .inSingletonScope();

  /**
   * UseCase
   */
  container
    .bind(serviceId.FIND_ALBUM_USE_CASE)
    .toDynamicValue((ctx) =>
      buildFindAlbumUseCase({
        albumRepository: ctx.container.get<AlbumRepository>(
          serviceId.ALBUM_REPOSITORY,
        ),
        logger: ctx.container.get<Logger>(serviceId.LOGGER),
      }),
    )
    .inSingletonScope();
  container
    .bind(serviceId.FIND_PHOTO_USE_CASE)
    .toDynamicValue((ctx) =>
      buildFindPhotoUseCase({
        photoRepository: ctx.container.get<PhotoRepository>(
          serviceId.PHOTO_REPOSITORY,
        ),
        logger: ctx.container.get<Logger>(serviceId.LOGGER),
      }),
    )
    .inSingletonScope();

  return container;
};
