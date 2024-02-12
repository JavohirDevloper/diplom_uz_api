const express = require("express");
const { UnauthorizedError } = require("../errors");
const config = require("../config");
const jwt = require("jsonwebtoken");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const isLoggedIn = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const {access_token} = req.headers;
    // console.log(access_token);
        let token =  jwt.verify(access_token, config.jwt.secret,)
        // console.log(token);

    if (!token) {
      throw new UnauthorizedError("Unauthorized.");
    }

    if(token.role === "admin" || token.role === "super_admin") {  
      return next()
    }
    
    console.log(decoded);

    req.user = decoded.user;

    next();
  } catch (error) {
    if(error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({error: 'invalide token'})
    }
    res.status(400).json({ data: "serverda xatolik." })
  }
};

module.exports = isLoggedIn;
