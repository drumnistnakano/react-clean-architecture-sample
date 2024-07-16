import type { Logger } from "@/core/domain/support/logger";
import type { FindAlbumUseCase } from "@/core/usecase/find-album-use-case-impl";
import { registerContainer } from "@/di-container/register-container";
import { FIND_ALBUM_USE_CASE, LOGGER } from "@/di-container/service-id";

export const findAlbumController = async (): Promise<void> => {
  const container = registerContainer();
  const logger = container.get<Logger>(LOGGER);
  const findAlbumUseCase = container.get<FindAlbumUseCase>(FIND_ALBUM_USE_CASE);

  logger.info({
    message: "全てのアルバムデータを取得します",
  });

  try {
    const result = await findAlbumUseCase();
    if (result.success) {
      logger.info({
        message: "アルバムデータの取得に成功しました",
        data: result.data.albums,
      });
    }
  } catch (error) {
    logger.error({
      message: "予期せぬエラーが発生しました",
      error,
    });
  }

  logger.info({ message: "完了" });
};
