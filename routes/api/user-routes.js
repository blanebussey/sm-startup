const router = require("express").Router()
const { User } = require("../../Models")

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.json(allUsers)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("thoughts", "friends")
    res.json(user)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
    res.json(updatedUser)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const deletedInfo = await User.findByIdAndDelete(req.params.id)
    res.json(deletedInfo)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const changes = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true })
    if (!changes) {
      res.sendStatus(404)
      return
    }
    res.json(changes)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const changes = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true, runValidators: true })
    if (!changes) {
      res.sendStatus(404)
      return
    }
    res.json(changes)
  } catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router