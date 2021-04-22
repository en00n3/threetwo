import router from "../router";
import {
  walkFolder,
  extractArchive,
  unrar,
  unzip,
  extractMetadataFromImage,
  explodePath,
} from "../../utils/fs.utils";
import { Request, Response } from "express";

router.route("/getComicCovers").post(async (req: Request, res: Response) => {
  const options = {
    name: "Gyo v02 (2004) (Digital) (LostNerevarine-Empire)",
    extension: ".cbz",
    containedIn: "comics/ITOU Junji - Gyo",
    isFile: true,
    isLink: false,
  };
  const foo = await extractArchive(options);
  // const foo = await extractMetadataFromImage(
  //   "./comics/covers/Ghosts and Ruins-001.jpg",
  // );
  // const foo = await unzipOne(options);
  // const foo = await unzip("asd");
  // const foo = explodePath("Chapter Three/HELLBOY - The Chained Coffin - 069.jpg");
  res.json({
    jagan: "trupti",
    foo,
  });
});

router.route("/walkFolder").get(async (req: Request, res: Response) => {
  const basePathToWalk =
    typeof req.query.basePathToWalk === "string"
      ? req.query.basePathToWalk
      : "";
  const results = await walkFolder(basePathToWalk);
  res.json(results);
});

export default router;
