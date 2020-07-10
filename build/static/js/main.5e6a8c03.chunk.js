(this["webpackJsonpshrink-ray"] = this["webpackJsonpshrink-ray"] || []).push([
  [0],
  {
    12: function (e, t, n) {
      e.exports = n(27);
    },
    17: function (e, t, n) {},
    26: function (e, t, n) {},
    27: function (e, t, n) {
      "use strict";
      n.r(t);
      var a = n(0),
        r = n.n(a),
        o = n(8),
        i = n.n(o),
        c = (n(17), n(1)),
        l = n(6),
        s = n.n(l),
        u = n(11),
        m = n(9),
        d = function (e) {
          var t = Object(a.useRef)(null),
            n = Object(a.useState)(!1),
            o = Object(c.a)(n, 2),
            i = o[0],
            l = o[1],
            s = 0,
            u = function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                e.dataTransfer.items &&
                  e.dataTransfer.items.length > 0 &&
                  ((s += 1), l(!0));
            },
            m = function (e) {
              e.preventDefault(), e.stopPropagation(), (s -= 1) > 0 || l(!1);
            },
            d = function (e) {
              e.preventDefault(), e.stopPropagation();
            },
            p = function (t) {
              t.preventDefault(),
                t.stopPropagation(),
                l(!1),
                t.dataTransfer.files &&
                  t.dataTransfer.files.length > 0 &&
                  (e.handleDropProp(t.dataTransfer.files), (s = 0));
            };
          return (
            Object(a.useEffect)(function () {
              var e = t.current;
              e.addEventListener("dragenter", u),
                e.addEventListener("dragleave", m),
                e.addEventListener("dragover", d),
                e.addEventListener("drop", p);
            }),
            r.a.createElement(
              "div",
              {
                style: { display: "inline-block", position: "relative" },
                ref: t,
              },
              !!i &&
                r.a.createElement(
                  "div",
                  { className: "drop-zone-overlay" },
                  r.a.createElement(
                    "div",
                    null,
                    r.a.createElement("div", null, "Set it down right here!!")
                  )
                ),
              e.children
            )
          );
        },
        p = n(5),
        f = n(10),
        g = n.n(f),
        v = function (e) {
          var t = e.setImageProcessed,
            n = Object(a.useState)(["jpg", "jpeg", "png"]),
            o = Object(c.a)(n, 1)[0],
            i = Object(a.useState)([]),
            l = Object(c.a)(i, 2),
            f = l[0],
            v = l[1];
          function h() {
            return (h = Object(m.a)(
              s.a.mark(function e(n) {
                var a, r, o, i, c, l, u;
                return s.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.t0 = p.b),
                          (e.next = 3),
                          Object(p.a)(URL.createObjectURL(n), "image1.png")
                        );
                      case 3:
                        return (
                          (e.t1 = e.sent),
                          (e.t2 = [e.t1]),
                          (e.t3 = [
                            "\n          convert image1.png -resize '1000' image2.png\n          convert image2.png -quality '70' final_v1.jpg\n          convert image1.png -resize '500' image3.png\n          convert image3.png -quality '45' final_v2.jpg\n        ",
                          ]),
                          (e.t4 = { inputFiles: e.t2, commands: e.t3 }),
                          (e.next = 9),
                          (0, e.t0)(e.t4)
                        );
                      case 9:
                        if (
                          ((a = e.sent),
                          (r = a.outputFiles),
                          (o = a.exitCode),
                          (i = a.stderr),
                          !o)
                        ) {
                          e.next = 17;
                          break;
                        }
                        alert(
                          "There was an error with the command: ".concat(
                            i.join("\n")
                          )
                        ),
                          (e.next = 26);
                        break;
                      case 17:
                        return (
                          (e.next = 19),
                          Object(p.c)(
                            r.find(function (e) {
                              return "final_v1.jpg" === e.name;
                            }),
                            document.getElementById("output-image")
                          )
                        );
                      case 19:
                        t(!0),
                          (c = document.getElementById("download-link")),
                          (l = new g.a()),
                          (u = l.folder("processed")).file(
                            "".concat(n.name, "_v1.jpg"),
                            r.find(function (e) {
                              return "final_v1.jpg" === e.name;
                            }).blob
                          ),
                          u.file(
                            "".concat(n.name, "_v2.jpg"),
                            r.find(function (e) {
                              return "final_v2.jpg" === e.name;
                            }).blob
                          ),
                          l.generateAsync({ type: "blob" }).then(function (e) {
                            var t = URL.createObjectURL(e);
                            c.href = t;
                          });
                      case 26:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            )).apply(this, arguments);
          }
          return r.a.createElement(
            d,
            {
              handleDropProp: function (e) {
                var t = [],
                  n = Object(u.a)(e);
                if (
                  o &&
                  n.some(function (e) {
                    return !o.some(function (t) {
                      return e.name.toLowerCase().endsWith(t.toLowerCase());
                    });
                  })
                )
                  alert(
                    "Only following file formats are acceptable: ".concat(
                      o.join(", ")
                    )
                  );
                else {
                  for (var a = 0; a < n.length; a++) {
                    if (!n[a].name) return;
                    t.push(n[a].name);
                  }
                  v(function (e) {
                    return e.concat(t);
                  }),
                    (function (e) {
                      h.apply(this, arguments);
                    })(n[0]);
                }
              },
            },
            f.length > 0
              ? r.a.createElement(
                  "ul",
                  { id: "drop-zone" },
                  f.map(function (e, t) {
                    return r.a.createElement(
                      "li",
                      { key: "file ".concat(t) },
                      e
                    );
                  })
                )
              : r.a.createElement(
                  "ul",
                  { id: "drop-zone" },
                  r.a.createElement(
                    "li",
                    { className: "no-bg" },
                    "The Drop Zone"
                  )
                )
          );
        };
      n(26);
      var h = function () {
        var e = Object(a.useState)(null),
          t = Object(c.a)(e, 2),
          n = t[0],
          o = t[1];
        return r.a.createElement(
          "div",
          { className: "App" },
          r.a.createElement(
            "header",
            null,
            r.a.createElement("h1", null, "Shrink Ray")
          ),
          r.a.createElement(
            "main",
            null,
            r.a.createElement(
              "section",
              { className: "drop-zone-container" },
              r.a.createElement(v, { setImageProcessed: o })
            ),
            r.a.createElement(
              "section",
              {
                className: n
                  ? "output-image-container"
                  : "output-image-container ghost",
              },
              r.a.createElement("img", {
                id: "output-image",
                src:
                  "https://images.unsplash.com/photo-1593935532255-a0574cc8fbf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=789&q=80",
                alt: "Trying it",
              }),
              r.a.createElement(
                "div",
                null,
                r.a.createElement(
                  "a",
                  { id: "download-link", href: "/", download: "result.zip" },
                  r.a.createElement(
                    "button",
                    { className: "download-button" },
                    "Download Results From Last Upload"
                  )
                )
              )
            )
          )
        );
      };
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      i.a.render(
        r.a.createElement(r.a.StrictMode, null, r.a.createElement(h, null)),
        document.getElementById("root")
      ),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready
            .then(function (e) {
              e.unregister();
            })
            .catch(function (e) {
              console.error(e.message);
            });
    },
  },
  [[12, 1, 2]],
]);
//# sourceMappingURL=main.5e6a8c03.chunk.js.map
