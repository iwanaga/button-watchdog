'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var buttonCtrlStub = {
  index: 'buttonCtrl.index',
  show: 'buttonCtrl.show',
  create: 'buttonCtrl.create',
  upsert: 'buttonCtrl.upsert',
  patch: 'buttonCtrl.patch',
  destroy: 'buttonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var buttonIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './button.controller': buttonCtrlStub
});

describe('Button API Router:', function() {
  it('should return an express router instance', function() {
    expect(buttonIndex).to.equal(routerStub);
  });

  describe('GET /api/buttons', function() {
    it('should route to button.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'buttonCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/buttons/:id', function() {
    it('should route to button.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'buttonCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/buttons', function() {
    it('should route to button.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'buttonCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/buttons/:id', function() {
    it('should route to button.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'buttonCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/buttons/:id', function() {
    it('should route to button.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'buttonCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/buttons/:id', function() {
    it('should route to button.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'buttonCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
