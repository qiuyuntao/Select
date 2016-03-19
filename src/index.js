import './index.less';
import $ from 'jquery';

const Select = function(config) {
  this.defaultData = config.defaultData;
  this.callback = config.callback;
  this.data = config.data;
  this.position = config.position;

  this.container = $('.select-container');
  this.render();
  this._bindEvent();
}

Select.prototype = {
  render() {
    let self = this;
    let defaultData = self.defaultData.slice(0);

    self.tpl = getDefaultTpl(self.data, defaultData);
    self.container
      .html(self.tpl)
      .show()
      .css('top', self.position.top)
      .css('left', self.position.left);
  },

  _bindEvent() {
    let self = this;

    self.container.on( 'click', 'li', function(e) {
      let indexArr = $(e.target).attr('data-index').split('-');

      toggerCheck(e.target);
      let tpl = getDefaultTpl(self.data, indexArr);
      self.container.html(tpl);
    });
  },

  afterSelect(arr) {
    let self = this;
    let url;

    if (arr.length > 1) {
      url = './' + self.data[arr[0]]['value'] + '-' + self.data[arr[0]]['children'][arr[1]]['value'] + '.html';
    } else {
      url = './' + self.data[arr[0]]['value'] + '.html';
    }
    self.callback(url);
  },

  show() {
    this.container.show();
  },

  hide() {
    this.container.hide();
  }
}

export default Select;

function getDefaultTpl(data, defaultData) {
  let tpl;
  let children = data;
  let i = defaultData.shift();
  let arr = [];

  while (children) {
    if (i !== undefined) {
      tpl += getTpl(children, i, arr.join('-'));
      children = children[i]['children'];
      arr.push(i);
      i = defaultData.shift();
    } else {
      tpl += getTpl(children, i, arr.join('-'));
      children = undefined;
    }
  }
  tpl = tpl.replace(/undefined/g, '');
  return tpl;
}

// 得到模板数据
function getTpl(arr, checkNum, superId) {
  let tpl
  arr.map((d, i) => {
    let className = '';
    if (i == checkNum) className = 'check';
    if (superId) i = superId + '-' + i;
    tpl += '<li data-index="' + i + '" class="' + className + '">' + d.label + '</li>';
  });
  tpl = '<ul>' + tpl + '</ul>';

  return tpl;
}

// 点击后加入check
function toggerCheck(target) {
  let el = $(target).siblings();
  el.removeClass('check');
  $(target).addClass('check');
}
