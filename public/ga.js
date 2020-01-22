var _gaq = _gaq || [];
window.onload = function() {
      _gaq.push(['_setAccount', 'UA-251384-16']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'resources.sui.com/fed/analytics/analytics.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
      })();
};
