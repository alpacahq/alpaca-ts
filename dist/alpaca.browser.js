/*! 
 * alpaca@5.0.4
 * released under the permissive ISC license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.alpaca = {}));
}(this, (function (exports) { 'use strict';

  var load = function (received, defaults, onto = {}) {
    var k, ref, v;

    for (k in defaults) {
      v = defaults[k];
      onto[k] = (ref = received[k]) != null ? ref : v;
    }

    return onto;
  };

  var overwrite = function (received, defaults, onto = {}) {
    var k, v;

    for (k in received) {
      v = received[k];

      if (defaults[k] !== void 0) {
        onto[k] = v;
      }
    }

    return onto;
  };

  var parser = {
  	load: load,
  	overwrite: overwrite
  };

  var DLList;
  DLList = class DLList {
    constructor(incr, decr) {
      this.incr = incr;
      this.decr = decr;
      this._first = null;
      this._last = null;
      this.length = 0;
    }

    push(value) {
      var node;
      this.length++;

      if (typeof this.incr === "function") {
        this.incr();
      }

      node = {
        value,
        prev: this._last,
        next: null
      };

      if (this._last != null) {
        this._last.next = node;
        this._last = node;
      } else {
        this._first = this._last = node;
      }

      return void 0;
    }

    shift() {
      var value;

      if (this._first == null) {
        return;
      } else {
        this.length--;

        if (typeof this.decr === "function") {
          this.decr();
        }
      }

      value = this._first.value;

      if ((this._first = this._first.next) != null) {
        this._first.prev = null;
      } else {
        this._last = null;
      }

      return value;
    }

    first() {
      if (this._first != null) {
        return this._first.value;
      }
    }

    getArray() {
      var node, ref, results;
      node = this._first;
      results = [];

      while (node != null) {
        results.push((ref = node, node = node.next, ref.value));
      }

      return results;
    }

    forEachShift(cb) {
      var node;
      node = this.shift();

      while (node != null) {
        cb(node), node = this.shift();
      }

      return void 0;
    }

    debug() {
      var node, ref, ref1, ref2, results;
      node = this._first;
      results = [];

      while (node != null) {
        results.push((ref = node, node = node.next, {
          value: ref.value,
          prev: (ref1 = ref.prev) != null ? ref1.value : void 0,
          next: (ref2 = ref.next) != null ? ref2.value : void 0
        }));
      }

      return results;
    }

  };
  var DLList_1 = DLList;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Events;
  Events = class Events {
    constructor(instance) {
      this.instance = instance;
      this._events = {};

      if (this.instance.on != null || this.instance.once != null || this.instance.removeAllListeners != null) {
        throw new Error("An Emitter already exists for this object");
      }

      this.instance.on = (name, cb) => {
        return this._addListener(name, "many", cb);
      };

      this.instance.once = (name, cb) => {
        return this._addListener(name, "once", cb);
      };

      this.instance.removeAllListeners = (name = null) => {
        if (name != null) {
          return delete this._events[name];
        } else {
          return this._events = {};
        }
      };
    }

    _addListener(name, status, cb) {
      var base;

      if ((base = this._events)[name] == null) {
        base[name] = [];
      }

      this._events[name].push({
        cb,
        status
      });

      return this.instance;
    }

    listenerCount(name) {
      if (this._events[name] != null) {
        return this._events[name].length;
      } else {
        return 0;
      }
    }

    trigger(name, ...args) {
      var _this = this;

      return _asyncToGenerator(function* () {
        var e, promises;

        try {
          if (name !== "debug") {
            _this.trigger("debug", `Event triggered: ${name}`, args);
          }

          if (_this._events[name] == null) {
            return;
          }

          _this._events[name] = _this._events[name].filter(function (listener) {
            return listener.status !== "none";
          });
          promises = _this._events[name].map(
          /*#__PURE__*/
          function () {
            var _ref = _asyncToGenerator(function* (listener) {
              var e, returned;

              if (listener.status === "none") {
                return;
              }

              if (listener.status === "once") {
                listener.status = "none";
              }

              try {
                returned = typeof listener.cb === "function" ? listener.cb(...args) : void 0;

                if (typeof (returned != null ? returned.then : void 0) === "function") {
                  return yield returned;
                } else {
                  return returned;
                }
              } catch (error) {
                e = error;

                if ("name" !== "error") {
                  _this.trigger("error", e);
                }

                return null;
              }
            });

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
          return (yield Promise.all(promises)).find(function (x) {
            return x != null;
          });
        } catch (error) {
          e = error;

          {
            _this.trigger("error", e);
          }

          return null;
        }
      })();
    }

  };
  var Events_1 = Events;

  var DLList$1, Events$1, Queues;
  DLList$1 = DLList_1;
  Events$1 = Events_1;
  Queues = class Queues {
    constructor(num_priorities) {
      this.Events = new Events$1(this);
      this._length = 0;

      this._lists = function () {
        var j, ref, results;
        results = [];

        for (j = 1, ref = num_priorities; 1 <= ref ? j <= ref : j >= ref; 1 <= ref ? ++j : --j) {
          results.push(new DLList$1(() => {
            return this.incr();
          }, () => {
            return this.decr();
          }));
        }

        return results;
      }.call(this);
    }

    incr() {
      if (this._length++ === 0) {
        return this.Events.trigger("leftzero");
      }
    }

    decr() {
      if (--this._length === 0) {
        return this.Events.trigger("zero");
      }
    }

    push(job) {
      return this._lists[job.options.priority].push(job);
    }

    queued(priority) {
      if (priority != null) {
        return this._lists[priority].length;
      } else {
        return this._length;
      }
    }

    shiftAll(fn) {
      return this._lists.forEach(function (list) {
        return list.forEachShift(fn);
      });
    }

    getFirst(arr = this._lists) {
      var j, len, list;

      for (j = 0, len = arr.length; j < len; j++) {
        list = arr[j];

        if (list.length > 0) {
          return list;
        }
      }

      return [];
    }

    shiftLastFrom(priority) {
      return this.getFirst(this._lists.slice(priority).reverse()).shift();
    }

  };
  var Queues_1 = Queues;

  var BottleneckError;
  BottleneckError = class BottleneckError extends Error {};
  var BottleneckError_1 = BottleneckError;

  function asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$1(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$1(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var BottleneckError$1, DEFAULT_PRIORITY, Job, NUM_PRIORITIES, parser$1;
  NUM_PRIORITIES = 10;
  DEFAULT_PRIORITY = 5;
  parser$1 = parser;
  BottleneckError$1 = BottleneckError_1;
  Job = class Job {
    constructor(task, args, options, jobDefaults, rejectOnDrop, Events, _states, Promise) {
      this.task = task;
      this.args = args;
      this.rejectOnDrop = rejectOnDrop;
      this.Events = Events;
      this._states = _states;
      this.Promise = Promise;
      this.options = parser$1.load(options, jobDefaults);
      this.options.priority = this._sanitizePriority(this.options.priority);

      if (this.options.id === jobDefaults.id) {
        this.options.id = `${this.options.id}-${this._randomIndex()}`;
      }

      this.promise = new this.Promise((_resolve, _reject) => {
        this._resolve = _resolve;
        this._reject = _reject;
      });
      this.retryCount = 0;
    }

    _sanitizePriority(priority) {
      var sProperty;
      sProperty = ~~priority !== priority ? DEFAULT_PRIORITY : priority;

      if (sProperty < 0) {
        return 0;
      } else if (sProperty > NUM_PRIORITIES - 1) {
        return NUM_PRIORITIES - 1;
      } else {
        return sProperty;
      }
    }

    _randomIndex() {
      return Math.random().toString(36).slice(2);
    }

    doDrop({
      error,
      message = "This job has been dropped by Bottleneck"
    } = {}) {
      if (this._states.remove(this.options.id)) {
        if (this.rejectOnDrop) {
          this._reject(error != null ? error : new BottleneckError$1(message));
        }

        this.Events.trigger("dropped", {
          args: this.args,
          options: this.options,
          task: this.task,
          promise: this.promise
        });
        return true;
      } else {
        return false;
      }
    }

    _assertStatus(expected) {
      var status;
      status = this._states.jobStatus(this.options.id);

      if (!(status === expected || expected === "DONE" && status === null)) {
        throw new BottleneckError$1(`Invalid job status ${status}, expected ${expected}. Please open an issue at https://github.com/SGrondin/bottleneck/issues`);
      }
    }

    doReceive() {
      this._states.start(this.options.id);

      return this.Events.trigger("received", {
        args: this.args,
        options: this.options
      });
    }

    doQueue(reachedHWM, blocked) {
      this._assertStatus("RECEIVED");

      this._states.next(this.options.id);

      return this.Events.trigger("queued", {
        args: this.args,
        options: this.options,
        reachedHWM,
        blocked
      });
    }

    doRun() {
      if (this.retryCount === 0) {
        this._assertStatus("QUEUED");

        this._states.next(this.options.id);
      } else {
        this._assertStatus("EXECUTING");
      }

      return this.Events.trigger("scheduled", {
        args: this.args,
        options: this.options
      });
    }

    doExecute(chained, clearGlobalState, run, free) {
      var _this = this;

      return _asyncToGenerator$1(function* () {
        var error, eventInfo, passed;

        if (_this.retryCount === 0) {
          _this._assertStatus("RUNNING");

          _this._states.next(_this.options.id);
        } else {
          _this._assertStatus("EXECUTING");
        }

        eventInfo = {
          args: _this.args,
          options: _this.options,
          retryCount: _this.retryCount
        };

        _this.Events.trigger("executing", eventInfo);

        try {
          passed = yield chained != null ? chained.schedule(_this.options, _this.task, ..._this.args) : _this.task(..._this.args);

          if (clearGlobalState()) {
            _this.doDone(eventInfo);

            yield free(_this.options, eventInfo);

            _this._assertStatus("DONE");

            return _this._resolve(passed);
          }
        } catch (error1) {
          error = error1;
          return _this._onFailure(error, eventInfo, clearGlobalState, run, free);
        }
      })();
    }

    doExpire(clearGlobalState, run, free) {
      var error, eventInfo;

      if (this._states.jobStatus(this.options.id === "RUNNING")) {
        this._states.next(this.options.id);
      }

      this._assertStatus("EXECUTING");

      eventInfo = {
        args: this.args,
        options: this.options,
        retryCount: this.retryCount
      };
      error = new BottleneckError$1(`This job timed out after ${this.options.expiration} ms.`);
      return this._onFailure(error, eventInfo, clearGlobalState, run, free);
    }

    _onFailure(error, eventInfo, clearGlobalState, run, free) {
      var _this2 = this;

      return _asyncToGenerator$1(function* () {
        var retry, retryAfter;

        if (clearGlobalState()) {
          retry = yield _this2.Events.trigger("failed", error, eventInfo);

          if (retry != null) {
            retryAfter = ~~retry;

            _this2.Events.trigger("retry", `Retrying ${_this2.options.id} after ${retryAfter} ms`, eventInfo);

            _this2.retryCount++;
            return run(retryAfter);
          } else {
            _this2.doDone(eventInfo);

            yield free(_this2.options, eventInfo);

            _this2._assertStatus("DONE");

            return _this2._reject(error);
          }
        }
      })();
    }

    doDone(eventInfo) {
      this._assertStatus("EXECUTING");

      this._states.next(this.options.id);

      return this.Events.trigger("done", eventInfo);
    }

  };
  var Job_1 = Job;

  function asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$2(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$2(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var BottleneckError$2, LocalDatastore, parser$2;
  parser$2 = parser;
  BottleneckError$2 = BottleneckError_1;
  LocalDatastore = class LocalDatastore {
    constructor(instance, storeOptions, storeInstanceOptions) {
      this.instance = instance;
      this.storeOptions = storeOptions;
      this.clientId = this.instance._randomIndex();
      parser$2.load(storeInstanceOptions, storeInstanceOptions, this);
      this._nextRequest = this._lastReservoirRefresh = this._lastReservoirIncrease = Date.now();
      this._running = 0;
      this._done = 0;
      this._unblockTime = 0;
      this.ready = this.Promise.resolve();
      this.clients = {};

      this._startHeartbeat();
    }

    _startHeartbeat() {
      var base;

      if (this.heartbeat == null && (this.storeOptions.reservoirRefreshInterval != null && this.storeOptions.reservoirRefreshAmount != null || this.storeOptions.reservoirIncreaseInterval != null && this.storeOptions.reservoirIncreaseAmount != null)) {
        return typeof (base = this.heartbeat = setInterval(() => {
          var amount, incr, maximum, now, reservoir;
          now = Date.now();

          if (this.storeOptions.reservoirRefreshInterval != null && now >= this._lastReservoirRefresh + this.storeOptions.reservoirRefreshInterval) {
            this._lastReservoirRefresh = now;
            this.storeOptions.reservoir = this.storeOptions.reservoirRefreshAmount;

            this.instance._drainAll(this.computeCapacity());
          }

          if (this.storeOptions.reservoirIncreaseInterval != null && now >= this._lastReservoirIncrease + this.storeOptions.reservoirIncreaseInterval) {
            var _this$storeOptions = this.storeOptions;
            amount = _this$storeOptions.reservoirIncreaseAmount;
            maximum = _this$storeOptions.reservoirIncreaseMaximum;
            reservoir = _this$storeOptions.reservoir;
            this._lastReservoirIncrease = now;
            incr = maximum != null ? Math.min(amount, maximum - reservoir) : amount;

            if (incr > 0) {
              this.storeOptions.reservoir += incr;
              return this.instance._drainAll(this.computeCapacity());
            }
          }
        }, this.heartbeatInterval)).unref === "function" ? base.unref() : void 0;
      } else {
        return clearInterval(this.heartbeat);
      }
    }

    __publish__(message) {
      var _this = this;

      return _asyncToGenerator$2(function* () {
        yield _this.yieldLoop();
        return _this.instance.Events.trigger("message", message.toString());
      })();
    }

    __disconnect__(flush) {
      var _this2 = this;

      return _asyncToGenerator$2(function* () {
        yield _this2.yieldLoop();
        clearInterval(_this2.heartbeat);
        return _this2.Promise.resolve();
      })();
    }

    yieldLoop(t = 0) {
      return new this.Promise(function (resolve, reject) {
        return setTimeout(resolve, t);
      });
    }

    computePenalty() {
      var ref;
      return (ref = this.storeOptions.penalty) != null ? ref : 15 * this.storeOptions.minTime || 5000;
    }

    __updateSettings__(options) {
      var _this3 = this;

      return _asyncToGenerator$2(function* () {
        yield _this3.yieldLoop();
        parser$2.overwrite(options, options, _this3.storeOptions);

        _this3._startHeartbeat();

        _this3.instance._drainAll(_this3.computeCapacity());

        return true;
      })();
    }

    __running__() {
      var _this4 = this;

      return _asyncToGenerator$2(function* () {
        yield _this4.yieldLoop();
        return _this4._running;
      })();
    }

    __queued__() {
      var _this5 = this;

      return _asyncToGenerator$2(function* () {
        yield _this5.yieldLoop();
        return _this5.instance.queued();
      })();
    }

    __done__() {
      var _this6 = this;

      return _asyncToGenerator$2(function* () {
        yield _this6.yieldLoop();
        return _this6._done;
      })();
    }

    __groupCheck__(time) {
      var _this7 = this;

      return _asyncToGenerator$2(function* () {
        yield _this7.yieldLoop();
        return _this7._nextRequest + _this7.timeout < time;
      })();
    }

    computeCapacity() {
      var maxConcurrent, reservoir;
      var _this$storeOptions2 = this.storeOptions;
      maxConcurrent = _this$storeOptions2.maxConcurrent;
      reservoir = _this$storeOptions2.reservoir;

      if (maxConcurrent != null && reservoir != null) {
        return Math.min(maxConcurrent - this._running, reservoir);
      } else if (maxConcurrent != null) {
        return maxConcurrent - this._running;
      } else if (reservoir != null) {
        return reservoir;
      } else {
        return null;
      }
    }

    conditionsCheck(weight) {
      var capacity;
      capacity = this.computeCapacity();
      return capacity == null || weight <= capacity;
    }

    __incrementReservoir__(incr) {
      var _this8 = this;

      return _asyncToGenerator$2(function* () {
        var reservoir;
        yield _this8.yieldLoop();
        reservoir = _this8.storeOptions.reservoir += incr;

        _this8.instance._drainAll(_this8.computeCapacity());

        return reservoir;
      })();
    }

    __currentReservoir__() {
      var _this9 = this;

      return _asyncToGenerator$2(function* () {
        yield _this9.yieldLoop();
        return _this9.storeOptions.reservoir;
      })();
    }

    isBlocked(now) {
      return this._unblockTime >= now;
    }

    check(weight, now) {
      return this.conditionsCheck(weight) && this._nextRequest - now <= 0;
    }

    __check__(weight) {
      var _this10 = this;

      return _asyncToGenerator$2(function* () {
        var now;
        yield _this10.yieldLoop();
        now = Date.now();
        return _this10.check(weight, now);
      })();
    }

    __register__(index, weight, expiration) {
      var _this11 = this;

      return _asyncToGenerator$2(function* () {
        var now, wait;
        yield _this11.yieldLoop();
        now = Date.now();

        if (_this11.conditionsCheck(weight)) {
          _this11._running += weight;

          if (_this11.storeOptions.reservoir != null) {
            _this11.storeOptions.reservoir -= weight;
          }

          wait = Math.max(_this11._nextRequest - now, 0);
          _this11._nextRequest = now + wait + _this11.storeOptions.minTime;
          return {
            success: true,
            wait,
            reservoir: _this11.storeOptions.reservoir
          };
        } else {
          return {
            success: false
          };
        }
      })();
    }

    strategyIsBlock() {
      return this.storeOptions.strategy === 3;
    }

    __submit__(queueLength, weight) {
      var _this12 = this;

      return _asyncToGenerator$2(function* () {
        var blocked, now, reachedHWM;
        yield _this12.yieldLoop();

        if (_this12.storeOptions.maxConcurrent != null && weight > _this12.storeOptions.maxConcurrent) {
          throw new BottleneckError$2(`Impossible to add a job having a weight of ${weight} to a limiter having a maxConcurrent setting of ${_this12.storeOptions.maxConcurrent}`);
        }

        now = Date.now();
        reachedHWM = _this12.storeOptions.highWater != null && queueLength === _this12.storeOptions.highWater && !_this12.check(weight, now);
        blocked = _this12.strategyIsBlock() && (reachedHWM || _this12.isBlocked(now));

        if (blocked) {
          _this12._unblockTime = now + _this12.computePenalty();
          _this12._nextRequest = _this12._unblockTime + _this12.storeOptions.minTime;

          _this12.instance._dropAllQueued();
        }

        return {
          reachedHWM,
          blocked,
          strategy: _this12.storeOptions.strategy
        };
      })();
    }

    __free__(index, weight) {
      var _this13 = this;

      return _asyncToGenerator$2(function* () {
        yield _this13.yieldLoop();
        _this13._running -= weight;
        _this13._done += weight;

        _this13.instance._drainAll(_this13.computeCapacity());

        return {
          running: _this13._running
        };
      })();
    }

  };
  var LocalDatastore_1 = LocalDatastore;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getAugmentedNamespace(n) {
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
  	Object.keys(n).forEach(function (k) {
  		var d = Object.getOwnPropertyDescriptor(n, k);
  		Object.defineProperty(a, k, d.get ? d : {
  			enumerable: true,
  			get: function () {
  				return n[k];
  			}
  		});
  	});
  	return a;
  }

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var require$$0 = {
  	"blacklist_client.lua": "local blacklist = ARGV[num_static_argv + 1]\n\nif redis.call('zscore', client_last_seen_key, blacklist) then\n  redis.call('zadd', client_last_seen_key, 0, blacklist)\nend\n\n\nreturn {}\n",
  	"check.lua": "local weight = tonumber(ARGV[num_static_argv + 1])\n\nlocal capacity = process_tick(now, false)['capacity']\nlocal nextRequest = tonumber(redis.call('hget', settings_key, 'nextRequest'))\n\nreturn conditions_check(capacity, weight) and nextRequest - now <= 0\n",
  	"conditions_check.lua": "local conditions_check = function (capacity, weight)\n  return capacity == nil or weight <= capacity\nend\n",
  	"current_reservoir.lua": "return process_tick(now, false)['reservoir']\n",
  	"done.lua": "process_tick(now, false)\n\nreturn tonumber(redis.call('hget', settings_key, 'done'))\n",
  	"free.lua": "local index = ARGV[num_static_argv + 1]\n\nredis.call('zadd', job_expirations_key, 0, index)\n\nreturn process_tick(now, false)['running']\n",
  	"get_time.lua": "redis.replicate_commands()\n\nlocal get_time = function ()\n  local time = redis.call('time')\n\n  return tonumber(time[1]..string.sub(time[2], 1, 3))\nend\n",
  	"group_check.lua": "return not (redis.call('exists', settings_key) == 1)\n",
  	"heartbeat.lua": "process_tick(now, true)\n",
  	"increment_reservoir.lua": "local incr = tonumber(ARGV[num_static_argv + 1])\n\nredis.call('hincrby', settings_key, 'reservoir', incr)\n\nlocal reservoir = process_tick(now, true)['reservoir']\n\nlocal groupTimeout = tonumber(redis.call('hget', settings_key, 'groupTimeout'))\nrefresh_expiration(0, 0, groupTimeout)\n\nreturn reservoir\n",
  	"init.lua": "local clear = tonumber(ARGV[num_static_argv + 1])\nlocal limiter_version = ARGV[num_static_argv + 2]\nlocal num_local_argv = num_static_argv + 2\n\nif clear == 1 then\n  redis.call('del', unpack(KEYS))\nend\n\nif redis.call('exists', settings_key) == 0 then\n  -- Create\n  local args = {'hmset', settings_key}\n\n  for i = num_local_argv + 1, #ARGV do\n    table.insert(args, ARGV[i])\n  end\n\n  redis.call(unpack(args))\n  redis.call('hmset', settings_key,\n    'nextRequest', now,\n    'lastReservoirRefresh', now,\n    'lastReservoirIncrease', now,\n    'running', 0,\n    'done', 0,\n    'unblockTime', 0,\n    'capacityPriorityCounter', 0\n  )\n\nelse\n  -- Apply migrations\n  local settings = redis.call('hmget', settings_key,\n    'id',\n    'version'\n  )\n  local id = settings[1]\n  local current_version = settings[2]\n\n  if current_version ~= limiter_version then\n    local version_digits = {}\n    for k, v in string.gmatch(current_version, \"([^.]+)\") do\n      table.insert(version_digits, tonumber(k))\n    end\n\n    -- 2.10.0\n    if version_digits[2] < 10 then\n      redis.call('hsetnx', settings_key, 'reservoirRefreshInterval', '')\n      redis.call('hsetnx', settings_key, 'reservoirRefreshAmount', '')\n      redis.call('hsetnx', settings_key, 'lastReservoirRefresh', '')\n      redis.call('hsetnx', settings_key, 'done', 0)\n      redis.call('hset', settings_key, 'version', '2.10.0')\n    end\n\n    -- 2.11.1\n    if version_digits[2] < 11 or (version_digits[2] == 11 and version_digits[3] < 1) then\n      if redis.call('hstrlen', settings_key, 'lastReservoirRefresh') == 0 then\n        redis.call('hmset', settings_key,\n          'lastReservoirRefresh', now,\n          'version', '2.11.1'\n        )\n      end\n    end\n\n    -- 2.14.0\n    if version_digits[2] < 14 then\n      local old_running_key = 'b_'..id..'_running'\n      local old_executing_key = 'b_'..id..'_executing'\n\n      if redis.call('exists', old_running_key) == 1 then\n        redis.call('rename', old_running_key, job_weights_key)\n      end\n      if redis.call('exists', old_executing_key) == 1 then\n        redis.call('rename', old_executing_key, job_expirations_key)\n      end\n      redis.call('hset', settings_key, 'version', '2.14.0')\n    end\n\n    -- 2.15.2\n    if version_digits[2] < 15 or (version_digits[2] == 15 and version_digits[3] < 2) then\n      redis.call('hsetnx', settings_key, 'capacityPriorityCounter', 0)\n      redis.call('hset', settings_key, 'version', '2.15.2')\n    end\n\n    -- 2.17.0\n    if version_digits[2] < 17 then\n      redis.call('hsetnx', settings_key, 'clientTimeout', 10000)\n      redis.call('hset', settings_key, 'version', '2.17.0')\n    end\n\n    -- 2.18.0\n    if version_digits[2] < 18 then\n      redis.call('hsetnx', settings_key, 'reservoirIncreaseInterval', '')\n      redis.call('hsetnx', settings_key, 'reservoirIncreaseAmount', '')\n      redis.call('hsetnx', settings_key, 'reservoirIncreaseMaximum', '')\n      redis.call('hsetnx', settings_key, 'lastReservoirIncrease', now)\n      redis.call('hset', settings_key, 'version', '2.18.0')\n    end\n\n  end\n\n  process_tick(now, false)\nend\n\nlocal groupTimeout = tonumber(redis.call('hget', settings_key, 'groupTimeout'))\nrefresh_expiration(0, 0, groupTimeout)\n\nreturn {}\n",
  	"process_tick.lua": "local process_tick = function (now, always_publish)\n\n  local compute_capacity = function (maxConcurrent, running, reservoir)\n    if maxConcurrent ~= nil and reservoir ~= nil then\n      return math.min((maxConcurrent - running), reservoir)\n    elseif maxConcurrent ~= nil then\n      return maxConcurrent - running\n    elseif reservoir ~= nil then\n      return reservoir\n    else\n      return nil\n    end\n  end\n\n  local settings = redis.call('hmget', settings_key,\n    'id',\n    'maxConcurrent',\n    'running',\n    'reservoir',\n    'reservoirRefreshInterval',\n    'reservoirRefreshAmount',\n    'lastReservoirRefresh',\n    'reservoirIncreaseInterval',\n    'reservoirIncreaseAmount',\n    'reservoirIncreaseMaximum',\n    'lastReservoirIncrease',\n    'capacityPriorityCounter',\n    'clientTimeout'\n  )\n  local id = settings[1]\n  local maxConcurrent = tonumber(settings[2])\n  local running = tonumber(settings[3])\n  local reservoir = tonumber(settings[4])\n  local reservoirRefreshInterval = tonumber(settings[5])\n  local reservoirRefreshAmount = tonumber(settings[6])\n  local lastReservoirRefresh = tonumber(settings[7])\n  local reservoirIncreaseInterval = tonumber(settings[8])\n  local reservoirIncreaseAmount = tonumber(settings[9])\n  local reservoirIncreaseMaximum = tonumber(settings[10])\n  local lastReservoirIncrease = tonumber(settings[11])\n  local capacityPriorityCounter = tonumber(settings[12])\n  local clientTimeout = tonumber(settings[13])\n\n  local initial_capacity = compute_capacity(maxConcurrent, running, reservoir)\n\n  --\n  -- Process 'running' changes\n  --\n  local expired = redis.call('zrangebyscore', job_expirations_key, '-inf', '('..now)\n\n  if #expired > 0 then\n    redis.call('zremrangebyscore', job_expirations_key, '-inf', '('..now)\n\n    local flush_batch = function (batch, acc)\n      local weights = redis.call('hmget', job_weights_key, unpack(batch))\n                      redis.call('hdel',  job_weights_key, unpack(batch))\n      local clients = redis.call('hmget', job_clients_key, unpack(batch))\n                      redis.call('hdel',  job_clients_key, unpack(batch))\n\n      -- Calculate sum of removed weights\n      for i = 1, #weights do\n        acc['total'] = acc['total'] + (tonumber(weights[i]) or 0)\n      end\n\n      -- Calculate sum of removed weights by client\n      local client_weights = {}\n      for i = 1, #clients do\n        local removed = tonumber(weights[i]) or 0\n        if removed > 0 then\n          acc['client_weights'][clients[i]] = (acc['client_weights'][clients[i]] or 0) + removed\n        end\n      end\n    end\n\n    local acc = {\n      ['total'] = 0,\n      ['client_weights'] = {}\n    }\n    local batch_size = 1000\n\n    -- Compute changes to Zsets and apply changes to Hashes\n    for i = 1, #expired, batch_size do\n      local batch = {}\n      for j = i, math.min(i + batch_size - 1, #expired) do\n        table.insert(batch, expired[j])\n      end\n\n      flush_batch(batch, acc)\n    end\n\n    -- Apply changes to Zsets\n    if acc['total'] > 0 then\n      redis.call('hincrby', settings_key, 'done', acc['total'])\n      running = tonumber(redis.call('hincrby', settings_key, 'running', -acc['total']))\n    end\n\n    for client, weight in pairs(acc['client_weights']) do\n      redis.call('zincrby', client_running_key, -weight, client)\n    end\n  end\n\n  --\n  -- Process 'reservoir' changes\n  --\n  local reservoirRefreshActive = reservoirRefreshInterval ~= nil and reservoirRefreshAmount ~= nil\n  if reservoirRefreshActive and now >= lastReservoirRefresh + reservoirRefreshInterval then\n    reservoir = reservoirRefreshAmount\n    redis.call('hmset', settings_key,\n      'reservoir', reservoir,\n      'lastReservoirRefresh', now\n    )\n  end\n\n  local reservoirIncreaseActive = reservoirIncreaseInterval ~= nil and reservoirIncreaseAmount ~= nil\n  if reservoirIncreaseActive and now >= lastReservoirIncrease + reservoirIncreaseInterval then\n    local num_intervals = math.floor((now - lastReservoirIncrease) / reservoirIncreaseInterval)\n    local incr = reservoirIncreaseAmount * num_intervals\n    if reservoirIncreaseMaximum ~= nil then\n      incr = math.min(incr, reservoirIncreaseMaximum - (reservoir or 0))\n    end\n    if incr > 0 then\n      reservoir = (reservoir or 0) + incr\n    end\n    redis.call('hmset', settings_key,\n      'reservoir', reservoir,\n      'lastReservoirIncrease', lastReservoirIncrease + (num_intervals * reservoirIncreaseInterval)\n    )\n  end\n\n  --\n  -- Clear unresponsive clients\n  --\n  local unresponsive = redis.call('zrangebyscore', client_last_seen_key, '-inf', (now - clientTimeout))\n  local unresponsive_lookup = {}\n  local terminated_clients = {}\n  for i = 1, #unresponsive do\n    unresponsive_lookup[unresponsive[i]] = true\n    if tonumber(redis.call('zscore', client_running_key, unresponsive[i])) == 0 then\n      table.insert(terminated_clients, unresponsive[i])\n    end\n  end\n  if #terminated_clients > 0 then\n    redis.call('zrem', client_running_key,         unpack(terminated_clients))\n    redis.call('hdel', client_num_queued_key,      unpack(terminated_clients))\n    redis.call('zrem', client_last_registered_key, unpack(terminated_clients))\n    redis.call('zrem', client_last_seen_key,       unpack(terminated_clients))\n  end\n\n  --\n  -- Broadcast capacity changes\n  --\n  local final_capacity = compute_capacity(maxConcurrent, running, reservoir)\n\n  if always_publish or (initial_capacity ~= nil and final_capacity == nil) then\n    -- always_publish or was not unlimited, now unlimited\n    redis.call('publish', 'b_'..id, 'capacity:'..(final_capacity or ''))\n\n  elseif initial_capacity ~= nil and final_capacity ~= nil and final_capacity > initial_capacity then\n    -- capacity was increased\n    -- send the capacity message to the limiter having the lowest number of running jobs\n    -- the tiebreaker is the limiter having not registered a job in the longest time\n\n    local lowest_concurrency_value = nil\n    local lowest_concurrency_clients = {}\n    local lowest_concurrency_last_registered = {}\n    local client_concurrencies = redis.call('zrange', client_running_key, 0, -1, 'withscores')\n\n    for i = 1, #client_concurrencies, 2 do\n      local client = client_concurrencies[i]\n      local concurrency = tonumber(client_concurrencies[i+1])\n\n      if (\n        lowest_concurrency_value == nil or lowest_concurrency_value == concurrency\n      ) and (\n        not unresponsive_lookup[client]\n      ) and (\n        tonumber(redis.call('hget', client_num_queued_key, client)) > 0\n      ) then\n        lowest_concurrency_value = concurrency\n        table.insert(lowest_concurrency_clients, client)\n        local last_registered = tonumber(redis.call('zscore', client_last_registered_key, client))\n        table.insert(lowest_concurrency_last_registered, last_registered)\n      end\n    end\n\n    if #lowest_concurrency_clients > 0 then\n      local position = 1\n      local earliest = lowest_concurrency_last_registered[1]\n\n      for i,v in ipairs(lowest_concurrency_last_registered) do\n        if v < earliest then\n          position = i\n          earliest = v\n        end\n      end\n\n      local next_client = lowest_concurrency_clients[position]\n      redis.call('publish', 'b_'..id,\n        'capacity-priority:'..(final_capacity or '')..\n        ':'..next_client..\n        ':'..capacityPriorityCounter\n      )\n      redis.call('hincrby', settings_key, 'capacityPriorityCounter', '1')\n    else\n      redis.call('publish', 'b_'..id, 'capacity:'..(final_capacity or ''))\n    end\n  end\n\n  return {\n    ['capacity'] = final_capacity,\n    ['running'] = running,\n    ['reservoir'] = reservoir\n  }\nend\n",
  	"queued.lua": "local clientTimeout = tonumber(redis.call('hget', settings_key, 'clientTimeout'))\nlocal valid_clients = redis.call('zrangebyscore', client_last_seen_key, (now - clientTimeout), 'inf')\nlocal client_queued = redis.call('hmget', client_num_queued_key, unpack(valid_clients))\n\nlocal sum = 0\nfor i = 1, #client_queued do\n  sum = sum + tonumber(client_queued[i])\nend\n\nreturn sum\n",
  	"refresh_expiration.lua": "local refresh_expiration = function (now, nextRequest, groupTimeout)\n\n  if groupTimeout ~= nil then\n    local ttl = (nextRequest + groupTimeout) - now\n\n    for i = 1, #KEYS do\n      redis.call('pexpire', KEYS[i], ttl)\n    end\n  end\n\nend\n",
  	"refs.lua": "local settings_key = KEYS[1]\nlocal job_weights_key = KEYS[2]\nlocal job_expirations_key = KEYS[3]\nlocal job_clients_key = KEYS[4]\nlocal client_running_key = KEYS[5]\nlocal client_num_queued_key = KEYS[6]\nlocal client_last_registered_key = KEYS[7]\nlocal client_last_seen_key = KEYS[8]\n\nlocal now = tonumber(ARGV[1])\nlocal client = ARGV[2]\n\nlocal num_static_argv = 2\n",
  	"register.lua": "local index = ARGV[num_static_argv + 1]\nlocal weight = tonumber(ARGV[num_static_argv + 2])\nlocal expiration = tonumber(ARGV[num_static_argv + 3])\n\nlocal state = process_tick(now, false)\nlocal capacity = state['capacity']\nlocal reservoir = state['reservoir']\n\nlocal settings = redis.call('hmget', settings_key,\n  'nextRequest',\n  'minTime',\n  'groupTimeout'\n)\nlocal nextRequest = tonumber(settings[1])\nlocal minTime = tonumber(settings[2])\nlocal groupTimeout = tonumber(settings[3])\n\nif conditions_check(capacity, weight) then\n\n  redis.call('hincrby', settings_key, 'running', weight)\n  redis.call('hset', job_weights_key, index, weight)\n  if expiration ~= nil then\n    redis.call('zadd', job_expirations_key, now + expiration, index)\n  end\n  redis.call('hset', job_clients_key, index, client)\n  redis.call('zincrby', client_running_key, weight, client)\n  redis.call('hincrby', client_num_queued_key, client, -1)\n  redis.call('zadd', client_last_registered_key, now, client)\n\n  local wait = math.max(nextRequest - now, 0)\n  local newNextRequest = now + wait + minTime\n\n  if reservoir == nil then\n    redis.call('hset', settings_key,\n      'nextRequest', newNextRequest\n    )\n  else\n    reservoir = reservoir - weight\n    redis.call('hmset', settings_key,\n      'reservoir', reservoir,\n      'nextRequest', newNextRequest\n    )\n  end\n\n  refresh_expiration(now, newNextRequest, groupTimeout)\n\n  return {true, wait, reservoir}\n\nelse\n  return {false}\nend\n",
  	"register_client.lua": "local queued = tonumber(ARGV[num_static_argv + 1])\n\n-- Could have been re-registered concurrently\nif not redis.call('zscore', client_last_seen_key, client) then\n  redis.call('zadd', client_running_key, 0, client)\n  redis.call('hset', client_num_queued_key, client, queued)\n  redis.call('zadd', client_last_registered_key, 0, client)\nend\n\nredis.call('zadd', client_last_seen_key, now, client)\n\nreturn {}\n",
  	"running.lua": "return process_tick(now, false)['running']\n",
  	"submit.lua": "local queueLength = tonumber(ARGV[num_static_argv + 1])\nlocal weight = tonumber(ARGV[num_static_argv + 2])\n\nlocal capacity = process_tick(now, false)['capacity']\n\nlocal settings = redis.call('hmget', settings_key,\n  'id',\n  'maxConcurrent',\n  'highWater',\n  'nextRequest',\n  'strategy',\n  'unblockTime',\n  'penalty',\n  'minTime',\n  'groupTimeout'\n)\nlocal id = settings[1]\nlocal maxConcurrent = tonumber(settings[2])\nlocal highWater = tonumber(settings[3])\nlocal nextRequest = tonumber(settings[4])\nlocal strategy = tonumber(settings[5])\nlocal unblockTime = tonumber(settings[6])\nlocal penalty = tonumber(settings[7])\nlocal minTime = tonumber(settings[8])\nlocal groupTimeout = tonumber(settings[9])\n\nif maxConcurrent ~= nil and weight > maxConcurrent then\n  return redis.error_reply('OVERWEIGHT:'..weight..':'..maxConcurrent)\nend\n\nlocal reachedHWM = (highWater ~= nil and queueLength == highWater\n  and not (\n    conditions_check(capacity, weight)\n    and nextRequest - now <= 0\n  )\n)\n\nlocal blocked = strategy == 3 and (reachedHWM or unblockTime >= now)\n\nif blocked then\n  local computedPenalty = penalty\n  if computedPenalty == nil then\n    if minTime == 0 then\n      computedPenalty = 5000\n    else\n      computedPenalty = 15 * minTime\n    end\n  end\n\n  local newNextRequest = now + computedPenalty + minTime\n\n  redis.call('hmset', settings_key,\n    'unblockTime', now + computedPenalty,\n    'nextRequest', newNextRequest\n  )\n\n  local clients_queued_reset = redis.call('hkeys', client_num_queued_key)\n  local queued_reset = {}\n  for i = 1, #clients_queued_reset do\n    table.insert(queued_reset, clients_queued_reset[i])\n    table.insert(queued_reset, 0)\n  end\n  redis.call('hmset', client_num_queued_key, unpack(queued_reset))\n\n  redis.call('publish', 'b_'..id, 'blocked:')\n\n  refresh_expiration(now, newNextRequest, groupTimeout)\nend\n\nif not blocked and not reachedHWM then\n  redis.call('hincrby', client_num_queued_key, client, 1)\nend\n\nreturn {reachedHWM, blocked, strategy}\n",
  	"update_settings.lua": "local args = {'hmset', settings_key}\n\nfor i = num_static_argv + 1, #ARGV do\n  table.insert(args, ARGV[i])\nend\n\nredis.call(unpack(args))\n\nprocess_tick(now, true)\n\nlocal groupTimeout = tonumber(redis.call('hget', settings_key, 'groupTimeout'))\nrefresh_expiration(0, 0, groupTimeout)\n\nreturn {}\n",
  	"validate_client.lua": "if not redis.call('zscore', client_last_seen_key, client) then\n  return redis.error_reply('UNKNOWN_CLIENT')\nend\n\nredis.call('zadd', client_last_seen_key, now, client)\n",
  	"validate_keys.lua": "if not (redis.call('exists', settings_key) == 1) then\n  return redis.error_reply('SETTINGS_KEY_NOT_FOUND')\nend\n"
  };

  var Scripts = createCommonjsModule(function (module, exports) {

  var headers, lua, templates;
  lua = require$$0;
  headers = {
    refs: lua["refs.lua"],
    validate_keys: lua["validate_keys.lua"],
    validate_client: lua["validate_client.lua"],
    refresh_expiration: lua["refresh_expiration.lua"],
    process_tick: lua["process_tick.lua"],
    conditions_check: lua["conditions_check.lua"],
    get_time: lua["get_time.lua"]
  };

  exports.allKeys = function (id) {
    return [
    /*
    HASH
    */
    `b_${id}_settings`,
    /*
    HASH
    job index -> weight
    */
    `b_${id}_job_weights`,
    /*
    ZSET
    job index -> expiration
    */
    `b_${id}_job_expirations`,
    /*
    HASH
    job index -> client
    */
    `b_${id}_job_clients`,
    /*
    ZSET
    client -> sum running
    */
    `b_${id}_client_running`,
    /*
    HASH
    client -> num queued
    */
    `b_${id}_client_num_queued`,
    /*
    ZSET
    client -> last job registered
    */
    `b_${id}_client_last_registered`,
    /*
    ZSET
    client -> last seen
    */
    `b_${id}_client_last_seen`];
  };

  templates = {
    init: {
      keys: exports.allKeys,
      headers: ["process_tick"],
      refresh_expiration: true,
      code: lua["init.lua"]
    },
    group_check: {
      keys: exports.allKeys,
      headers: [],
      refresh_expiration: false,
      code: lua["group_check.lua"]
    },
    register_client: {
      keys: exports.allKeys,
      headers: ["validate_keys"],
      refresh_expiration: false,
      code: lua["register_client.lua"]
    },
    blacklist_client: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client"],
      refresh_expiration: false,
      code: lua["blacklist_client.lua"]
    },
    heartbeat: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick"],
      refresh_expiration: false,
      code: lua["heartbeat.lua"]
    },
    update_settings: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick"],
      refresh_expiration: true,
      code: lua["update_settings.lua"]
    },
    running: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick"],
      refresh_expiration: false,
      code: lua["running.lua"]
    },
    queued: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client"],
      refresh_expiration: false,
      code: lua["queued.lua"]
    },
    done: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick"],
      refresh_expiration: false,
      code: lua["done.lua"]
    },
    check: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick", "conditions_check"],
      refresh_expiration: false,
      code: lua["check.lua"]
    },
    submit: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick", "conditions_check"],
      refresh_expiration: true,
      code: lua["submit.lua"]
    },
    register: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick", "conditions_check"],
      refresh_expiration: true,
      code: lua["register.lua"]
    },
    free: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick"],
      refresh_expiration: true,
      code: lua["free.lua"]
    },
    current_reservoir: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick"],
      refresh_expiration: false,
      code: lua["current_reservoir.lua"]
    },
    increment_reservoir: {
      keys: exports.allKeys,
      headers: ["validate_keys", "validate_client", "process_tick"],
      refresh_expiration: true,
      code: lua["increment_reservoir.lua"]
    }
  };
  exports.names = Object.keys(templates);

  exports.keys = function (name, id) {
    return templates[name].keys(id);
  };

  exports.payload = function (name) {
    var template;
    template = templates[name];
    return Array.prototype.concat(headers.refs, template.headers.map(function (h) {
      return headers[h];
    }), template.refresh_expiration ? headers.refresh_expiration : "", template.code).join("\n");
  };
  });

  function asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$3(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$3(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Events$2, RedisConnection, Scripts$1, parser$3;
  parser$3 = parser;
  Events$2 = Events_1;
  Scripts$1 = Scripts;

  RedisConnection = function () {
    class RedisConnection {
      constructor(options = {}) {
        parser$3.load(options, this.defaults, this);

        if (this.Redis == null) {
          this.Redis = eval("require")("redis"); // Obfuscated or else Webpack/Angular will try to inline the optional redis module. To override this behavior: pass the redis module to Bottleneck as the 'Redis' option.
        }

        if (this.Events == null) {
          this.Events = new Events$2(this);
        }

        this.terminated = false;

        if (this.client == null) {
          this.client = this.Redis.createClient(this.clientOptions);
        }

        this.subscriber = this.client.duplicate();
        this.limiters = {};
        this.shas = {};
        this.ready = this.Promise.all([this._setup(this.client, false), this._setup(this.subscriber, true)]).then(() => {
          return this._loadScripts();
        }).then(() => {
          return {
            client: this.client,
            subscriber: this.subscriber
          };
        });
      }

      _setup(client, sub) {
        client.setMaxListeners(0);
        return new this.Promise((resolve, reject) => {
          client.on("error", e => {
            return this.Events.trigger("error", e);
          });

          if (sub) {
            client.on("message", (channel, message) => {
              var ref;
              return (ref = this.limiters[channel]) != null ? ref._store.onMessage(channel, message) : void 0;
            });
          }

          if (client.ready) {
            return resolve();
          } else {
            return client.once("ready", resolve);
          }
        });
      }

      _loadScript(name) {
        return new this.Promise((resolve, reject) => {
          var payload;
          payload = Scripts$1.payload(name);
          return this.client.multi([["script", "load", payload]]).exec((err, replies) => {
            if (err != null) {
              return reject(err);
            }

            this.shas[name] = replies[0];
            return resolve(replies[0]);
          });
        });
      }

      _loadScripts() {
        return this.Promise.all(Scripts$1.names.map(k => {
          return this._loadScript(k);
        }));
      }

      __runCommand__(cmd) {
        var _this = this;

        return _asyncToGenerator$3(function* () {
          yield _this.ready;
          return new _this.Promise((resolve, reject) => {
            return _this.client.multi([cmd]).exec_atomic(function (err, replies) {
              if (err != null) {
                return reject(err);
              } else {
                return resolve(replies[0]);
              }
            });
          });
        })();
      }

      __addLimiter__(instance) {
        return this.Promise.all([instance.channel(), instance.channel_client()].map(channel => {
          return new this.Promise((resolve, reject) => {
            var handler;

            handler = chan => {
              if (chan === channel) {
                this.subscriber.removeListener("subscribe", handler);
                this.limiters[channel] = instance;
                return resolve();
              }
            };

            this.subscriber.on("subscribe", handler);
            return this.subscriber.subscribe(channel);
          });
        }));
      }

      __removeLimiter__(instance) {
        var _this2 = this;

        return this.Promise.all([instance.channel(), instance.channel_client()].map(
        /*#__PURE__*/
        function () {
          var _ref = _asyncToGenerator$3(function* (channel) {
            if (!_this2.terminated) {
              yield new _this2.Promise((resolve, reject) => {
                return _this2.subscriber.unsubscribe(channel, function (err, chan) {
                  if (err != null) {
                    return reject(err);
                  }

                  if (chan === channel) {
                    return resolve();
                  }
                });
              });
            }

            return delete _this2.limiters[channel];
          });

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }()));
      }

      __scriptArgs__(name, id, args, cb) {
        var keys;
        keys = Scripts$1.keys(name, id);
        return [this.shas[name], keys.length].concat(keys, args, cb);
      }

      __scriptFn__(name) {
        return this.client.evalsha.bind(this.client);
      }

      disconnect(flush = true) {
        var i, k, len, ref;
        ref = Object.keys(this.limiters);

        for (i = 0, len = ref.length; i < len; i++) {
          k = ref[i];
          clearInterval(this.limiters[k]._store.heartbeat);
        }

        this.limiters = {};
        this.terminated = true;
        this.client.end(flush);
        this.subscriber.end(flush);
        return this.Promise.resolve();
      }

    }
    RedisConnection.prototype.datastore = "redis";
    RedisConnection.prototype.defaults = {
      Redis: null,
      clientOptions: {},
      client: null,
      Promise: Promise,
      Events: null
    };
    return RedisConnection;
  }.call(void 0);

  var RedisConnection_1 = RedisConnection;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$4(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$4(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Events$3, IORedisConnection, Scripts$2, parser$4;
  parser$4 = parser;
  Events$3 = Events_1;
  Scripts$2 = Scripts;

  IORedisConnection = function () {
    class IORedisConnection {
      constructor(options = {}) {
        parser$4.load(options, this.defaults, this);

        if (this.Redis == null) {
          this.Redis = eval("require")("ioredis"); // Obfuscated or else Webpack/Angular will try to inline the optional ioredis module. To override this behavior: pass the ioredis module to Bottleneck as the 'Redis' option.
        }

        if (this.Events == null) {
          this.Events = new Events$3(this);
        }

        this.terminated = false;

        if (this.clusterNodes != null) {
          this.client = new this.Redis.Cluster(this.clusterNodes, this.clientOptions);
          this.subscriber = new this.Redis.Cluster(this.clusterNodes, this.clientOptions);
        } else if (this.client != null && this.client.duplicate == null) {
          this.subscriber = new this.Redis.Cluster(this.client.startupNodes, this.client.options);
        } else {
          if (this.client == null) {
            this.client = new this.Redis(this.clientOptions);
          }

          this.subscriber = this.client.duplicate();
        }

        this.limiters = {};
        this.ready = this.Promise.all([this._setup(this.client, false), this._setup(this.subscriber, true)]).then(() => {
          this._loadScripts();

          return {
            client: this.client,
            subscriber: this.subscriber
          };
        });
      }

      _setup(client, sub) {
        client.setMaxListeners(0);
        return new this.Promise((resolve, reject) => {
          client.on("error", e => {
            return this.Events.trigger("error", e);
          });

          if (sub) {
            client.on("message", (channel, message) => {
              var ref;
              return (ref = this.limiters[channel]) != null ? ref._store.onMessage(channel, message) : void 0;
            });
          }

          if (client.status === "ready") {
            return resolve();
          } else {
            return client.once("ready", resolve);
          }
        });
      }

      _loadScripts() {
        return Scripts$2.names.forEach(name => {
          return this.client.defineCommand(name, {
            lua: Scripts$2.payload(name)
          });
        });
      }

      __runCommand__(cmd) {
        var _this = this;

        return _asyncToGenerator$4(function* () {
          var deleted;

          yield _this.ready;

          var _ref = yield _this.client.pipeline([cmd]).exec();

          var _ref2 = _slicedToArray(_ref, 1);

          var _ref2$ = _slicedToArray(_ref2[0], 2);

          _ref2$[0];
          deleted = _ref2$[1];
          return deleted;
        })();
      }

      __addLimiter__(instance) {
        return this.Promise.all([instance.channel(), instance.channel_client()].map(channel => {
          return new this.Promise((resolve, reject) => {
            return this.subscriber.subscribe(channel, () => {
              this.limiters[channel] = instance;
              return resolve();
            });
          });
        }));
      }

      __removeLimiter__(instance) {
        var _this2 = this;

        return [instance.channel(), instance.channel_client()].forEach(
        /*#__PURE__*/
        function () {
          var _ref3 = _asyncToGenerator$4(function* (channel) {
            if (!_this2.terminated) {
              yield _this2.subscriber.unsubscribe(channel);
            }

            return delete _this2.limiters[channel];
          });

          return function (_x) {
            return _ref3.apply(this, arguments);
          };
        }());
      }

      __scriptArgs__(name, id, args, cb) {
        var keys;
        keys = Scripts$2.keys(name, id);
        return [keys.length].concat(keys, args, cb);
      }

      __scriptFn__(name) {
        return this.client[name].bind(this.client);
      }

      disconnect(flush = true) {
        var i, k, len, ref;
        ref = Object.keys(this.limiters);

        for (i = 0, len = ref.length; i < len; i++) {
          k = ref[i];
          clearInterval(this.limiters[k]._store.heartbeat);
        }

        this.limiters = {};
        this.terminated = true;

        if (flush) {
          return this.Promise.all([this.client.quit(), this.subscriber.quit()]);
        } else {
          this.client.disconnect();
          this.subscriber.disconnect();
          return this.Promise.resolve();
        }
      }

    }
    IORedisConnection.prototype.datastore = "ioredis";
    IORedisConnection.prototype.defaults = {
      Redis: null,
      clientOptions: {},
      clusterNodes: null,
      client: null,
      Promise: Promise,
      Events: null
    };
    return IORedisConnection;
  }.call(void 0);

  var IORedisConnection_1 = IORedisConnection;

  function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1(); }

  function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit$1(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }

  function asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$5(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$5(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var BottleneckError$3, IORedisConnection$1, RedisConnection$1, RedisDatastore, parser$5;
  parser$5 = parser;
  BottleneckError$3 = BottleneckError_1;
  RedisConnection$1 = RedisConnection_1;
  IORedisConnection$1 = IORedisConnection_1;
  RedisDatastore = class RedisDatastore {
    constructor(instance, storeOptions, storeInstanceOptions) {
      this.instance = instance;
      this.storeOptions = storeOptions;
      this.originalId = this.instance.id;
      this.clientId = this.instance._randomIndex();
      parser$5.load(storeInstanceOptions, storeInstanceOptions, this);
      this.clients = {};
      this.capacityPriorityCounters = {};
      this.sharedConnection = this.connection != null;

      if (this.connection == null) {
        this.connection = this.instance.datastore === "redis" ? new RedisConnection$1({
          Redis: this.Redis,
          clientOptions: this.clientOptions,
          Promise: this.Promise,
          Events: this.instance.Events
        }) : this.instance.datastore === "ioredis" ? new IORedisConnection$1({
          Redis: this.Redis,
          clientOptions: this.clientOptions,
          clusterNodes: this.clusterNodes,
          Promise: this.Promise,
          Events: this.instance.Events
        }) : void 0;
      }

      this.instance.connection = this.connection;
      this.instance.datastore = this.connection.datastore;
      this.ready = this.connection.ready.then(clients => {
        this.clients = clients;
        return this.runScript("init", this.prepareInitSettings(this.clearDatastore));
      }).then(() => {
        return this.connection.__addLimiter__(this.instance);
      }).then(() => {
        return this.runScript("register_client", [this.instance.queued()]);
      }).then(() => {
        var base;

        if (typeof (base = this.heartbeat = setInterval(() => {
          return this.runScript("heartbeat", []).catch(e => {
            return this.instance.Events.trigger("error", e);
          });
        }, this.heartbeatInterval)).unref === "function") {
          base.unref();
        }

        return this.clients;
      });
    }

    __publish__(message) {
      var _this = this;

      return _asyncToGenerator$5(function* () {
        var client;

        var _ref = yield _this.ready;

        client = _ref.client;
        return client.publish(_this.instance.channel(), `message:${message.toString()}`);
      })();
    }

    onMessage(channel, message) {
      var _this2 = this;

      return _asyncToGenerator$5(function* () {
        var capacity, counter, data, drained, e, newCapacity, pos, priorityClient, rawCapacity, type;

        try {
          pos = message.indexOf(":");
          var _ref2 = [message.slice(0, pos), message.slice(pos + 1)];
          type = _ref2[0];
          data = _ref2[1];

          if (type === "capacity") {
            return yield _this2.instance._drainAll(data.length > 0 ? ~~data : void 0);
          } else if (type === "capacity-priority") {
            var _data$split = data.split(":");

            var _data$split2 = _slicedToArray$1(_data$split, 3);

            rawCapacity = _data$split2[0];
            priorityClient = _data$split2[1];
            counter = _data$split2[2];
            capacity = rawCapacity.length > 0 ? ~~rawCapacity : void 0;

            if (priorityClient === _this2.clientId) {
              drained = yield _this2.instance._drainAll(capacity);
              newCapacity = capacity != null ? capacity - (drained || 0) : "";
              return yield _this2.clients.client.publish(_this2.instance.channel(), `capacity-priority:${newCapacity}::${counter}`);
            } else if (priorityClient === "") {
              clearTimeout(_this2.capacityPriorityCounters[counter]);
              delete _this2.capacityPriorityCounters[counter];
              return _this2.instance._drainAll(capacity);
            } else {
              return _this2.capacityPriorityCounters[counter] = setTimeout(
              /*#__PURE__*/
              _asyncToGenerator$5(function* () {
                var e;

                try {
                  delete _this2.capacityPriorityCounters[counter];
                  yield _this2.runScript("blacklist_client", [priorityClient]);
                  return yield _this2.instance._drainAll(capacity);
                } catch (error) {
                  e = error;
                  return _this2.instance.Events.trigger("error", e);
                }
              }), 1000);
            }
          } else if (type === "message") {
            return _this2.instance.Events.trigger("message", data);
          } else if (type === "blocked") {
            return yield _this2.instance._dropAllQueued();
          }
        } catch (error) {
          e = error;
          return _this2.instance.Events.trigger("error", e);
        }
      })();
    }

    __disconnect__(flush) {
      clearInterval(this.heartbeat);

      if (this.sharedConnection) {
        return this.connection.__removeLimiter__(this.instance);
      } else {
        return this.connection.disconnect(flush);
      }
    }

    runScript(name, args) {
      var _this3 = this;

      return _asyncToGenerator$5(function* () {
        if (!(name === "init" || name === "register_client")) {
          yield _this3.ready;
        }

        return new _this3.Promise((resolve, reject) => {
          var all_args, arr;
          all_args = [Date.now(), _this3.clientId].concat(args);

          _this3.instance.Events.trigger("debug", `Calling Redis script: ${name}.lua`, all_args);

          arr = _this3.connection.__scriptArgs__(name, _this3.originalId, all_args, function (err, replies) {
            if (err != null) {
              return reject(err);
            }

            return resolve(replies);
          });
          return _this3.connection.__scriptFn__(name)(...arr);
        }).catch(e => {
          if (e.message === "SETTINGS_KEY_NOT_FOUND") {
            if (name === "heartbeat") {
              return _this3.Promise.resolve();
            } else {
              return _this3.runScript("init", _this3.prepareInitSettings(false)).then(() => {
                return _this3.runScript(name, args);
              });
            }
          } else if (e.message === "UNKNOWN_CLIENT") {
            return _this3.runScript("register_client", [_this3.instance.queued()]).then(() => {
              return _this3.runScript(name, args);
            });
          } else {
            return _this3.Promise.reject(e);
          }
        });
      })();
    }

    prepareArray(arr) {
      var i, len, results, x;
      results = [];

      for (i = 0, len = arr.length; i < len; i++) {
        x = arr[i];
        results.push(x != null ? x.toString() : "");
      }

      return results;
    }

    prepareObject(obj) {
      var arr, k, v;
      arr = [];

      for (k in obj) {
        v = obj[k];
        arr.push(k, v != null ? v.toString() : "");
      }

      return arr;
    }

    prepareInitSettings(clear) {
      var args;
      args = this.prepareObject(Object.assign({}, this.storeOptions, {
        id: this.originalId,
        version: this.instance.version,
        groupTimeout: this.timeout,
        clientTimeout: this.clientTimeout
      }));
      args.unshift(clear ? 1 : 0, this.instance.version);
      return args;
    }

    convertBool(b) {
      return !!b;
    }

    __updateSettings__(options) {
      var _this4 = this;

      return _asyncToGenerator$5(function* () {
        yield _this4.runScript("update_settings", _this4.prepareObject(options));
        return parser$5.overwrite(options, options, _this4.storeOptions);
      })();
    }

    __running__() {
      return this.runScript("running", []);
    }

    __queued__() {
      return this.runScript("queued", []);
    }

    __done__() {
      return this.runScript("done", []);
    }

    __groupCheck__() {
      var _this5 = this;

      return _asyncToGenerator$5(function* () {
        return _this5.convertBool((yield _this5.runScript("group_check", [])));
      })();
    }

    __incrementReservoir__(incr) {
      return this.runScript("increment_reservoir", [incr]);
    }

    __currentReservoir__() {
      return this.runScript("current_reservoir", []);
    }

    __check__(weight) {
      var _this6 = this;

      return _asyncToGenerator$5(function* () {
        return _this6.convertBool((yield _this6.runScript("check", _this6.prepareArray([weight]))));
      })();
    }

    __register__(index, weight, expiration) {
      var _this7 = this;

      return _asyncToGenerator$5(function* () {
        var reservoir, success, wait;

        var _ref4 = yield _this7.runScript("register", _this7.prepareArray([index, weight, expiration]));

        var _ref5 = _slicedToArray$1(_ref4, 3);

        success = _ref5[0];
        wait = _ref5[1];
        reservoir = _ref5[2];
        return {
          success: _this7.convertBool(success),
          wait,
          reservoir
        };
      })();
    }

    __submit__(queueLength, weight) {
      var _this8 = this;

      return _asyncToGenerator$5(function* () {
        var blocked, e, maxConcurrent, reachedHWM, strategy;

        try {
          var _ref6 = yield _this8.runScript("submit", _this8.prepareArray([queueLength, weight]));

          var _ref7 = _slicedToArray$1(_ref6, 3);

          reachedHWM = _ref7[0];
          blocked = _ref7[1];
          strategy = _ref7[2];
          return {
            reachedHWM: _this8.convertBool(reachedHWM),
            blocked: _this8.convertBool(blocked),
            strategy
          };
        } catch (error) {
          e = error;

          if (e.message.indexOf("OVERWEIGHT") === 0) {
            var _e$message$split = e.message.split(":");

            var _e$message$split2 = _slicedToArray$1(_e$message$split, 3);

            _e$message$split2[0];
            weight = _e$message$split2[1];
            maxConcurrent = _e$message$split2[2];
            throw new BottleneckError$3(`Impossible to add a job having a weight of ${weight} to a limiter having a maxConcurrent setting of ${maxConcurrent}`);
          } else {
            throw e;
          }
        }
      })();
    }

    __free__(index, weight) {
      var _this9 = this;

      return _asyncToGenerator$5(function* () {
        var running;
        running = yield _this9.runScript("free", _this9.prepareArray([index]));
        return {
          running
        };
      })();
    }

  };
  var RedisDatastore_1 = RedisDatastore;

  var BottleneckError$4, States;
  BottleneckError$4 = BottleneckError_1;
  States = class States {
    constructor(status1) {
      this.status = status1;
      this._jobs = {};
      this.counts = this.status.map(function () {
        return 0;
      });
    }

    next(id) {
      var current, next;
      current = this._jobs[id];
      next = current + 1;

      if (current != null && next < this.status.length) {
        this.counts[current]--;
        this.counts[next]++;
        return this._jobs[id]++;
      } else if (current != null) {
        this.counts[current]--;
        return delete this._jobs[id];
      }
    }

    start(id) {
      var initial;
      initial = 0;
      this._jobs[id] = initial;
      return this.counts[initial]++;
    }

    remove(id) {
      var current;
      current = this._jobs[id];

      if (current != null) {
        this.counts[current]--;
        delete this._jobs[id];
      }

      return current != null;
    }

    jobStatus(id) {
      var ref;
      return (ref = this.status[this._jobs[id]]) != null ? ref : null;
    }

    statusJobs(status) {
      var k, pos, ref, results, v;

      if (status != null) {
        pos = this.status.indexOf(status);

        if (pos < 0) {
          throw new BottleneckError$4(`status must be one of ${this.status.join(', ')}`);
        }

        ref = this._jobs;
        results = [];

        for (k in ref) {
          v = ref[k];

          if (v === pos) {
            results.push(k);
          }
        }

        return results;
      } else {
        return Object.keys(this._jobs);
      }
    }

    statusCounts() {
      return this.counts.reduce((acc, v, i) => {
        acc[this.status[i]] = v;
        return acc;
      }, {});
    }

  };
  var States_1 = States;

  function asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$6(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$6(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var DLList$2, Sync;
  DLList$2 = DLList_1;
  Sync = class Sync {
    constructor(name, Promise) {
      this.schedule = this.schedule.bind(this);
      this.name = name;
      this.Promise = Promise;
      this._running = 0;
      this._queue = new DLList$2();
    }

    isEmpty() {
      return this._queue.length === 0;
    }

    _tryToRun() {
      var _this = this;

      return _asyncToGenerator$6(function* () {
        var args, cb, error, reject, resolve, returned, task;

        if (_this._running < 1 && _this._queue.length > 0) {
          _this._running++;

          var _this$_queue$shift = _this._queue.shift();

          task = _this$_queue$shift.task;
          args = _this$_queue$shift.args;
          resolve = _this$_queue$shift.resolve;
          reject = _this$_queue$shift.reject;
          cb = yield _asyncToGenerator$6(function* () {
            try {
              returned = yield task(...args);
              return function () {
                return resolve(returned);
              };
            } catch (error1) {
              error = error1;
              return function () {
                return reject(error);
              };
            }
          })();
          _this._running--;

          _this._tryToRun();

          return cb();
        }
      })();
    }

    schedule(task, ...args) {
      var promise, reject, resolve;
      resolve = reject = null;
      promise = new this.Promise(function (_resolve, _reject) {
        resolve = _resolve;
        return reject = _reject;
      });

      this._queue.push({
        task,
        args,
        resolve,
        reject
      });

      this._tryToRun();

      return promise;
    }

  };
  var Sync_1 = Sync;

  var version = "2.19.5";
  var require$$8 = {
  	version: version
  };

  function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _nonIterableRest$2(); }

  function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit$2(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }

  function asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$7(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$7(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Events$4, Group, IORedisConnection$2, RedisConnection$2, Scripts$3, parser$6;
  parser$6 = parser;
  Events$4 = Events_1;
  RedisConnection$2 = RedisConnection_1;
  IORedisConnection$2 = IORedisConnection_1;
  Scripts$3 = Scripts;

  Group = function () {
    class Group {
      constructor(limiterOptions = {}) {
        this.deleteKey = this.deleteKey.bind(this);
        this.limiterOptions = limiterOptions;
        parser$6.load(this.limiterOptions, this.defaults, this);
        this.Events = new Events$4(this);
        this.instances = {};
        this.Bottleneck = Bottleneck_1;

        this._startAutoCleanup();

        this.sharedConnection = this.connection != null;

        if (this.connection == null) {
          if (this.limiterOptions.datastore === "redis") {
            this.connection = new RedisConnection$2(Object.assign({}, this.limiterOptions, {
              Events: this.Events
            }));
          } else if (this.limiterOptions.datastore === "ioredis") {
            this.connection = new IORedisConnection$2(Object.assign({}, this.limiterOptions, {
              Events: this.Events
            }));
          }
        }
      }

      key(key = "") {
        var ref;
        return (ref = this.instances[key]) != null ? ref : (() => {
          var limiter;
          limiter = this.instances[key] = new this.Bottleneck(Object.assign(this.limiterOptions, {
            id: `${this.id}-${key}`,
            timeout: this.timeout,
            connection: this.connection
          }));
          this.Events.trigger("created", limiter, key);
          return limiter;
        })();
      }

      deleteKey(key = "") {
        var _this = this;

        return _asyncToGenerator$7(function* () {
          var deleted, instance;
          instance = _this.instances[key];

          if (_this.connection) {
            deleted = yield _this.connection.__runCommand__(['del', ...Scripts$3.allKeys(`${_this.id}-${key}`)]);
          }

          if (instance != null) {
            delete _this.instances[key];
            yield instance.disconnect();
          }

          return instance != null || deleted > 0;
        })();
      }

      limiters() {
        var k, ref, results, v;
        ref = this.instances;
        results = [];

        for (k in ref) {
          v = ref[k];
          results.push({
            key: k,
            limiter: v
          });
        }

        return results;
      }

      keys() {
        return Object.keys(this.instances);
      }

      clusterKeys() {
        var _this2 = this;

        return _asyncToGenerator$7(function* () {
          var cursor, end, found, i, k, keys, len, next, start;

          if (_this2.connection == null) {
            return _this2.Promise.resolve(_this2.keys());
          }

          keys = [];
          cursor = null;
          start = `b_${_this2.id}-`.length;
          end = "_settings".length;

          while (cursor !== 0) {
            var _ref = yield _this2.connection.__runCommand__(["scan", cursor != null ? cursor : 0, "match", `b_${_this2.id}-*_settings`, "count", 10000]);

            var _ref2 = _slicedToArray$2(_ref, 2);

            next = _ref2[0];
            found = _ref2[1];
            cursor = ~~next;

            for (i = 0, len = found.length; i < len; i++) {
              k = found[i];
              keys.push(k.slice(start, -end));
            }
          }

          return keys;
        })();
      }

      _startAutoCleanup() {
        var _this3 = this;

        var base;
        clearInterval(this.interval);
        return typeof (base = this.interval = setInterval(
        /*#__PURE__*/
        _asyncToGenerator$7(function* () {
          var e, k, ref, results, time, v;
          time = Date.now();
          ref = _this3.instances;
          results = [];

          for (k in ref) {
            v = ref[k];

            try {
              if (yield v._store.__groupCheck__(time)) {
                results.push(_this3.deleteKey(k));
              } else {
                results.push(void 0);
              }
            } catch (error) {
              e = error;
              results.push(v.Events.trigger("error", e));
            }
          }

          return results;
        }), this.timeout / 2)).unref === "function" ? base.unref() : void 0;
      }

      updateSettings(options = {}) {
        parser$6.overwrite(options, this.defaults, this);
        parser$6.overwrite(options, options, this.limiterOptions);

        if (options.timeout != null) {
          return this._startAutoCleanup();
        }
      }

      disconnect(flush = true) {
        var ref;

        if (!this.sharedConnection) {
          return (ref = this.connection) != null ? ref.disconnect(flush) : void 0;
        }
      }

    }
    Group.prototype.defaults = {
      timeout: 1000 * 60 * 5,
      connection: null,
      Promise: Promise,
      id: "group-key"
    };
    return Group;
  }.call(void 0);

  var Group_1 = Group;

  var Batcher, Events$5, parser$7;
  parser$7 = parser;
  Events$5 = Events_1;

  Batcher = function () {
    class Batcher {
      constructor(options = {}) {
        this.options = options;
        parser$7.load(this.options, this.defaults, this);
        this.Events = new Events$5(this);
        this._arr = [];

        this._resetPromise();

        this._lastFlush = Date.now();
      }

      _resetPromise() {
        return this._promise = new this.Promise((res, rej) => {
          return this._resolve = res;
        });
      }

      _flush() {
        clearTimeout(this._timeout);
        this._lastFlush = Date.now();

        this._resolve();

        this.Events.trigger("batch", this._arr);
        this._arr = [];
        return this._resetPromise();
      }

      add(data) {
        var ret;

        this._arr.push(data);

        ret = this._promise;

        if (this._arr.length === this.maxSize) {
          this._flush();
        } else if (this.maxTime != null && this._arr.length === 1) {
          this._timeout = setTimeout(() => {
            return this._flush();
          }, this.maxTime);
        }

        return ret;
      }

    }
    Batcher.prototype.defaults = {
      maxTime: null,
      maxSize: null,
      Promise: Promise
    };
    return Batcher;
  }.call(void 0);

  var Batcher_1 = Batcher;

  function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _nonIterableRest$3(); }

  function _iterableToArrayLimit$3(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _toArray(arr) { return _arrayWithHoles$3(arr) || _iterableToArray(arr) || _nonIterableRest$3(); }

  function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

  function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }

  function asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator$8(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep$8(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Bottleneck,
      DEFAULT_PRIORITY$1,
      Events$6,
      Job$1,
      LocalDatastore$1,
      NUM_PRIORITIES$1,
      Queues$1,
      RedisDatastore$1,
      States$1,
      Sync$1,
      parser$8,
      splice = [].splice;
  NUM_PRIORITIES$1 = 10;
  DEFAULT_PRIORITY$1 = 5;
  parser$8 = parser;
  Queues$1 = Queues_1;
  Job$1 = Job_1;
  LocalDatastore$1 = LocalDatastore_1;
  RedisDatastore$1 = RedisDatastore_1;
  Events$6 = Events_1;
  States$1 = States_1;
  Sync$1 = Sync_1;

  Bottleneck = function () {
    class Bottleneck {
      constructor(options = {}, ...invalid) {
        var storeInstanceOptions, storeOptions;
        this._addToQueue = this._addToQueue.bind(this);

        this._validateOptions(options, invalid);

        parser$8.load(options, this.instanceDefaults, this);
        this._queues = new Queues$1(NUM_PRIORITIES$1);
        this._scheduled = {};
        this._states = new States$1(["RECEIVED", "QUEUED", "RUNNING", "EXECUTING"].concat(this.trackDoneStatus ? ["DONE"] : []));
        this._limiter = null;
        this.Events = new Events$6(this);
        this._submitLock = new Sync$1("submit", this.Promise);
        this._registerLock = new Sync$1("register", this.Promise);
        storeOptions = parser$8.load(options, this.storeDefaults, {});

        this._store = function () {
          if (this.datastore === "redis" || this.datastore === "ioredis" || this.connection != null) {
            storeInstanceOptions = parser$8.load(options, this.redisStoreDefaults, {});
            return new RedisDatastore$1(this, storeOptions, storeInstanceOptions);
          } else if (this.datastore === "local") {
            storeInstanceOptions = parser$8.load(options, this.localStoreDefaults, {});
            return new LocalDatastore$1(this, storeOptions, storeInstanceOptions);
          } else {
            throw new Bottleneck.prototype.BottleneckError(`Invalid datastore type: ${this.datastore}`);
          }
        }.call(this);

        this._queues.on("leftzero", () => {
          var ref;
          return (ref = this._store.heartbeat) != null ? typeof ref.ref === "function" ? ref.ref() : void 0 : void 0;
        });

        this._queues.on("zero", () => {
          var ref;
          return (ref = this._store.heartbeat) != null ? typeof ref.unref === "function" ? ref.unref() : void 0 : void 0;
        });
      }

      _validateOptions(options, invalid) {
        if (!(options != null && typeof options === "object" && invalid.length === 0)) {
          throw new Bottleneck.prototype.BottleneckError("Bottleneck v2 takes a single object argument. Refer to https://github.com/SGrondin/bottleneck#upgrading-to-v2 if you're upgrading from Bottleneck v1.");
        }
      }

      ready() {
        return this._store.ready;
      }

      clients() {
        return this._store.clients;
      }

      channel() {
        return `b_${this.id}`;
      }

      channel_client() {
        return `b_${this.id}_${this._store.clientId}`;
      }

      publish(message) {
        return this._store.__publish__(message);
      }

      disconnect(flush = true) {
        return this._store.__disconnect__(flush);
      }

      chain(_limiter) {
        this._limiter = _limiter;
        return this;
      }

      queued(priority) {
        return this._queues.queued(priority);
      }

      clusterQueued() {
        return this._store.__queued__();
      }

      empty() {
        return this.queued() === 0 && this._submitLock.isEmpty();
      }

      running() {
        return this._store.__running__();
      }

      done() {
        return this._store.__done__();
      }

      jobStatus(id) {
        return this._states.jobStatus(id);
      }

      jobs(status) {
        return this._states.statusJobs(status);
      }

      counts() {
        return this._states.statusCounts();
      }

      _randomIndex() {
        return Math.random().toString(36).slice(2);
      }

      check(weight = 1) {
        return this._store.__check__(weight);
      }

      _clearGlobalState(index) {
        if (this._scheduled[index] != null) {
          clearTimeout(this._scheduled[index].expiration);
          delete this._scheduled[index];
          return true;
        } else {
          return false;
        }
      }

      _free(index, job, options, eventInfo) {
        var _this = this;

        return _asyncToGenerator$8(function* () {
          var e, running;

          try {
            var _ref = yield _this._store.__free__(index, options.weight);

            running = _ref.running;

            _this.Events.trigger("debug", `Freed ${options.id}`, eventInfo);

            if (running === 0 && _this.empty()) {
              return _this.Events.trigger("idle");
            }
          } catch (error1) {
            e = error1;
            return _this.Events.trigger("error", e);
          }
        })();
      }

      _run(index, job, wait) {
        var clearGlobalState, free, run;
        job.doRun();
        clearGlobalState = this._clearGlobalState.bind(this, index);
        run = this._run.bind(this, index, job);
        free = this._free.bind(this, index, job);
        return this._scheduled[index] = {
          timeout: setTimeout(() => {
            return job.doExecute(this._limiter, clearGlobalState, run, free);
          }, wait),
          expiration: job.options.expiration != null ? setTimeout(function () {
            return job.doExpire(clearGlobalState, run, free);
          }, wait + job.options.expiration) : void 0,
          job: job
        };
      }

      _drainOne(capacity) {
        return this._registerLock.schedule(() => {
          var args, index, next, options, queue;

          if (this.queued() === 0) {
            return this.Promise.resolve(null);
          }

          queue = this._queues.getFirst();

          var _next2 = next = queue.first();

          options = _next2.options;
          args = _next2.args;

          if (capacity != null && options.weight > capacity) {
            return this.Promise.resolve(null);
          }

          this.Events.trigger("debug", `Draining ${options.id}`, {
            args,
            options
          });
          index = this._randomIndex();
          return this._store.__register__(index, options.weight, options.expiration).then(({
            success,
            wait,
            reservoir
          }) => {
            var empty;
            this.Events.trigger("debug", `Drained ${options.id}`, {
              success,
              args,
              options
            });

            if (success) {
              queue.shift();
              empty = this.empty();

              if (empty) {
                this.Events.trigger("empty");
              }

              if (reservoir === 0) {
                this.Events.trigger("depleted", empty);
              }

              this._run(index, next, wait);

              return this.Promise.resolve(options.weight);
            } else {
              return this.Promise.resolve(null);
            }
          });
        });
      }

      _drainAll(capacity, total = 0) {
        return this._drainOne(capacity).then(drained => {
          var newCapacity;

          if (drained != null) {
            newCapacity = capacity != null ? capacity - drained : capacity;
            return this._drainAll(newCapacity, total + drained);
          } else {
            return this.Promise.resolve(total);
          }
        }).catch(e => {
          return this.Events.trigger("error", e);
        });
      }

      _dropAllQueued(message) {
        return this._queues.shiftAll(function (job) {
          return job.doDrop({
            message
          });
        });
      }

      stop(options = {}) {
        var done, waitForExecuting;
        options = parser$8.load(options, this.stopDefaults);

        waitForExecuting = at => {
          var finished;

          finished = () => {
            var counts;
            counts = this._states.counts;
            return counts[0] + counts[1] + counts[2] + counts[3] === at;
          };

          return new this.Promise((resolve, reject) => {
            if (finished()) {
              return resolve();
            } else {
              return this.on("done", () => {
                if (finished()) {
                  this.removeAllListeners("done");
                  return resolve();
                }
              });
            }
          });
        };

        done = options.dropWaitingJobs ? (this._run = function (index, next) {
          return next.doDrop({
            message: options.dropErrorMessage
          });
        }, this._drainOne = () => {
          return this.Promise.resolve(null);
        }, this._registerLock.schedule(() => {
          return this._submitLock.schedule(() => {
            var k, ref, v;
            ref = this._scheduled;

            for (k in ref) {
              v = ref[k];

              if (this.jobStatus(v.job.options.id) === "RUNNING") {
                clearTimeout(v.timeout);
                clearTimeout(v.expiration);
                v.job.doDrop({
                  message: options.dropErrorMessage
                });
              }
            }

            this._dropAllQueued(options.dropErrorMessage);

            return waitForExecuting(0);
          });
        })) : this.schedule({
          priority: NUM_PRIORITIES$1 - 1,
          weight: 0
        }, () => {
          return waitForExecuting(1);
        });

        this._receive = function (job) {
          return job._reject(new Bottleneck.prototype.BottleneckError(options.enqueueErrorMessage));
        };

        this.stop = () => {
          return this.Promise.reject(new Bottleneck.prototype.BottleneckError("stop() has already been called"));
        };

        return done;
      }

      _addToQueue(job) {
        var _this2 = this;

        return _asyncToGenerator$8(function* () {
          var args, blocked, error, options, reachedHWM, shifted, strategy;
          args = job.args;
          options = job.options;

          try {
            var _ref2 = yield _this2._store.__submit__(_this2.queued(), options.weight);

            reachedHWM = _ref2.reachedHWM;
            blocked = _ref2.blocked;
            strategy = _ref2.strategy;
          } catch (error1) {
            error = error1;

            _this2.Events.trigger("debug", `Could not queue ${options.id}`, {
              args,
              options,
              error
            });

            job.doDrop({
              error
            });
            return false;
          }

          if (blocked) {
            job.doDrop();
            return true;
          } else if (reachedHWM) {
            shifted = strategy === Bottleneck.prototype.strategy.LEAK ? _this2._queues.shiftLastFrom(options.priority) : strategy === Bottleneck.prototype.strategy.OVERFLOW_PRIORITY ? _this2._queues.shiftLastFrom(options.priority + 1) : strategy === Bottleneck.prototype.strategy.OVERFLOW ? job : void 0;

            if (shifted != null) {
              shifted.doDrop();
            }

            if (shifted == null || strategy === Bottleneck.prototype.strategy.OVERFLOW) {
              if (shifted == null) {
                job.doDrop();
              }

              return reachedHWM;
            }
          }

          job.doQueue(reachedHWM, blocked);

          _this2._queues.push(job);

          yield _this2._drainAll();
          return reachedHWM;
        })();
      }

      _receive(job) {
        if (this._states.jobStatus(job.options.id) != null) {
          job._reject(new Bottleneck.prototype.BottleneckError(`A job with the same id already exists (id=${job.options.id})`));

          return false;
        } else {
          job.doReceive();
          return this._submitLock.schedule(this._addToQueue, job);
        }
      }

      submit(...args) {
        var cb, fn, job, options, ref, ref1, task;

        if (typeof args[0] === "function") {
          var _ref3, _ref4, _splice$call, _splice$call2;

          ref = args, (_ref3 = ref, _ref4 = _toArray(_ref3), fn = _ref4[0], args = _ref4.slice(1), _ref3), (_splice$call = splice.call(args, -1), _splice$call2 = _slicedToArray$3(_splice$call, 1), cb = _splice$call2[0], _splice$call);
          options = parser$8.load({}, this.jobDefaults);
        } else {
          var _ref5, _ref6, _splice$call3, _splice$call4;

          ref1 = args, (_ref5 = ref1, _ref6 = _toArray(_ref5), options = _ref6[0], fn = _ref6[1], args = _ref6.slice(2), _ref5), (_splice$call3 = splice.call(args, -1), _splice$call4 = _slicedToArray$3(_splice$call3, 1), cb = _splice$call4[0], _splice$call3);
          options = parser$8.load(options, this.jobDefaults);
        }

        task = (...args) => {
          return new this.Promise(function (resolve, reject) {
            return fn(...args, function (...args) {
              return (args[0] != null ? reject : resolve)(args);
            });
          });
        };

        job = new Job$1(task, args, options, this.jobDefaults, this.rejectOnDrop, this.Events, this._states, this.Promise);
        job.promise.then(function (args) {
          return typeof cb === "function" ? cb(...args) : void 0;
        }).catch(function (args) {
          if (Array.isArray(args)) {
            return typeof cb === "function" ? cb(...args) : void 0;
          } else {
            return typeof cb === "function" ? cb(args) : void 0;
          }
        });
        return this._receive(job);
      }

      schedule(...args) {
        var job, options, task;

        if (typeof args[0] === "function") {
          var _args = args;

          var _args2 = _toArray(_args);

          task = _args2[0];
          args = _args2.slice(1);
          options = {};
        } else {
          var _args3 = args;

          var _args4 = _toArray(_args3);

          options = _args4[0];
          task = _args4[1];
          args = _args4.slice(2);
        }

        job = new Job$1(task, args, options, this.jobDefaults, this.rejectOnDrop, this.Events, this._states, this.Promise);

        this._receive(job);

        return job.promise;
      }

      wrap(fn) {
        var schedule, wrapped;
        schedule = this.schedule.bind(this);

        wrapped = function wrapped(...args) {
          return schedule(fn.bind(this), ...args);
        };

        wrapped.withOptions = function (options, ...args) {
          return schedule(options, fn, ...args);
        };

        return wrapped;
      }

      updateSettings(options = {}) {
        var _this3 = this;

        return _asyncToGenerator$8(function* () {
          yield _this3._store.__updateSettings__(parser$8.overwrite(options, _this3.storeDefaults));
          parser$8.overwrite(options, _this3.instanceDefaults, _this3);
          return _this3;
        })();
      }

      currentReservoir() {
        return this._store.__currentReservoir__();
      }

      incrementReservoir(incr = 0) {
        return this._store.__incrementReservoir__(incr);
      }

    }
    Bottleneck.default = Bottleneck;
    Bottleneck.Events = Events$6;
    Bottleneck.version = Bottleneck.prototype.version = require$$8.version;
    Bottleneck.strategy = Bottleneck.prototype.strategy = {
      LEAK: 1,
      OVERFLOW: 2,
      OVERFLOW_PRIORITY: 4,
      BLOCK: 3
    };
    Bottleneck.BottleneckError = Bottleneck.prototype.BottleneckError = BottleneckError_1;
    Bottleneck.Group = Bottleneck.prototype.Group = Group_1;
    Bottleneck.RedisConnection = Bottleneck.prototype.RedisConnection = RedisConnection_1;
    Bottleneck.IORedisConnection = Bottleneck.prototype.IORedisConnection = IORedisConnection_1;
    Bottleneck.Batcher = Bottleneck.prototype.Batcher = Batcher_1;
    Bottleneck.prototype.jobDefaults = {
      priority: DEFAULT_PRIORITY$1,
      weight: 1,
      expiration: null,
      id: "<no-id>"
    };
    Bottleneck.prototype.storeDefaults = {
      maxConcurrent: null,
      minTime: 0,
      highWater: null,
      strategy: Bottleneck.prototype.strategy.LEAK,
      penalty: null,
      reservoir: null,
      reservoirRefreshInterval: null,
      reservoirRefreshAmount: null,
      reservoirIncreaseInterval: null,
      reservoirIncreaseAmount: null,
      reservoirIncreaseMaximum: null
    };
    Bottleneck.prototype.localStoreDefaults = {
      Promise: Promise,
      timeout: null,
      heartbeatInterval: 250
    };
    Bottleneck.prototype.redisStoreDefaults = {
      Promise: Promise,
      timeout: null,
      heartbeatInterval: 5000,
      clientTimeout: 10000,
      Redis: null,
      clientOptions: {},
      clusterNodes: null,
      clearDatastore: false,
      connection: null
    };
    Bottleneck.prototype.instanceDefaults = {
      datastore: "local",
      connection: null,
      id: "<no-id>",
      rejectOnDrop: true,
      trackDoneStatus: false,
      Promise: Promise
    };
    Bottleneck.prototype.stopDefaults = {
      enqueueErrorMessage: "This limiter has been stopped and cannot accept new jobs.",
      dropWaitingJobs: true,
      dropErrorMessage: "This limiter has been stopped."
    };
    return Bottleneck;
  }.call(void 0);

  var Bottleneck_1 = Bottleneck;

  var lib = Bottleneck_1;

  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;

  var Format = {
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986'
  };

  var formats = {
      'default': Format.RFC3986,
      formatters: {
          RFC1738: function (value) {
              return replace.call(value, percentTwenties, '+');
          },
          RFC3986: function (value) {
              return String(value);
          }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
  };

  var has = Object.prototype.hasOwnProperty;
  var isArray = Array.isArray;

  var hexTable = (function () {
      var array = [];
      for (var i = 0; i < 256; ++i) {
          array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
      }

      return array;
  }());

  var compactQueue = function compactQueue(queue) {
      while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];

          if (isArray(obj)) {
              var compacted = [];

              for (var j = 0; j < obj.length; ++j) {
                  if (typeof obj[j] !== 'undefined') {
                      compacted.push(obj[j]);
                  }
              }

              item.obj[item.prop] = compacted;
          }
      }
  };

  var arrayToObject = function arrayToObject(source, options) {
      var obj = options && options.plainObjects ? Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== 'undefined') {
              obj[i] = source[i];
          }
      }

      return obj;
  };

  var merge = function merge(target, source, options) {
      /* eslint no-param-reassign: 0 */
      if (!source) {
          return target;
      }

      if (typeof source !== 'object') {
          if (isArray(target)) {
              target.push(source);
          } else if (target && typeof target === 'object') {
              if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                  target[source] = true;
              }
          } else {
              return [target, source];
          }

          return target;
      }

      if (!target || typeof target !== 'object') {
          return [target].concat(source);
      }

      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
          mergeTarget = arrayToObject(target, options);
      }

      if (isArray(target) && isArray(source)) {
          source.forEach(function (item, i) {
              if (has.call(target, i)) {
                  var targetItem = target[i];
                  if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                      target[i] = merge(targetItem, item, options);
                  } else {
                      target.push(item);
                  }
              } else {
                  target[i] = item;
              }
          });
          return target;
      }

      return Object.keys(source).reduce(function (acc, key) {
          var value = source[key];

          if (has.call(acc, key)) {
              acc[key] = merge(acc[key], value, options);
          } else {
              acc[key] = value;
          }
          return acc;
      }, mergeTarget);
  };

  var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function (acc, key) {
          acc[key] = source[key];
          return acc;
      }, target);
  };

  var decode = function (str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, ' ');
      if (charset === 'iso-8859-1') {
          // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      // utf-8
      try {
          return decodeURIComponent(strWithoutPlus);
      } catch (e) {
          return strWithoutPlus;
      }
  };

  var encode = function encode(str, defaultEncoder, charset, kind, format) {
      // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
      // It has been adapted here for stricter adherence to RFC 3986
      if (str.length === 0) {
          return str;
      }

      var string = str;
      if (typeof str === 'symbol') {
          string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== 'string') {
          string = String(str);
      }

      if (charset === 'iso-8859-1') {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
              return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
          });
      }

      var out = '';
      for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);

          if (
              c === 0x2D // -
              || c === 0x2E // .
              || c === 0x5F // _
              || c === 0x7E // ~
              || (c >= 0x30 && c <= 0x39) // 0-9
              || (c >= 0x41 && c <= 0x5A) // a-z
              || (c >= 0x61 && c <= 0x7A) // A-Z
              || (format === formats.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
          ) {
              out += string.charAt(i);
              continue;
          }

          if (c < 0x80) {
              out = out + hexTable[c];
              continue;
          }

          if (c < 0x800) {
              out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          if (c < 0xD800 || c >= 0xE000) {
              out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          i += 1;
          c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
          out += hexTable[0xF0 | (c >> 18)]
              + hexTable[0x80 | ((c >> 12) & 0x3F)]
              + hexTable[0x80 | ((c >> 6) & 0x3F)]
              + hexTable[0x80 | (c & 0x3F)];
      }

      return out;
  };

  var compact = function compact(value) {
      var queue = [{ obj: { o: value }, prop: 'o' }];
      var refs = [];

      for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];

          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
              var key = keys[j];
              var val = obj[key];
              if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                  queue.push({ obj: obj, prop: key });
                  refs.push(val);
              }
          }
      }

      compactQueue(queue);

      return value;
  };

  var isRegExp = function isRegExp(obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
  };

  var isBuffer = function isBuffer(obj) {
      if (!obj || typeof obj !== 'object') {
          return false;
      }

      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };

  var combine = function combine(a, b) {
      return [].concat(a, b);
  };

  var maybeMap = function maybeMap(val, fn) {
      if (isArray(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) {
              mapped.push(fn(val[i]));
          }
          return mapped;
      }
      return fn(val);
  };

  var utils = {
      arrayToObject: arrayToObject,
      assign: assign,
      combine: combine,
      compact: compact,
      decode: decode,
      encode: encode,
      isBuffer: isBuffer,
      isRegExp: isRegExp,
      maybeMap: maybeMap,
      merge: merge
  };

  var has$1 = Object.prototype.hasOwnProperty;

  var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
          return prefix + '[]';
      },
      comma: 'comma',
      indices: function indices(prefix, key) {
          return prefix + '[' + key + ']';
      },
      repeat: function repeat(prefix) {
          return prefix;
      }
  };

  var isArray$1 = Array.isArray;
  var push = Array.prototype.push;
  var pushToArray = function (arr, valueOrArray) {
      push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
  };

  var toISO = Date.prototype.toISOString;

  var defaultFormat = formats['default'];
  var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: 'utf-8',
      charsetSentinel: false,
      delimiter: '&',
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
          return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
  };

  var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
      return typeof v === 'string'
          || typeof v === 'number'
          || typeof v === 'boolean'
          || typeof v === 'symbol'
          || typeof v === 'bigint';
  };

  var stringify = function stringify(
      object,
      prefix,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      format,
      formatter,
      encodeValuesOnly,
      charset
  ) {
      var obj = object;
      if (typeof filter === 'function') {
          obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
          obj = serializeDate(obj);
      } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
          obj = utils.maybeMap(obj, function (value) {
              if (value instanceof Date) {
                  return serializeDate(value);
              }
              return value;
          });
      }

      if (obj === null) {
          if (strictNullHandling) {
              return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
          }

          obj = '';
      }

      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
          if (encoder) {
              var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
              return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
          }
          return [formatter(prefix) + '=' + formatter(String(obj))];
      }

      var values = [];

      if (typeof obj === 'undefined') {
          return values;
      }

      var objKeys;
      if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
          // we need to join elements in
          objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : undefined }];
      } else if (isArray$1(filter)) {
          objKeys = filter;
      } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
          var value = typeof key === 'object' && key.value !== undefined ? key.value : obj[key];

          if (skipNulls && value === null) {
              continue;
          }

          var keyPrefix = isArray$1(obj)
              ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
              : prefix + (allowDots ? '.' + key : '[' + key + ']');

          pushToArray(values, stringify(
              value,
              keyPrefix,
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encoder,
              filter,
              sort,
              allowDots,
              serializeDate,
              format,
              formatter,
              encodeValuesOnly,
              charset
          ));
      }

      return values;
  };

  var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
      if (!opts) {
          return defaults;
      }

      if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
          throw new TypeError('Encoder has to be a function.');
      }

      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }

      var format = formats['default'];
      if (typeof opts.format !== 'undefined') {
          if (!has$1.call(formats.formatters, opts.format)) {
              throw new TypeError('Unknown format option provided.');
          }
          format = opts.format;
      }
      var formatter = formats.formatters[format];

      var filter = defaults.filter;
      if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
          filter = opts.filter;
      }

      return {
          addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
          allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
          delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
          encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
          encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
          filter: filter,
          format: format,
          formatter: formatter,
          serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
          skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
          sort: typeof opts.sort === 'function' ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
      };
  };

  var stringify_1 = function (object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);

      var objKeys;
      var filter;

      if (typeof options.filter === 'function') {
          filter = options.filter;
          obj = filter('', obj);
      } else if (isArray$1(options.filter)) {
          filter = options.filter;
          objKeys = filter;
      }

      var keys = [];

      if (typeof obj !== 'object' || obj === null) {
          return '';
      }

      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
      } else if (opts && 'indices' in opts) {
          arrayFormat = opts.indices ? 'indices' : 'repeat';
      } else {
          arrayFormat = 'indices';
      }

      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

      if (!objKeys) {
          objKeys = Object.keys(obj);
      }

      if (options.sort) {
          objKeys.sort(options.sort);
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (options.skipNulls && obj[key] === null) {
              continue;
          }
          pushToArray(keys, stringify(
              obj[key],
              key,
              generateArrayPrefix,
              options.strictNullHandling,
              options.skipNulls,
              options.encode ? options.encoder : null,
              options.filter,
              options.sort,
              options.allowDots,
              options.serializeDate,
              options.format,
              options.formatter,
              options.encodeValuesOnly,
              options.charset
          ));
      }

      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? '?' : '';

      if (options.charsetSentinel) {
          if (options.charset === 'iso-8859-1') {
              // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
              prefix += 'utf8=%26%2310003%3B&';
          } else {
              // encodeURIComponent('✓')
              prefix += 'utf8=%E2%9C%93&';
          }
      }

      return joined.length > 0 ? prefix + joined : '';
  };

  var has$2 = Object.prototype.hasOwnProperty;
  var isArray$2 = Array.isArray;

  var defaults$1 = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: 'utf-8',
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: '&',
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1000,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
  };

  var interpretNumericEntities = function (str) {
      return str.replace(/&#(\d+);/g, function ($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
      });
  };

  var parseArrayValue = function (val, options) {
      if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
          return val.split(',');
      }

      return val;
  };

  // This is what browsers will submit when the ✓ character occurs in an
  // application/x-www-form-urlencoded body and the encoding of the page containing
  // the form is iso-8859-1, or when the submitted form has an accept-charset
  // attribute of iso-8859-1. Presumably also with other charsets that do not contain
  // the ✓ character, such as us-ascii.
  var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

  // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
  var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

  var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
      var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1; // Keep track of where the utf8 sentinel was found
      var i;

      var charset = options.charset;
      if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
              if (parts[i].indexOf('utf8=') === 0) {
                  if (parts[i] === charsetSentinel) {
                      charset = 'utf-8';
                  } else if (parts[i] === isoSentinel) {
                      charset = 'iso-8859-1';
                  }
                  skipIndex = i;
                  i = parts.length; // The eslint settings do not allow break;
              }
          }
      }

      for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
              continue;
          }
          var part = parts[i];

          var bracketEqualsPos = part.indexOf(']=');
          var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

          var key, val;
          if (pos === -1) {
              key = options.decoder(part, defaults$1.decoder, charset, 'key');
              val = options.strictNullHandling ? null : '';
          } else {
              key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
              val = utils.maybeMap(
                  parseArrayValue(part.slice(pos + 1), options),
                  function (encodedVal) {
                      return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
                  }
              );
          }

          if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
              val = interpretNumericEntities(val);
          }

          if (part.indexOf('[]=') > -1) {
              val = isArray$2(val) ? [val] : val;
          }

          if (has$2.call(obj, key)) {
              obj[key] = utils.combine(obj[key], val);
          } else {
              obj[key] = val;
          }
      }

      return obj;
  };

  var parseObject = function (chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);

      for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];

          if (root === '[]' && options.parseArrays) {
              obj = [].concat(leaf);
          } else {
              obj = options.plainObjects ? Object.create(null) : {};
              var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
              var index = parseInt(cleanRoot, 10);
              if (!options.parseArrays && cleanRoot === '') {
                  obj = { 0: leaf };
              } else if (
                  !isNaN(index)
                  && root !== cleanRoot
                  && String(index) === cleanRoot
                  && index >= 0
                  && (options.parseArrays && index <= options.arrayLimit)
              ) {
                  obj = [];
                  obj[index] = leaf;
              } else {
                  obj[cleanRoot] = leaf;
              }
          }

          leaf = obj;
      }

      return leaf;
  };

  var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
          return;
      }

      // Transform dot notation to bracket notation
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

      // The regex chunks

      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;

      // Get the parent

      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;

      // Stash the parent if it exists

      var keys = [];
      if (parent) {
          // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
          if (!options.plainObjects && has$2.call(Object.prototype, parent)) {
              if (!options.allowPrototypes) {
                  return;
              }
          }

          keys.push(parent);
      }

      // Loop through children appending to the array until we hit depth

      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has$2.call(Object.prototype, segment[1].slice(1, -1))) {
              if (!options.allowPrototypes) {
                  return;
              }
          }
          keys.push(segment[1]);
      }

      // If there's a remainder, just add whatever is left

      if (segment) {
          keys.push('[' + key.slice(segment.index) + ']');
      }

      return parseObject(keys, val, options, valuesParsed);
  };

  var normalizeParseOptions = function normalizeParseOptions(opts) {
      if (!opts) {
          return defaults$1;
      }

      if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
          throw new TypeError('Decoder has to be a function.');
      }

      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }
      var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;

      return {
          allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
          allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
          arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
          comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
          decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
          delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
          // eslint-disable-next-line no-implicit-coercion, no-extra-parens
          depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$1.depth,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
      };
  };

  var parse = function (str, opts) {
      var options = normalizeParseOptions(opts);

      if (str === '' || str === null || typeof str === 'undefined') {
          return options.plainObjects ? Object.create(null) : {};
      }

      var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {};

      // Iterate over the keys and setup the new object

      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
          obj = utils.merge(obj, newObj, options);
      }

      return utils.compact(obj);
  };

  var lib$1 = {
      formats: formats,
      parse: parse,
      stringify: stringify_1
  };

  function unfetch_module(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return {ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t;}),t(a());},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null);})}

  var unfetch_module$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': unfetch_module
  });

  var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(unfetch_module$1);

  var browser = self.fetch || (self.fetch = require$$0$1.default || require$$0$1);

  var urls = {
      rest: {
          account: 'https://api.alpaca.markets/v2',
          market_data: 'https://data.alpaca.markets/v2',
      },
      websocket: {
          account: 'wss://api.alpaca.markets/stream',
          account_paper: 'wss://paper-api.alpaca.markets/stream',
          market_data: (source) => `wss://stream.data.alpaca.markets/v2/${source}`,
      },
  };

  function account(rawAccount) {
      if (!rawAccount) {
          return undefined;
      }
      try {
          return {
              ...rawAccount,
              raw: () => rawAccount,
              buying_power: number(rawAccount.buying_power),
              regt_buying_power: number(rawAccount.regt_buying_power),
              daytrading_buying_power: number(rawAccount.daytrading_buying_power),
              cash: number(rawAccount.cash),
              created_at: new Date(rawAccount.created_at),
              portfolio_value: number(rawAccount.portfolio_value),
              multiplier: number(rawAccount.multiplier),
              equity: number(rawAccount.equity),
              last_equity: number(rawAccount.last_equity),
              long_market_value: number(rawAccount.long_market_value),
              short_market_value: number(rawAccount.short_market_value),
              initial_margin: number(rawAccount.initial_margin),
              maintenance_margin: number(rawAccount.maintenance_margin),
              last_maintenance_margin: number(rawAccount.last_maintenance_margin),
              sma: number(rawAccount.sma),
              status: rawAccount.status,
          };
      }
      catch (err) {
          throw new Error(`Account parsing failed. ${err.message}`);
      }
  }
  function clock(rawClock) {
      if (!rawClock) {
          return undefined;
      }
      try {
          return {
              raw: () => rawClock,
              timestamp: new Date(rawClock.timestamp),
              is_open: rawClock.is_open,
              next_open: new Date(rawClock.next_open),
              next_close: new Date(rawClock.next_close),
          };
      }
      catch (err) {
          throw new Error(`Order parsing failed. ${err.message}`);
      }
  }
  function order(rawOrder) {
      if (!rawOrder) {
          return undefined;
      }
      try {
          return {
              ...rawOrder,
              raw: () => rawOrder,
              created_at: new Date(rawOrder.created_at),
              updated_at: new Date(rawOrder.updated_at),
              submitted_at: new Date(rawOrder.submitted_at),
              filled_at: new Date(rawOrder.filled_at),
              expired_at: new Date(rawOrder.expired_at),
              canceled_at: new Date(rawOrder.canceled_at),
              failed_at: new Date(rawOrder.failed_at),
              replaced_at: new Date(rawOrder.replaced_at),
              qty: number(rawOrder.qty),
              filled_qty: number(rawOrder.filled_qty),
              type: rawOrder.type,
              side: rawOrder.side,
              time_in_force: rawOrder.time_in_force,
              limit_price: number(rawOrder.limit_price),
              stop_price: number(rawOrder.stop_price),
              filled_avg_price: number(rawOrder.filled_avg_price),
              status: rawOrder.status,
              legs: orders(rawOrder.legs),
              trail_price: number(rawOrder.trail_price),
              trail_percent: number(rawOrder.trail_percent),
              hwm: number(rawOrder.hwm),
          };
      }
      catch (err) {
          throw new Error(`Order parsing failed. ${err.message}`);
      }
  }
  function orders(rawOrders) {
      return rawOrders ? rawOrders.map((value) => order(value)) : undefined;
  }
  function canceled_order(input) {
      if (!input) {
          return undefined;
      }
      let order = input.body;
      delete input.body;
      try {
          return {
              ...input,
              order: {
                  ...order,
                  raw: () => order,
                  created_at: new Date(order.created_at),
                  updated_at: new Date(order.updated_at),
                  submitted_at: new Date(order.submitted_at),
                  filled_at: new Date(order.filled_at),
                  expired_at: new Date(order.expired_at),
                  canceled_at: new Date(order.canceled_at),
                  failed_at: new Date(order.failed_at),
                  replaced_at: new Date(order.replaced_at),
                  qty: number(order.qty),
                  filled_qty: number(order.filled_qty),
                  type: order.type,
                  side: order.side,
                  time_in_force: order.time_in_force,
                  limit_price: number(order.limit_price),
                  stop_price: number(order.stop_price),
                  filled_avg_price: number(order.filled_avg_price),
                  status: order.status,
                  legs: orders(order.legs),
                  trail_price: number(order.trail_price),
                  trail_percent: number(order.trail_percent),
                  hwm: number(order.hwm),
              },
          };
      }
      catch (err) {
          throw new Error(`Order parsing failed. ${err.message}`);
      }
  }
  function canceled_orders(rawOrderCancelations) {
      return rawOrderCancelations
          ? rawOrderCancelations.map((value) => canceled_order(value))
          : undefined;
  }
  function position(rawPosition) {
      if (!rawPosition) {
          return undefined;
      }
      try {
          return {
              ...rawPosition,
              raw: () => rawPosition,
              avg_entry_price: number(rawPosition.avg_entry_price),
              qty: number(rawPosition.qty),
              side: rawPosition.side,
              market_value: number(rawPosition.market_value),
              cost_basis: number(rawPosition.cost_basis),
              unrealized_pl: number(rawPosition.unrealized_pl),
              unrealized_plpc: number(rawPosition.unrealized_plpc),
              unrealized_intraday_pl: number(rawPosition.unrealized_intraday_pl),
              unrealized_intraday_plpc: number(rawPosition.unrealized_intraday_plpc),
              current_price: number(rawPosition.current_price),
              lastday_price: number(rawPosition.lastday_price),
              change_today: number(rawPosition.change_today),
          };
      }
      catch (err) {
          throw new Error(`Position parsing failed. ${err.message}`);
      }
  }
  function positions(rawPositions) {
      return rawPositions ? rawPositions.map((pos) => position(pos)) : undefined;
  }
  function tradeActivity(rawTradeActivity) {
      if (!rawTradeActivity) {
          return undefined;
      }
      try {
          return {
              ...rawTradeActivity,
              raw: () => rawTradeActivity,
              cum_qty: number(rawTradeActivity.cum_qty),
              leaves_qty: number(rawTradeActivity.leaves_qty),
              price: number(rawTradeActivity.price),
              qty: number(rawTradeActivity.qty),
              side: rawTradeActivity.side,
              type: rawTradeActivity.type,
          };
      }
      catch (err) {
          throw new Error(`TradeActivity parsing failed. ${err.message}`);
      }
  }
  function nonTradeActivity(rawNonTradeActivity) {
      if (!rawNonTradeActivity) {
          return undefined;
      }
      try {
          return {
              ...rawNonTradeActivity,
              raw: () => rawNonTradeActivity,
              net_amount: number(rawNonTradeActivity.net_amount),
              qty: number(rawNonTradeActivity.qty),
              per_share_amount: number(rawNonTradeActivity.per_share_amount),
          };
      }
      catch (err) {
          throw new Error(`NonTradeActivity parsing failed. ${err.message}`);
      }
  }
  function activities(rawActivities) {
      if (!rawActivities) {
          return undefined;
      }
      try {
          return rawActivities.map((rawActivity) => rawActivity.activity_type === 'FILL'
              ? tradeActivity(rawActivity)
              : nonTradeActivity(rawActivity));
      }
      catch (err) {
          throw new Error(`Activity parsing failed. ${err.message}`);
      }
  }
  function pageOfTrades(page) {
      if (!page) {
          return undefined;
      }
      try {
          return {
              raw: () => page,
              trades: page.trades.map((trade) => ({
                  raw: () => trade,
                  ...trade,
                  t: new Date(trade.t),
              })),
              symbol: page.symbol,
              next_page_token: page.next_page_token,
          };
      }
      catch (err) {
          throw new Error(`PageOfTrades parsing failed "${err.message}"`);
      }
  }
  function pageOfQuotes(page) {
      if (!page) {
          return undefined;
      }
      try {
          return {
              raw: () => page,
              quotes: page.quotes.map((quote) => ({
                  raw: () => quote,
                  ...quote,
                  t: new Date(quote.t),
              })),
              symbol: page.symbol,
              next_page_token: page.next_page_token,
          };
      }
      catch (err) {
          throw new Error(`PageOfTrades parsing failed "${err.message}"`);
      }
  }
  function pageOfBars(page) {
      if (!page) {
          return undefined;
      }
      try {
          return {
              raw: () => page,
              bars: page.bars.map((bar) => ({
                  raw: () => bar,
                  ...bar,
                  t: new Date(bar.t),
              })),
              symbol: page.symbol,
              next_page_token: page.next_page_token,
          };
      }
      catch (err) {
          throw new Error(`PageOfTrades parsing failed "${err.message}"`);
      }
  }
  function number(numStr) {
      if (typeof numStr === 'undefined')
          return numStr;
      return parseFloat(numStr);
  }
  var parse$1 = {
      account,
      activities,
      clock,
      nonTradeActivity,
      order,
      orders,
      canceled_orders,
      position,
      positions,
      tradeActivity,
      pageOfTrades,
      pageOfQuotes,
      pageOfBars,
  };

  const unifetch = typeof fetch !== 'undefined' ? fetch : browser;
  class AlpacaClient {
      constructor(params) {
          this.params = params;
          this.limiter = new lib({
              reservoir: 200,
              reservoirRefreshAmount: 200,
              reservoirRefreshInterval: 60 * 1000,
              maxConcurrent: 1,
              minTime: 200,
          });
          if (!('paper' in params.credentials) &&
              !('key' in params.credentials && params.credentials.key.startsWith('A'))) {
              params.credentials['paper'] = true;
          }
          if ('access_token' in params.credentials &&
              ('key' in params.credentials || 'secret' in params.credentials)) {
              throw new Error("can't create client with both default and oauth credentials");
          }
      }
      async isAuthenticated() {
          try {
              await this.getAccount();
              return true;
          }
          catch {
              return false;
          }
      }
      async getAccount() {
          return parse$1.account(await this.request({
              method: 'GET',
              url: `${urls.rest.account}/account`,
          }));
      }
      async getOrder(params) {
          return parse$1.order(await this.request({
              method: 'GET',
              url: `${urls.rest.account}/orders/${params.order_id || params.client_order_id}`,
              data: { nested: params.nested },
          }));
      }
      async getOrders(params) {
          return parse$1.orders(await this.request({
              method: 'GET',
              url: `${urls.rest.account}/orders`,
              data: params,
          }));
      }
      async placeOrder(params) {
          return parse$1.order(await this.request({
              method: 'POST',
              url: `${urls.rest.account}/orders`,
              data: params,
          }));
      }
      async replaceOrder(params) {
          return parse$1.order(await this.request({
              method: 'PATCH',
              url: `${urls.rest.account}/orders/${params.order_id}`,
              data: params,
          }));
      }
      cancelOrder(params) {
          return this.request({
              method: 'DELETE',
              url: `${urls.rest.account}/orders/${params.order_id}`,
          });
      }
      async cancelOrders() {
          return parse$1.canceled_orders(await this.request({
              method: 'DELETE',
              url: `${urls.rest.account}/orders`,
          }));
      }
      async getPosition(params) {
          return parse$1.position(await this.request({
              method: 'GET',
              url: `${urls.rest.account}/positions/${params.symbol}`,
          }));
      }
      async getPositions() {
          return parse$1.positions(await this.request({
              method: 'GET',
              url: `${urls.rest.account}/positions`,
          }));
      }
      async closePosition(params) {
          return parse$1.order(await this.request({
              method: 'DELETE',
              url: `${urls.rest.account}/positions/${params.symbol}`,
          }));
      }
      async closePositions() {
          return parse$1.orders(await this.request({
              method: 'DELETE',
              url: `${urls.rest.account}/positions`,
          }));
      }
      getAsset(params) {
          return this.request({
              method: 'GET',
              url: `${urls.rest.account}/assets/${params.asset_id_or_symbol}`,
          });
      }
      getAssets(params) {
          return this.request({
              method: 'GET',
              url: `${urls.rest.account}/assets`,
              data: params,
          });
      }
      getWatchlist(params) {
          return this.request({
              method: 'GET',
              url: `${urls.rest.account}/watchlists/${params.uuid}`,
          });
      }
      getWatchlists() {
          return this.request({
              method: 'GET',
              url: `${urls.rest.account}/watchlists`,
          });
      }
      createWatchlist(params) {
          return this.request({
              method: 'POST',
              url: `${urls.rest.account}/watchlists`,
              data: params,
          });
      }
      updateWatchlist(params) {
          return this.request({
              method: 'PUT',
              url: `${urls.rest.account}/watchlists/${params.uuid}`,
              data: params,
          });
      }
      addToWatchlist(params) {
          return this.request({
              method: 'POST',
              url: `${urls.rest.account}/watchlists/${params.uuid}`,
              data: params,
          });
      }
      removeFromWatchlist(params) {
          return this.request({
              method: 'DELETE',
              url: `${urls.rest.account}/watchlists/${params.uuid}/${params.symbol}`,
          });
      }
      deleteWatchlist(params) {
          return this.request({
              method: 'DELETE',
              url: `${urls.rest.account}/watchlists/${params.uuid}`,
          });
      }
      getCalendar(params) {
          return this.request({
              method: 'GET',
              url: `${urls.rest.account}/calendar`,
              data: params,
          });
      }
      async getClock() {
          return parse$1.clock(await this.request({
              method: 'GET',
              url: `${urls.rest.account}/clock`,
          }));
      }
      getAccountConfigurations() {
          return this.request({
              method: 'GET',
              url: `${urls.rest.account}/account/configurations`,
          });
      }
      updateAccountConfigurations(params) {
          return this.request({
              method: 'PATCH',
              url: `${urls.rest.account}/account/configurations`,
              data: params,
          });
      }
      async getAccountActivities(params) {
          if (params.activity_types && Array.isArray(params.activity_types)) {
              params.activity_types = params.activity_types.join(',');
          }
          return parse$1.activities(await this.request({
              method: 'GET',
              url: `${urls.rest.account}/account/activities${params.activity_type ? '/'.concat(params.activity_type) : ''}`,
              data: { ...params, activity_type: undefined },
          }));
      }
      getPortfolioHistory(params) {
          return this.request({
              method: 'GET',
              url: `${urls.rest.account}/account/portfolio/history`,
              data: params,
          });
      }
      async getTrades(params) {
          return parse$1.pageOfTrades(await this.request({
              method: 'GET',
              url: `${urls.rest.market_data}/stocks/${params.symbol}/trades`,
              data: { ...params, symbol: undefined },
          }));
      }
      async getQuotes(params) {
          return parse$1.pageOfQuotes(await this.request({
              method: 'GET',
              url: `${urls.rest.market_data}/stocks/${params.symbol}/quotes`,
              data: { ...params, symbol: undefined },
          }));
      }
      async getBars(params) {
          return parse$1.pageOfBars(await this.request({
              method: 'GET',
              url: `${urls.rest.market_data}/stocks/${params.symbol}/bars`,
              data: { ...params, symbol: undefined },
          }));
      }
      async request(params) {
          let headers = {};
          if ('access_token' in this.params.credentials) {
              headers['Authorization'] = `Bearer ${this.params.credentials.access_token}`;
          }
          else {
              headers['APCA-API-KEY-ID'] = this.params.credentials.key;
              headers['APCA-API-SECRET-KEY'] = this.params.credentials.secret;
              if (this.params.credentials.paper) {
                  params.url = params.url.replace('api.', 'paper-api.');
              }
          }
          for (let [key, value] of Object.entries(params.data)) {
              if (value instanceof Date) {
                  params.data[key] = value.toISOString();
              }
          }
          let query = '';
          if (params.data) {
              if (params.method != 'POST' && params.method != 'PATCH') {
                  query = '?'.concat(lib$1.stringify(params.data));
              }
          }
          const makeCall = () => unifetch(params.url.concat(query), {
              method: params.method,
              headers,
              body: JSON.stringify(params.data),
          }), func = this.params.rate_limit
              ? () => this.limiter.schedule(makeCall)
              : makeCall;
          let resp, result = {};
          try {
              resp = await func();
              if (!(params.isJson != undefined ? false : params.isJson)) {
                  return resp.ok;
              }
              result = await resp.json();
          }
          catch (e) {
              console.error(e);
              throw result;
          }
          if ('code' in result || 'message' in result) {
              throw result;
          }
          return result;
      }
  }

  // https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

  var ws = null;

  if (typeof WebSocket !== 'undefined') {
    ws = WebSocket;
  } else if (typeof MozWebSocket !== 'undefined') {
    ws = MozWebSocket;
  } else if (typeof commonjsGlobal !== 'undefined') {
    ws = commonjsGlobal.WebSocket || commonjsGlobal.MozWebSocket;
  } else if (typeof window !== 'undefined') {
    ws = window.WebSocket || window.MozWebSocket;
  } else if (typeof self !== 'undefined') {
    ws = self.WebSocket || self.MozWebSocket;
  }

  var browser$1 = ws;

  var eventemitter3 = createCommonjsModule(function (module) {

  var has = Object.prototype.hasOwnProperty
    , prefix = '~';

  /**
   * Constructor to create a storage for our `EE` objects.
   * An `Events` instance is a plain object whose properties are event names.
   *
   * @constructor
   * @private
   */
  function Events() {}

  //
  // We try to not inherit from `Object.prototype`. In some engines creating an
  // instance in this way is faster than calling `Object.create(null)` directly.
  // If `Object.create(null)` is not supported we prefix the event names with a
  // character to make sure that the built-in object properties are not
  // overridden or used as an attack vector.
  //
  if (Object.create) {
    Events.prototype = Object.create(null);

    //
    // This hack is needed because the `__proto__` property is still inherited in
    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    //
    if (!new Events().__proto__) prefix = false;
  }

  /**
   * Representation of a single event listener.
   *
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
   * @constructor
   * @private
   */
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }

  /**
   * Add a listener for a given event.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} once Specify if the listener is a one-time listener.
   * @returns {EventEmitter}
   * @private
   */
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== 'function') {
      throw new TypeError('The listener must be a function');
    }

    var listener = new EE(fn, context || emitter, once)
      , evt = prefix ? prefix + event : event;

    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [emitter._events[evt], listener];

    return emitter;
  }

  /**
   * Clear event by name.
   *
   * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
   * @param {(String|Symbol)} evt The Event name.
   * @private
   */
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
  }

  /**
   * Minimal `EventEmitter` interface that is molded against the Node.js
   * `EventEmitter` interface.
   *
   * @constructor
   * @public
   */
  function EventEmitter() {
    this._events = new Events();
    this._eventsCount = 0;
  }

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @public
   */
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = []
      , events
      , name;

    if (this._eventsCount === 0) return names;

    for (name in (events = this._events)) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }

    return names;
  };

  /**
   * Return the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Array} The registered listeners.
   * @public
   */
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event
      , handlers = this._events[evt];

    if (!handlers) return [];
    if (handlers.fn) return [handlers.fn];

    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }

    return ee;
  };

  /**
   * Return the number of listeners listening to a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Number} The number of listeners.
   * @public
   */
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event
      , listeners = this._events[evt];

    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
  };

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @public
   */
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;

    if (!this._events[evt]) return false;

    var listeners = this._events[evt]
      , len = arguments.length
      , args
      , i;

    if (listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

      switch (len) {
        case 1: return listeners.fn.call(listeners.context), true;
        case 2: return listeners.fn.call(listeners.context, a1), true;
        case 3: return listeners.fn.call(listeners.context, a1, a2), true;
        case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }

      for (i = 1, args = new Array(len -1); i < len; i++) {
        args[i - 1] = arguments[i];
      }

      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length
        , j;

      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

        switch (len) {
          case 1: listeners[i].fn.call(listeners[i].context); break;
          case 2: listeners[i].fn.call(listeners[i].context, a1); break;
          case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
          case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
          default:
            if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
              args[j - 1] = arguments[j];
            }

            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }

    return true;
  };

  /**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };

  /**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };

  /**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;

    if (!this._events[evt]) return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }

    var listeners = this._events[evt];

    if (listeners.fn) {
      if (
        listeners.fn === fn &&
        (!once || listeners.once) &&
        (!context || listeners.context === context)
      ) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (
          listeners[i].fn !== fn ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i]);
        }
      }

      //
      // Reset the array, or remove it completely if we have no more listeners.
      //
      if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
      else clearEvent(this, evt);
    }

    return this;
  };

  /**
   * Remove all listeners, or those of the specified event.
   *
   * @param {(String|Symbol)} [event] The event name.
   * @returns {EventEmitter} `this`.
   * @public
   */
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;

    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt]) clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }

    return this;
  };

  //
  // Alias methods names because people roll like that.
  //
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  //
  // Expose the prefix.
  //
  EventEmitter.prefixed = prefix;

  //
  // Allow `EventEmitter` to be imported as module namespace.
  //
  EventEmitter.EventEmitter = EventEmitter;

  //
  // Expose the module.
  //
  {
    module.exports = EventEmitter;
  }
  });

  class AlpacaStream extends eventemitter3 {
      constructor(params) {
          super();
          this.params = params;
          this.subscriptions = [];
          this.authenticated = false;
          switch (params.stream) {
              case 'account':
                  this.host = params.credentials.key.startsWith('PK')
                      ? urls.websocket.account_paper
                      : urls.websocket.account;
                  break;
              case 'market_data':
                  break;
              default:
                  this.host = 'unknown';
          }
          this.connection = new browser$1(this.host);
          this.connection.onopen = () => {
              if (!this.authenticated) {
                  this.connection.send(JSON.stringify({
                      action: 'authenticate',
                      data: {
                          key_id: params.credentials.key,
                          secret_key: params.credentials.secret,
                      },
                  }));
              }
              this.emit('open', this);
          };
          this.connection.onclose = () => this.emit('close', this);
          this.connection.onmessage = (message) => {
              const object = JSON.parse(message.data);
              if ('stream' in object && object.stream == 'authorization') {
                  if (object.data.status == 'authorized') {
                      this.authenticated = true;
                      this.emit('authenticated', this);
                      console.log('Connected to the websocket.');
                  }
                  else {
                      this.connection.close();
                      throw new Error('There was an error in authorizing your websocket connection. Object received: ' +
                          JSON.stringify(object, null, 2));
                  }
              }
              this.emit('message', object);
              if ('stream' in object) {
                  const x = {
                      trade_updates: 'trade_updates',
                      account_updates: 'account_updates',
                      T: 'trade',
                      Q: 'quote',
                      AM: 'aggregate_minute',
                  };
                  this.emit(x[object.stream.split('.')[0]], object.data);
              }
          };
          this.connection.onerror = (err) => {
              this.emit('error', err);
          };
      }
      on(event, listener) {
          return super.on(event, listener);
      }
      send(message) {
          if (!this.authenticated) {
              throw new Error("You can't send a message until you are authenticated!");
          }
          if (typeof message == 'object') {
              message = JSON.stringify(message);
          }
          this.connection.send(message);
          return this;
      }
      subscribe(channels) {
          this.subscriptions.push(...channels);
          return this.send(JSON.stringify({
              action: 'listen',
              data: {
                  streams: channels,
              },
          }));
      }
      unsubscribe(channels) {
          for (let i = 0, ln = this.subscriptions.length; i < ln; i++) {
              if (channels.includes(this.subscriptions[i])) {
                  this.subscriptions.splice(i, 1);
              }
          }
          return this.send(JSON.stringify({
              action: 'unlisten',
              data: {
                  streams: channels,
              },
          }));
      }
  }

  var index = {
      AlpacaClient: AlpacaClient,
      AlpacaStream: AlpacaStream,
  };

  exports.AlpacaClient = AlpacaClient;
  exports.AlpacaStream = AlpacaStream;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=alpaca.browser.js.map
