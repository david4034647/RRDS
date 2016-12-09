import pick from 'lodash/pick';
import assign from 'object-assign';

export function getTimes() {
  return new Promise((resolve, reject) => {
    window.addEventListener('load', function onLoad() {
      window.removeEventListener('load', onLoad, false);

      requestAnimationFrame(() => {
        const performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
        if (typeof performance === 'undefined') {
          return reject();
        }

        const timing = performance.timing;
        if (!timing) {
          return reject();
        }

        const times = {};
        if (typeof timing.toJSON === 'function') {
          assign(times, timing.toJSON());
        } else {
          assign(times, pick(timing, [
            'navigationStart',
            'unloadEventStart',
            'unloadEventEnd',
            'redirectStart',
            'redirectEnd',
            'fetchStart',
            'domainLookupStart',
            'domainLookupEnd',
            'connectStart',
            'connectEnd',
            'secureConnectionStart',
            'requestStart',
            'responseStart',
            'responseEnd',
            'domLoading',
            'domInteractive',
            'domContentLoadedEventStart',
            'domContentLoadedEventEnd',
            'domComplete',
            'loadEventStart',
            'loadEventEnd'
          ]));
        }

        // 白屏时间
        times.fpt = timing.responseStart - timing.navigationStart;
        // todo 首屏时间
        //times.fst = 0;
        // 用户可操作时间
        times.drt = timing.domContentLoadedEventEnd - timing.navigationStart;
        // 总加载时间
        times.lt = timing.loadEventEnd - timing.navigationStart;
        // DNS查询耗时
        times.dns = timing.domainLookupEnd - timing.domainLookupStart;
        // TCP连接耗时
        times.tcp = timing.connectEnd - timing.connectStart;
        // 请求等待耗时
        times.wait = timing.responseStart - timing.requestStart;
        // 内容下载耗时
        times.download = timing.responseEnd - timing.responseStart;
        // 解析DOM树耗时
        times.dom = timing.domComplete - timing.domInteractive;

        return resolve(times);
      });
    }, false);
  });
}
