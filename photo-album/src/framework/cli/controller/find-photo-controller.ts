import type { Logger } from "@/core/domain/support/logger";
import type { FindPhotoUseCase } from "@/core/usecase/find-photo-use-case-impl";
import { registerContainer } from "@/di-container/register-container";
import { FIND_PHOTO_USE_CASE, LOGGER } from "@/di-container/service-id";

export const findPhotoController = async (albumId: number): Promise<void> => {
  const container = registerContainer();
  const logger = container.get<Logger>(LOGGER);
  const findPhotoUseCase = container.get<FindPhotoUseCase>(FIND_PHOTO_USE_CASE);

  logger.info({
    message: `アルバムID ${albumId} の写真データを取得します`,
  });

  try {
    const result = await findPhotoUseCase(albumId);
    logger.info({
      message: "写真データの取得に成功しました",
      data: result.photos,
    });
  } catch (error) {
    logger.error({
      message: "予期せぬエラーが発生しました",
      error,
    });
  }

  logger.info({ message: "完了" });
};
