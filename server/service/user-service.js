import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mailService from "./mail-service.js";
import * as tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

export const registration = async (email, password, name, surname, phone) => {
  const candidate = await userModel.findOne({ email: email });
  if (candidate) {
    throw ApiError.BadRequest(
      `Пользователь c почтовым адресом ${email} уже существует`
    );
  }
  const hashPassword = await bcrypt.hash(password, 3);
  const activationLink = uuidv4();
  const user = await userModel.create({
    email: email,
    password: hashPassword,
    activationLink: activationLink,
    name: name,
    surname: surname,
    phone: phone,
  });

  await mailService.sendActivationMail(
    email,
    `${process.env.API_URL}/api/activate/${activationLink}`
  );
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

export const activate = async (activationLink) => {
  const user = await userModel.findOne({ activationLink: activationLink });
  if (!user) {
    throw ApiError.BadRequest("Некорректная ссылка активации");
  }
  user.isActivated = true;
  await user.save();
};

export const login = async (email, password) => {
  const user = await userModel.findOne({ email: email });
  if (!user) {
    throw ApiError.BadRequest("Пользовательн с таким email не найден");
  }
  const isPassEquals = await bcrypt.compare(password, user.password);

  if (!isPassEquals) {
    throw ApiError.BadRequest("Неверный пароль");
  }

  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

export const logout = async (refreshToken) => {
  const token = await tokenService.removeToken(refreshToken);
  return token;
};

export const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }

  const userData = tokenService.validateRefreshToken(refreshToken);
  const tokenFromDb = tokenService.findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }
  const user = await userModel.findById(userData.id);
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({ ...userDto });
  await tokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

export const getAllUsers = async () => {
  const users = await userModel.find();
  return users;
};

export const editUser = async (userId, name, surname, phone, email) => {
  const user = await userModel.findOneAndUpdate(
    { _id: userId },
    { name: name, surname: surname, phone: phone, email: email },
    { returnDocument: "after" }
  );
  const userDto = new UserDto(user);
  console.log(user);
  if (!user) {
    throw ApiError.ErrorResponse(500, "Пользователь не найдена");
  }
  return { user: userDto };
};

export const editUserFavourites = async (userId, favourites) => {
  const user = await userModel.findOneAndUpdate(
    { _id: userId },
    { favourites: favourites },
    { returnDocument: "after" }
  );
  const userDto = new UserDto(user);
  console.log(user);
  if (!user) {
    throw ApiError.ErrorResponse(500, "Пользователь не найдена");
  }
  return { user: userDto };
};
