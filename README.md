# [TiltShift.js](http://www.pinceladasdaweb.com.br/blog/uploads/tiltshift/)

A VanillaJS plugin that uses the CSS3 image filters to replicate the tilt-shift effect. This script is based on the original created by [Noel Tock and Adam Yanalunas](http://www.noeltock.com/tilt-shift-css3-jquery-plugin/) This is a proof of concept and currently **only works in Webkit based browsers** (Chrome, Safari, Opera)..

## How to use

Call the plugin on any collection of images you want by adding the following script:

```html
<script src="path/to/tiltshift.min.js"></script>
<script>TiltShift.init();</script>
```

Parameters on each image must be set using the HTML5 data attributes, like this:

```html
<img src="url" class="tiltshift" data-position="50" data-blur="2" data-focus="10" data-falloff="10" data-direction="y">
```

The attributes will control various variables that influence the tiltshift effect.

- **position** (0-100), defines the point of focus. 66 would be two thirds of the way in.
- **blur** (0-?), the blur radius in pixels. 1 or 2 are usually good numbers.
- **focus** (0-100), the amount of area that is in focus. 10 would mean one tenth of the image is sharp.
- **falloff** (0-100), the amount of area between complete focus and complete blur. The lower the value, the “tighter” the fade.
- **direction** (“x”, “y”, or 0-360), the direction of the effect with zero at right.

## Notes

- As previously stated, currently only supported by Webkit based browsers (Chrome, Safari, Opera). CSS3 filters are not widely supported, and Firefox/Mozilla to my knowledge only support SVG's for it's mask property.
- Wraps a DIV around the IMG tag, so you may want to apply to same styling attributes to the selector '.tiltshift-wrap'.
- Pull requests? Yes, happy to make this more rigid across different browsers.

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb//releases) for detailed changelog.

## License

[MIT](LICENSE)