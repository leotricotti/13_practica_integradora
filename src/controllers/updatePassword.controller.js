import { de } from "@faker-js/faker";
import { usersService } from "../repository/index.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateSessionErrorInfo } from "../services/errors/info.js";

// Ruta que actualiza la contraseña del usuario
async function updatePassword(req, res, next) {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      const result = [username, password];
      req.logger.error(
        `Error de tipo de dato: Error al actualizar la contraseña ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateSessionErrorInfo(result, EErrors.INVALID_TYPES_ERROR),
        message: "Error al actualizar la contraseña",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const user = await usersService.getOneUser(username);

    if (user.length === 0) {
      req.logger.error(
        `Error de base de datos: Usuario no encontrado ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateSessionErrorInfo(user, EErrors.DATABASE_ERROR),
        message: "Usuario no encontrado",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      const result = await usersService.updatePassword(username, password);
      req.logger.info(
        `Contraseña actualizada con éxito ${new Date().toLocaleString()}`
      );
      res.status(200).json({
        response: "Contraseña actualizada con éxito",
      });
    }
  } catch (error) {
    next(error);
  }
}

export default updatePassword;
