// Amplitude traffic tracking for the public site. Same project and autocapture
// settings as the portal (src/components/AmplitudeProvider.tsx), with two differences:
// visitors stay anonymous, and session replay is off.
// This is Amplitude's browser key, which is designed to be public.
(function () {
  if (!window.amplitude) return; // blocked by the visitor's browser; the site works without it

  var isLive = /(^|\.)igniteleadershipco\.com$/.test(location.hostname);
  var environment = isLive ? "marketing-site" : "marketing-site-local";

  window.amplitude.add({
    name: "env-enrichment",
    type: "enrichment",
    setup: function () { return Promise.resolve(); },
    execute: function (event) {
      event.event_properties = Object.assign({}, event.event_properties, { environment: environment });
      return Promise.resolve(event);
    }
  });

  window.amplitude.init("ead87259bcc938d2ea960b7d264855b1", {
    autocapture: {
      elementInteractions: true,
      // pathOnly: jumping to a section (/#services) isn't a new page view
      pageViews: { trackHistoryChanges: "pathOnly" },
      sessions: true,
      formInteractions: false,
      fileDownloads: false
    }
  });
})();
