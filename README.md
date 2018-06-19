# Gulp+Browserify+Browser-sync

A simple project to show how useful gulp can be when used with a few simple plugins/modules.

# How To Get Started

1. Install image magick + graphics magic

2. ```npm install```

2.a(do ```npm i -g gulp``` if you don't have it already globally thanks to @flaura)

3. build webp images with ```gulp webp```

4. build project and launch with ```gulp build```

5. ```gulp dev``` to restart watching/developement server

# How It Works

Browser-sync loads up a build folder build by gulp that includes a bundled html package that uses javascript bundles and responsive images.

```gulp webp``` goes inside of the src images folder and creates a webp image out of every image in the folder. ```gulp build`` goes through and builds the responsive images folder, bundles the js, and outputs the inlined-with-css html file(s). 

Gulp then watches the original source files for any changes by you, which then triggers the events all over again and reloads the browser.

# How do I do more than one html file?

Simple, just copy how the ```browserify-main``` task runs, and make sure to add it to each run sequence the other task is involved in. A good idea if you have a lot of these would be to make a run task with an array of these tasks, so only that task would need to be called by the helper tasks that need it, like ```watch``` and ```build```.




