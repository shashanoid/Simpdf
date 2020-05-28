import test from 'ava';
import ReactDOMServer from 'react-dom/server';
import renderHTML from '../index';

const renderTest = (t, reactEl, expectedHTML) => {
  t.is(ReactDOMServer.renderToStaticMarkup(reactEl), expectedHTML);
};

const singleElementTest = (t, html) => {
  renderTest(t, renderHTML(html), html);
};

test('returns a single React element rendering a provided HTML', t => {
  singleElementTest(t, '<ul>' +
                        '<li><a class="hello" href="https://github.com">hihi</a></li>' +
                        '<li><p><b>hello</b>world</p><p>react</p></li>' +
                      '</ul>');
});

test('returns an array of React elements if several nodes are provided', t => {
  const arr = renderHTML('<li><a class="hello" href="https://github.com">hihi</a></li>' +
                       '<li><p><b>hello</b>world</p><p>react</p></li>');
  t.is(arr.length, 2);
  renderTest(t, arr[0], '<li><a class="hello" href="https://github.com">hihi</a></li>');
  renderTest(t, arr[1], '<li><p><b>hello</b>world</p><p>react</p></li>');
});

test('parse the style attribute when specified as a string', t => {
  singleElementTest(t, '<ul>' +
                        '<li style="font-weight:bold;color:green"><a class="hello" href="https://github.com">hihi</a></li>' +
                        '<li style="font-style:italic"><p><b>hello</b>world</p><p>react</p></li>' +
                      '</ul>');
});

test('parse comment as undefined', t => {
  t.falsy(renderHTML('<!-- this is comment -->'));
});

test('parse base64 background url', t => {
  singleElementTest(t, '<div style="background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC);display:block;height:44px;margin:0 auto -44px;position:relative;top:-22px;width:44px"></div>');
});

test('parse script tag', t => {
  singleElementTest(t, `<p><script>document.write('test')</script></p>`);
});
