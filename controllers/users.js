const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
module.exports.updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: "Переданы некорректные данные" });
  }

  User.findByIdAndUpdate(
    userId,
    { name: name, about: about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ message: "Переданы некорректные данные" });
  }

  User.findByIdAndUpdate(
    userId,
    { avatar: avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};
