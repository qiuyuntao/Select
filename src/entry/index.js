import $ from 'jquery';
import Select from '../index';

$(() => {
  let option = [{
    value: '2-init-h5',
    label: 'H5',
    children: [{
      value: 'alipay',
      label: '支付宝'
    }, {
      value: 'taobao',
      label: '手机淘宝'
    }]
  }, {
    value: '2-init-react',
    label: 'react',
    children: [{
      value: 'alipay',
      label: '支付宝-react'
    }, {
      value: 'taobao',
      label: '手机淘宝'
    }]
  }, {
    value: '2-init-rn',
    label: '富交互'
  }];
  let select = new Select({
    data: option,
    defaultData: [0, 1],
    callback: callback,
    position: {
      left: 10,
      top: 40
    }
  });
});

function callback() {
  console.log(123);
}
