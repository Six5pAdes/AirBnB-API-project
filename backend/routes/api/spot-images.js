const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { SpotImage, Spot } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// 22. Delete spot image
// require authentication
// require proper authorization
router.delete("/:imageId", requireAuth, async (req, res) => {
  const { user } = req;
  let { imageId } = req.params;

  const findSpotImg = await SpotImage.findByPk(imageId);
  if (!findSpotImg)
    return res.status(404).json({ message: "Spot Image couldn't be found" });

  const findSpot = await Spot.findByPk(findSpotImg.spotId);
  if (findSpot.ownerId !== user.id)
    return res.status(403).json({
      message: "Forbidden; Spot must belong to the current user",
    });

  await findSpotImg.destroy();
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
