import router from "../router";
import { Request, Response } from "express";
import axios from "axios";

router.route("/getComicCovers").post(async (req: Request, res: Response) => {
  typeof req.body === "object" ? req.body : {};
  await axios.request({
    url: "http://localhost:3000/api/import/importComicsToDB",
    method: "POST",
    data: {
      extractionOptions: req.body.extractionOptions,
      walkedFolders: req.body.walkedFolders,
    },
  });
  res.send({ po: "jo" });
});

export default router;
