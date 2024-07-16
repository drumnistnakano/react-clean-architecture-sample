import type { Logger } from "@/core/domain/support/logger";
import type { FindPhotoUseCase } from "@/core/usecase/find-photo-use-case-impl";
import { FIND_PHOTO_USE_CASE, LOGGER } from "@/di-container/service-id";
import type { Container } from "inversify";

export const findPhotoController = async ({
  container,
  albumId,
}: { container: Container; albumId: string }): Promise<void> => {
  const logger = container.get<Logger>(LOGGER);
  const findPhotoUseCase = container.get<FindPhotoUseCase>(FIND_PHOTO_USE_CASE);

  logger.info({
    message: `アルバムID ${albumId} の写真データを取得します`,
  });

  const result = await findPhotoUseCase(albumId);

  if (result.success === false) {
    logger.error({
      message: "予期せぬエラーが発生しました。終了します",
    });
    return;
  }

  logger.info({
    message: "写真データの取得に成功しました",
    data: result.data,
  });
  logger.info({ message: "完了" });
};
