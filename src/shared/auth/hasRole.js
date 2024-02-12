const express = require("express");
const { ForbiddenError } = require("../errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const hasRole = (roles) => {
  return async (req, res, next) => {
    try {
      console.log(req.headers);
      const { access_token} = req.headers;
      console.log(access_token);

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = hasRole;
