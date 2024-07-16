import { confirm, select } from "@inquirer/prompts";
import { config } from "dotenv";
import { findAlbumController } from "./controller/find-album-controller";

const controllersChoices = [
  { name: "すべてのアルバムを取得する", value: "すべてのアルバムを取得する" },
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

    default: {
      throw new Error(`Invalid controller. controller=${controller}`);
    }
  }
};

config({ path: ".env.cli" });
main();
