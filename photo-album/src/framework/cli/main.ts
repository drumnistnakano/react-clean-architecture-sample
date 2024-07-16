import { confirm, number, select } from "@inquirer/prompts";
import { config } from "dotenv";
import { findAlbumController } from "./controller/find-album-controller";
import { findPhotoController } from "./controller/find-photo-controller";

const controllersChoices = [
  { name: "すべてのアルバムを取得する", value: "すべてのアルバムを取得する" },
  { name: "アルバムIDで写真を取得する", value: "アルバムIDで写真を取得する" },
] as const;

export const main = async (): Promise<void> => {
  const message = "CLIで実行するタスクを選択してください";
  const controllerAnswers = await select({
    message,
    choices: controllersChoices,
  });
  const controller = controllerAnswers;

  const isConfirmed = await confirm({
    message: `実行しますか？controller=${controller}`,
  });

  if (isConfirmed === false) {
    return;
  }

  switch (controller) {
    case "すべてのアルバムを取得する": {
      await findAlbumController();
      break;
    }
    case "アルバムIDで写真を取得する": {
      const albumId = await number({
        message: "アルバムIDを入力してください",
        required: true,
        min: 1,
        max: 100, // @see https://jsonplaceholder.typicode.com/
      });
      if (albumId == null) {
        console.error("有効なアルバムIDを入力してください");
        break;
      }

      await findPhotoController(albumId);
      break;
    }
    default: {
      throw new Error(`Invalid controller. controller=${controller}`);
    }
  }
};

config({ path: ".env.cli" });
main();
