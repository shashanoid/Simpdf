import test from 'ava';
import styleParser from '../lib/style-parser';

test('single rule without semi colon', t => {
  t.deepEqual(styleParser('background-image: url(temp.png) no-repeat center'), {
    backgroundImage: 'url(temp.png) no-repeat center'
  });
});

test('single rule with semi colon', t => {
  t.deepEqual(styleParser('background-image: url(temp.png) no-repeat center;'), {
    backgroundImage: 'url(temp.png) no-repeat center'
  });
});

test('multiple rules without semi colon', t => {
  t.deepEqual(styleParser('background-image: url(temp.png) no-repeat center;max-width: 300px'), {
    backgroundImage: 'url(temp.png) no-repeat center',
    maxWidth: '300px'
  });
});

test('multiple rules with semi colon', t => {
  t.deepEqual(styleParser('background-image: url(temp.png) no-repeat center;width:200px;max-width: 300px;'), {
    backgroundImage: 'url(temp.png) no-repeat center',
    width: '200px',
    maxWidth: '300px'
  });
});

test('vender prefix', t => {
  t.deepEqual(styleParser('-webkit-transition: all; -moz-transition: all; -o-transition: all; -ms-transition: all'), {
    WebkitTransition: 'all',
    MozTransition: 'all',
    OTransition: 'all',
    msTransition: 'all'
  });
});
