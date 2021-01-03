function stopwatch(params) {

    params.value = params.value || 0;
    
    var svg = createElement({
        tag: "svg",
        attrs: {"viewBox": "0 0 100 120"},
        classList: ["stopwatch"]
    });
    params.parent.appendChild(svg);

    function coords(value) {
        var inv = value >= 0.5;
        var r = 38;

        var x, y;

        if (!inv) {
            x = r * Math.cos(value * 2 * Math.PI - Math.PI/2) + 50;
            y = r * Math.sin(value * 2 * Math.PI - Math.PI/2) + 70;    
        } else {
            x = r * Math.sin(value * 2 * Math.PI) + 50;
            y = -r * Math.cos(value * 2 * Math.PI) + 70;  
        }

        var invV = inv ? "1" : "0";
        return invV + " 1 " + x.toFixed(2) + " "  + y.toFixed(2);
    }

    var arc = createElement({
        tag: "path",
        attrs: { d: "M50,70 L50,32 A38 38 0 " + coords(params.value)},
        styles: {stroke: "rgba(" + params.color + ",0.5)", fill: "rgba(" + params.color + ",0.7)"}
    })
    svg.appendChild(arc);


    var outter = createElement({
        tag: "circle",
        attrs: {"cx": 50, "cy": 70, "r": 45},
        styles: {"stroke": "#000000", "fill": "none","stroke-width": 8}
    });
    svg.appendChild(outter);

    var inner = createElement({
        tag: "circle",
        attrs: {"cx": 50, "cy": 70, "r": 3},
        styles: {"stroke": "#000000", "fill": "#ffffff","stroke-width": 4}
    });
    svg.appendChild(inner);

    var button1 = createElement({
        tag: "rect",
        attrs: {x: 47, y: 11, height: 10, width: 6},
        styles: {stroke: "#000000", fill: "#00000"}
    });
    var button2 = createElement({
        tag: "rect",
        attrs: {x: 42, y: 5, height: 12, width: 16, rx: 2, ry: 2},
        styles: {stroke: "#000000", fill: "#00000"}
    });
    svg.appendChild(button1);
    svg.appendChild(button2);
    
    var button3 = createElement({
        tag: "rect",
        attrs: {x: 47, y: 11, height: 10, width: 6, transform: "rotate(-45 50 70)"},
        styles: {stroke: "#000000", fill: "#00000"}
    });
    var button4 = createElement({
        tag: "rect",
        attrs: {x: 44, y: 10, height: 8, width: 12, rx: 2, ry: 2, transform: "rotate(-45 50 70)"},
        styles: {stroke: "#000000", fill: "#00000"}
    });
    svg.appendChild(button3);
    svg.appendChild(button4);

    var tick1 = createElement({
        tag: "rect",
        attrs: {x: 49, y: 43, height: 23, width: 2, transform: "rotate(" + (params.value * 360).toFixed(2) + " 50 70)"},
        styles: {stroke: "#000000", fill: "#00000"},
    });
    var tick2 = createElement({
        tag: "polygon",
        attrs: {points: "48,44 52,44 50,41", transform: "rotate(" + (params.value * 360).toFixed(2) + " 50 70)"},
        styles: {stroke: "#000000", fill: "#00000"}
    })
    svg.appendChild(tick1);
    svg.appendChild(tick2);
    
    for (var i=0; i<12; i++) {
        var line = createElement({
            tag: "line",
            attrs: {x1: 50, y1: 33, x2: 50, y2: 38, transform: "rotate(" + (30 * i) + " 50 70)"},
            styles: {stroke: "#000000", fill: "#00000"}
        });
        svg.appendChild(line);
    }

    var timeS = createElement({
        tag: "text",
        classList: ["time"],
        attrs: {
            x: 37,
            y: 95
        }
    });
    timeS.innerHTML = params.time;
    svg.appendChild(timeS);

    var label = document.createElement("span");
    label.className = "character";
    label.innerHTML = params.label;
    params.parent.appendChild(label);
}

function createElement(options) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", options.tag);
    options.attrs = options.attrs || {};
    options.styles = options.styles || {};
    Object.keys(options.attrs).forEach(function(attr) {
        element.setAttribute(attr, options.attrs[attr]);
    })
    element.style = Object.keys(options.styles).map(function(style) {
        return style + ": " + options.styles[style];
    }).join("; ");
    (options.classList || []).forEach(function(className) {
        element.classList.add(className);
    })

    return element;
}