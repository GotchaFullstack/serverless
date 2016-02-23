'use strict';

const SError            = require('./Error'),
  SUtils                = require('./utils/index'),
  SerializerFileSystem  = require('./SerializerFileSystem'),
  fs                    = require('fs'),
  _                     = require('lodash'),
  BbPromise             = require('bluebird');

class Templates extends SerializerFileSystem {

  constructor(S, config) {

    super(S);

    this._S       = S;
    this._class   = 'Templates';
    this._config  = config;
    this._parents = [];
  }

  load() {
    return this.deserialize(this);
  }

  save() {
    return this.serialize(this);
  }

  /**
   * Set Parents
   * - Parent templates which this template extends
   * - Must be an array of parents sorted left to right from prj root
   */

  setParents(parents) {
    this._parents = parents;
  }

  /**
   * To Object
   * - Aggregates templates w/ any parents and exports clone
   */

  toObject() {
    let clone = SUtils.exportObject(_.cloneDeep(this));
    let parentsClone = _.cloneDeep(this._parents);
    parentsClone.push(clone);
    return _.merge.apply(_, parentsClone);
  }
}

module.exports = Templates;