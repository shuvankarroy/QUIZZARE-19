! function (t) {
    var e = {};

    function n(o) {
        if (e[o]) return e[o].exports;
        var i = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = t, n.c = e, n.d = function (t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: o
        })
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) n.d(o, i, function (e) {
                return t[e]
            }.bind(null, i));
        return o
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 4)
}([function (t, e) {
    t.exports = "varying vec3 vColor;\n\nuniform float uTime;\nuniform float uAlpha;\n\nvoid main() {\n    gl_FragColor = vec4(vColor, uAlpha);\n}"
}, function (t, e) {
    t.exports = "#define M_PI    3.14159265358979323846264338327950\n#define M_2PI   6.28318530717958647692528676655900\n#define POINT_SIZE 1.0\n#define MAX_DIST_FROM_CENTER 3.5\n#define INITIAL_ANIMATION_PARAM 0.4\n\nattribute vec3 randomStartPosition;\nattribute float initialTimeShift;\n\nvarying vec3 vColor;\n\nuniform float uTime;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform vec3 uMousePosition;\n\nvoid main() {\n  gl_PointSize = POINT_SIZE;\n\n  float initialAnimationState = (uTime - initialTimeShift) * INITIAL_ANIMATION_PARAM;\n\n  vColor = mix(uColor1, uColor2, length(position - vec3(0.0, 0.0, 0.0)) / MAX_DIST_FROM_CENTER);\n\n  if (initialAnimationState < 1.0) {\n    vec3 interPosition = position * initialAnimationState + randomStartPosition * (1.0 - initialAnimationState);\n\n    gl_Position = projectionMatrix *\n                  modelViewMatrix *\n                  vec4(interPosition, 1.0);\n  } else {\n    vec3 camToPos = position - cameraPosition;\n    float camDist = length(camToPos);\n\n    vec3 mouseToPos = position - uMousePosition;\n    float mouseToPosDist = length(mouseToPos);\n\n    vec3 newPosition = vec3(\n      position.x + 0.005 * sin(uTime * M_PI * position.y * position.z), \n      position.y + 0.02 * sin(uTime * M_PI * 1.5 * position.x * position.z), \n      position.z + 0.005 * sin(uTime * M_PI * position.x * position.y)\n    );\n\n    float distortParam = 0.02 / (mouseToPosDist * mouseToPosDist);\n    if (distortParam > 0.0 && distortParam < 1.0) {\n      newPosition = newPosition * (1.0 - distortParam * 0.5) + randomStartPosition * distortParam * 0.5;\n      newPosition = vec3(\n        position.x + 7.0 * distortParam * sin((uTime - initialTimeShift - newPosition.x) * M_PI),\n        position.y + 6.0 * distortParam * cos((uTime - initialTimeShift - newPosition.y) * M_PI) * cos((uTime - initialTimeShift) * M_PI),\n        position.z + 5.0 * distortParam * cos((uTime - initialTimeShift - newPosition.z) * M_PI) * sin((uTime - initialTimeShift) * M_PI)\n      );\n    }\n    gl_Position = projectionMatrix *\n                  modelViewMatrix *\n                  vec4(newPosition, 1.0);\n  }\n}"
}, function (t, e) {
    t.exports = "wp-content/themes/airnauts/assets/img/LOGO_FIN.png"
}, , function (t, e, n) {
    "use strict";
    n.r(e);
    var o = n(0),
        i = n.n(o),
        r = n(1),
        a = n.n(r),
        s = n(2),
        u = n.n(s);
    n(5);
    const l = u.a,
        m = "logo-container";
    let c, f, d, p, E, P = 0,
        T = 0;
    const h = 0,
        M = 0,
        v = 0,
        y = new THREE.Clock,
        w = new THREE.Vector2,
        g = new THREE.Raycaster,
        R = 20,
        x = 15,
        I = -90,
        S = 10,
        A = 5;
    let _, b;
    const H = new THREE.Vector3(100, 100, 100);
    let C = !0;
    async function O() {
        p = document.getElementById(m).offsetWidth, E = document.getElementById(m).offsetHeight, document.addEventListener("mousemove", B), document.addEventListener("logo-animation-start", () => {
            !1 === C && (C = !0, z())
        }), document.addEventListener("logo-animation-stop", () => {
            C = !1
        }), window.addEventListener("resize", j), f = new THREE.Scene;
        const t = await
        function (t) {
            return new Promise((e, n) => {
                const o = new THREE.OBJLoader;
                o.load(t, t => e(t), null, t => n(t))
            })
        }(l);
        let e, n;
        t.translateY(-.3), t.updateMatrixWorld(), t.traverse(t => {
            t instanceof THREE.Mesh && (e = t.geometry, n = t, t.material.side = THREE.DoubleSide)
        });
        const o = [],
            r = [],
            s = [],
            u = new THREE.Vector3,
            P = new THREE.Vector3(1, 1, 0).normalize(),
            T = new THREE.Raycaster,
            y = (new THREE.Box3).setFromObject(t),
            w = y.min.x + .01,
            g = y.min.y + .01,
            R = y.min.z + .01,
            x = y.max.x - .01,
            O = y.max.y - .01,
            N = y.max.z - .01,
            F = x - w + 10,
            D = O - g + 10,
            L = N - R + 0 - 1;
        b = new THREE.Mesh(new THREE.BoxGeometry(F, D, L), new THREE.MeshBasicMaterial({
            color: 0
        }));
        for (let t = w; t <= x; t += .15)
            for (let e = g; e <= O; e += .15)
                for (let i = R; i <= N; i += .15) {
                    if (u.x = t, u.y = e, u.z = i, T.set(u, P), T.intersectObject(n).length % 2 == 1)
                        for (let n = 0; n < 3; n++) o.push(t), o.push(e), o.push(i), r.push(2 - 4 * Math.random()), r.push(2 - 4 * Math.random()), r.push(2 - 4 * Math.random()), s.push(1.5 * Math.random())
                }
        const V = new THREE.BufferGeometry;
        V.addAttribute("position", new THREE.BufferAttribute(new Float32Array(o), 3)), V.addAttribute("randomStartPosition", new THREE.BufferAttribute(new Float32Array(r), 3)), V.addAttribute("initialTimeShift", new THREE.BufferAttribute(new Float32Array(s), 1)), _ = new THREE.ShaderMaterial({
            uniforms: {
                uTime: {
                    type: "f",
                    value: 0
                },
                uColor1: {
                    type: "v3",
                    value: new THREE.Vector3(.8, .64, .43)
                },
                uColor2: {
                    type: "v3",
                    value: new THREE.Vector3(0, 0, 0)
                },
                uAlpha: {
                    type: "f",
                    value: .2
                },
                uMousePosition: {
                    type: "v3",
                    value: H
                }
            },
            vertexShader: a.a,
            fragmentShader: i.a
        }), f.add(new THREE.Points(V, _)), d = new THREE.PerspectiveCamera(75, p / E, 1, 1e4);
        let W = I,
            k = S;
        W *= Math.PI / 180, k *= Math.PI / 180, d.position.x = h + A * Math.cos(k) * Math.cos(W), d.position.z = M + A * Math.cos(k) * Math.sin(W), d.position.y = v + A * Math.sin(k), d.lookAt(f.position), (c = new THREE.WebGLRenderer({
            alpha: !0
        })).setPixelRatio(window.devicePixelRatio), c.setSize(p, E), document.getElementById(m).appendChild(c.domElement)
    }

    function z() {
        C && requestAnimationFrame(z), _.uniforms.uTime.value += y.getDelta(),
            function () {
                let t = I + -R / 2 + P / p * R,
                    e = S + -x / 2 + T / E * x;
                t *= Math.PI / 180, e *= Math.PI / 180, d.position.x = h + A * Math.cos(e) * Math.cos(t), d.position.z = M + A * Math.cos(e) * Math.sin(t), d.position.y = v + A * Math.sin(e), d.lookAt(f.position), c.render(f, d)
            }()
    }

    function B(t) {
        const e = document.getElementById(m).getBoundingClientRect();
        P = t.clientX - e.left, T = t.clientY - e.top, w.x = P / p * 2 - 1, w.y = -T / E * 2 + 1, g.setFromCamera(w, d);
        var n = g.intersectObject(b, !0);
        if (n.length > 0) {
            const t = n[0].point;
            _.uniforms.uMousePosition.value = t
        } else _.uniforms.uMousePosition.value = H
    }

    function j() {
        p = document.getElementById(m).offsetWidth, E = document.getElementById(m).offsetHeight, d.aspect = p / E, d.updateProjectionMatrix(), c.setSize(p, E)
    }
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || setTimeout(() => {
        O().then(function () {
            y.start(), z()
        })
    }, 500)
}, function (t, e, n) {
    t.exports = n.p + "index.html"
}]);
