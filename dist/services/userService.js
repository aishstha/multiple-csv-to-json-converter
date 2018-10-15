'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get all users.
 *
 * @return {Promise}
 */
function getAllUsers() {
  return _user2.default.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
function getUser(id) {
  return new _user2.default({ id: id }).fetch().then(function (user) {
    if (!user) {
      throw _boom2.default.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
function createUser(user) {
  return new _user2.default({ name: user.name }).save();
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
function updateUser(id, user) {
  return new _user2.default({ id: id }).save({ name: user.name });
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
function deleteUser(id) {
  return new _user2.default({ id: id }).fetch().then(function (user) {
    return user.destroy();
  });
}