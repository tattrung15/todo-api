const { Op } = require('sequelize');
const BaseClass = require('./base.class');
const { PAGING_DEFAULT_LIMIT } = require('../utils/constants/common.const');
const { escapeRegExp } = require('../utils/helpers/string.helper');

class BaseRepository extends BaseClass {
  constructor(model) {
    super();
    this.model = model;
  }

  /**
   * Find list record
   * @param {object} options
   * @returns {Promise<Array<`Model`>>}
   */
  async getList(options = {}) {
    return await this.model.findAll(options);
  }

  /**
   * Find one record by options object
   * @param {object} options
   * @returns {Promise<`Model`|null>}
   */
  async get(options = {}) {
    return await this.model.findOne(options);
  }

  /**
   * Find one record by the id field
   * @param {number|string} id
   * @param {object} trx
   * @return {Promise<`Model`|null>}
   */
  async findById(id, trx = null) {
    const result = await this.model.findOne({
      where: { id },
      transaction: trx
    });
    return result;
  }

  /**
   * Find records by the id field
   * @param {number[]|string[]} ids
   * @param {object} trx
   * @return {Promise<Array<`Model`>>}
   */
  async findByIds(ids, trx = null) {
    return await this.model.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      },
      transaction: trx
    });
  }

  /**
   * Find or create a new record
   * @param {object} options
   * @returns {Promise<[`Model`, boolean]>}
   */
  async findOrCreate(options) {
    return this.model.findOrCreate(options);
  }

  /**
   * Update or create a new record
   * @param {object} values
   * @param {object} options
   * @returns {Promise<Array<`Model`, boolean|null>>}
   */
  async updateOrCreate(values = {}, options = {}) {
    return this.model.upsert(values, options);
  }

  /**
   * Update the record by the id field
   * @param {number|string} id
   * @param {object} data
   * @param {object} trx
   * @return {Promise<Array<number, number>>}
   */
  async updateById(id, data, trx = null) {
    const instance = await this.findById(id);
    const updated = await instance.update({ ...data }, { transaction: trx });

    return updated;
  }

  /**
   * Delete a record by id
   * @param {number|string} id
   * @param {object} trx
   * @return {Promise<number>} The number of destroyed rows
   */
  async deleteById(id, trx = null) {
    const count = await this.model.destroy({ where: { id }, transaction: trx });
    return count;
  }

  /**
   * Return data with its pagination info
   * @param {number} page Page number, start from 1
   * @param {number} limit
   * @param {object} options Additional query options
   * @return {object} An object like { data, pagination }
   */
  async paginate(page, limit, options = null) {
    let validPage = parseInt(page, 10) || 0;
    let validLimit = parseInt(limit, 10) || 0;
    validPage = validPage > 0 ? validPage : 1;
    validLimit = validLimit > 0 ? validLimit : PAGING_DEFAULT_LIMIT;

    const result = await this.model.findAndCountAll({
      distinct: true,
      ...options,
      offset: (validPage - 1) * validLimit,
      limit: validLimit
    });

    let { count: total, rows: data } = result;
    if (Array.isArray(total)) {
      total = total.length;
    }
    validLimit = validLimit < total ? validLimit : total;
    const lastPage = Math.ceil(total / validLimit);
    const pagination = {
      page: validPage,
      perPage: validLimit,
      total,
      lastPage
    };

    return { data, pagination };
  }

  /**
   *
   * @param {{ like: { [key: string]: any }, equal: { [key: string]: any },
   *            sort: { [key: string]: any } }} data
   * @returns {{ [key: string]: any }}
   */
  getBasicQueryOptions(data) {
    const condition = {};
    const order = [];
    for (const key in data.like) {
      const value = escapeRegExp(data.like[key]);
      condition[key] = {
        [Op.iLike]: `%${value}%`
      };
    }
    for (const key in data.equal) {
      const value = escapeRegExp(data.equal[key]);
      condition[key] = value;
    }
    for (const key in data.sort) {
      order.push([key, data.sort[key]]);
    }
    if (!order.length) {
      order.push(['createdAt', 'desc']);
    }

    const options = {
      where: condition,
      order
    };

    return options;
  }
}

module.exports = BaseRepository;
