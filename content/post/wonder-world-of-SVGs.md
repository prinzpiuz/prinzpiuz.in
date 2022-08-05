---
title: "Wonder World of SVGs"
date: 2022-06-06T10:45:15+05:30
draft: false
categories: ["Design"]
---

##### Little SVG history

Scalable Vector Graphics (SVG) is an XML-based vector image format for **two-dimensional graphics with support for interactivity and animation**. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) in 1999. SVG images are defined in a vector graphics format and stored in XML text files. **SVG images can thus be scaled in size without loss of quality**, and SVG files can be searched, indexed, scripted, and compressed. The XML text files can be created and edited with text editors or vector graphics editors, and are rendered by the most-used web browsers. _more can be read from [Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics)_

##### Let's try a basic drawing

{{< svg "/static/images/wonder_world_of_svgs/circle.svg" >}}

```svg
<svg xmlns="http://www.w3.org/2000/svg"
    width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="25" fill="#73A1D4" />
</svg>
```

let's look the above svg code. let me try to explain basic elements & attributes of above code. This is a basic svg code for creating circle as shown above. All svg scripts should be between **\<svg>\</svg>** like html is in **\<html>\</html>**.
**xmlns** attribute is used to describe the namespace, since SVG is XML-based it is namespaced then only we can use it along with other XML-based languages. here ***http://www.w3.org/2000/svg*** means or defines the namespace for SVG. so when the user agent interprets this code and sees that the XML namespace of this element and its descents is SVG it will interpret it as SVG. This is very useful when users write SVG mixed with other XML-based languages. more about namespaces can be read in this awesome [article](https://developer.mozilla.org/en-US/docs/Web/SVG/Namespaces_Crash_Course)
**width** & **height** attribute is used to define the horizontal and vertical length of the user coordinate system
**viewBox** should be set to a string, containing four numbers separated by spaces and/or a comma, it defines the position and dimension of the content of the SVG script, the 4 numbers in the viewBox attribute represent min-x, min-y, width, and height. the **min-x** & **min-y** values are set at the top, left corner of our view box. Changing these values will pan our view. **width** and **height** set the number of pixels that are visible inside of our view box. so here 0, 0 means it should be in the center of the viewport, and width and height with values 100, 100 means all pixel should be visible. read [this](https://wattenberger.com/guide/scaling-svg) amazing article to understand more about the SVG view box.
And **circle** element is what we use for drawing circles. It's a [basic](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)[ shape](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes) element under the SVG tag

##### Now let's try something of little complex & cute

{{< svg "/static/images/wonder_world_of_svgs/cute_human.svg" >}}

```svg
<svg width="350" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <ellipse ry="31" rx="30.5" id="svg_1" cy="98" cx="92.5" stroke="#000" fill="none" />
    <line stroke="#000" id="svg_2" y2="208" x2="94" y1="130" x1="93" fill="none" />
    <line id="svg_3" y2="162" x2="130" y1="163" x1="94" stroke="#000" fill="none" />
    <line stroke="#000" id="svg_4" y2="162" x2="56" y1="163" x1="95" fill="none" />
    <line id="svg_5" y2="238" x2="59" y1="207" x1="94" stroke="#000" fill="none" />
    <line id="svg_6" y2="239" x2="128" y1="207" x1="94" stroke="#000" fill="none" />
    <ellipse ry="2.5" rx="4.5" id="svg_8" cy="92.5" cx="81.5" stroke="#000" fill="none" />
    <ellipse ry="2.5" rx="4.5" id="svg_9" cy="92.5" cx="105" stroke="#000" fill="none" />
    <path id="svg_7" d="m80,107c12,13 28,0 28,0" stroke="#000" fill="none" />
    <line id="svg_10" y2="139" x2="40" y1="161" x1="57" stroke="#000" fill="none" />
    <line id="svg_10" y2="163" x2="129" y1="193" x1="155" stroke="#000" fill="none" />
    <line id="svg_13" y2="106" x2="93" y1="93" x1="93" stroke="#000" fill="none" />
</svg>
```

Look at the above SVG code. now we have some more new elements. let me try to explain them.

- **ellipse**
  An ellipse is closely related to a circle. The difference is that an ellipse has an x and a y radius that differs from each other, while a circle has an equal x and y radius.

  - The cx attribute defines the x coordinate of the center of the ellipse
  - The cy attribute defines the y coordinate of the center of the ellipse
  - The rx attribute defines the horizontal radius
  - The ry attribute defines the vertical radius

- **line**-
  Line element is used to create a line connecting two points.

  - The x1 attribute defines the start of the line on the x-axis
  - The y1 attribute defines the start of the line on the y-axis
  - The x2 attribute defines the end of the line on the x-axis
  - The y2 attribute defines the end of the line on the y-axis

- **path**
  The Path SVG element is the generic element to define a shape. All the basic shapes can be created with a path element.The following commands are available for path data:

  - M = moveto
  - L = lineto
  - H = horizontal lineto
  - V = vertical lineto
  - C = curveto
  - S = smooth curveto
  - Q = quadratic Bézier curve
  - T = smooth quadratic Bézier curveto
  - A = elliptical Arc
  - Z = closepath

  **Note**: There are some common attributes like

  - Stroke: which is used to define stroke properties of the line we are drawing, There is also some other stroke properties
    - stroke-width: defines the thickness of a line, text or outline of an element
    - stroke-linecap: defines different types of endings to an open path
    - stroke-dasharray: property is used to create dashed lines
  - Fill: is used to define the fill color

  More details can be read [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes)

##### Now let's try to animate the above SVG

There are 3 possible ways we can animate an SVG image, Through **CSS**, **Animate-element**, and then through **Javascript**. I have tried to animate the above SVG with these methods. I have used the CSS animation method to animate the mouth of our human. and Animate element is used to change the stroke color of our human. and last Javascript method is used to animate the hand and legs. code is pretty simple and self explanatory. let's have look.

{{< svg "/static/images/wonder_world_of_svgs/animated_cute_human.svg" >}}

{{< more svg expand >}}
<svg
width="350"
height="300"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
onload="init()"

>

  <style>
    #mouth {
        animation: dance 1s infinite alternate;
    }

    @keyframes dance {
        100% {
            transform: rotate(2deg);
        }
    }
  </style>
  <script>
    var right_hand;
    var left_leg;
    var left_hand;
    var right_leg;
    function init() {
        right_hand = document.getElementById('right_hand');
        left_leg = document.getElementById('left_leg');
        left_hand = document.getElementById('left_hand');
        right_leg = document.getElementById('right_leg');
        window.requestAnimationFrame(rotate);
    }

    function rotate(timestamp) {
      var milliseconds = timestamp % 1000;
      var degrees      = milliseconds * .2; // 360 degrees in 1000 ms
      right_hand.setAttribute('x1', degrees);
      left_leg.setAttribute('x2', degrees);
      left_hand.setAttribute('x2', degrees);
      right_leg.setAttribute('y2', degrees);
      window.requestAnimationFrame(rotate);
    }
  </script>

<ellipse
ry="31"
rx="30.5"
id="head"
cy="98"
cx="92.5"
stroke="#000"
fill="none"

>
<animate
  attributeName="stroke"
  dur="5000ms"
  to="#3CAA1A"
  repeatCount="indefinite"

/>
</ellipse>
<line
stroke="#000"
id="center_bone"
y2="208"
x2="94"
y1="130"
x1="93"
fill="none"
>
<animate
  attributeName="stroke"
  dur="5000ms"
  to="#1AAA54"
  repeatCount="indefinite"
/>
  </line>
  <line
    id="right_arm"
    y2="162"
    x2="130"
    y1="163"
    x1="94"
    stroke="#000"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#1AAA9A"
      repeatCount="indefinite"
    />
  </line>
  <line
    stroke="#000"
    id="left_arm"
    y2="162"
    x2="56"
    y1="163"
    x1="95"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#1A85AA"
      repeatCount="indefinite"
    />
  </line>
  <line
    id="left_leg"
    y2="238"
    x2="59"
    y1="207"
    x1="94"
    stroke="#000"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#0E4EB8"
      repeatCount="indefinite"
    />
  </line>
  <line
    id="right_leg"
    y2="239"
    x2="128"
    y1="207"
    x1="94"
    stroke="#000"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#160EB8"
      repeatCount="indefinite"
    />
  </line>
  <ellipse
    ry="2.5"
    rx="4.5"
    id="left_eye"
    cy="92.5"
    cx="81.5"
    stroke="#000"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#8E0EB8"
      repeatCount="indefinite"
    />
  </ellipse>
  <ellipse
    ry="2.5"
    rx="4.5"
    id="right_eye"
    cy="92.5"
    cx="105"
    stroke="#000"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#B80E9F"
      repeatCount="indefinite"
    />
  </ellipse>
  <path
    id="mouth"
    d="m80,107c12,13 28,0 28,0"
    opacity="NaN"
    stroke="#000"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#A95881"
      repeatCount="indefinite"
    />
  </path>
  <line
    id="left_hand"
    y2="139"
    x2="40"
    y1="161"
    x1="57"
    stroke="#000"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#7F2A34"
      repeatCount="indefinite"
    />
  </line>
  <line
    id="right_hand"
    y2="163"
    x2="129"
    y1="193"
    x1="155"
    stroke="#000"
    fill="none"
  >
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#E73F1B"
      repeatCount="indefinite"
    />
  </line>
  <line id="nose" y2="106" x2="93" y1="93" x1="93" stroke="#000" fill="none">
    <animate
      attributeName="stroke"
      dur="5000ms"
      to="#18ECEA"
      repeatCount="indefinite"
    />
  </line>
</svg>
{{< /more >}}

These are only some basic animations. only thing to explain in the above code is animate element of SVG itself.

- **Animate**
  The SVG <animate> element provides a way to animate an attribute of an element over time. for further read go [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate)

There are a lot of awesome libraries available for animating SVG. without dealing with all the above mess. this is to understand how a basic animation works in SVG.

- Awesome libraries for animating SVGs
  - [Snap.svg](https://github.com/adobe-webplatform/Snap.svg)
  - [vivus](https://github.com/maxwellito/)
  - [lazy-line-painter](https://github.com/camoconnell/lazy-line-painter)
  - [walkway](https://github.com/ConnorAtherton/walkway)
  - [motion](https://github.com/framer/motion)
````
