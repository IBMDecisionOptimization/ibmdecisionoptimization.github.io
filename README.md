Portal for IBM Decision Optimization on Cloud (DOcloud) open source at GitHub https://ibmdecisionoptimization.github.io

The site is currently built based on the files:

* `cards.json`
* `index.html`

## Development
### Less theme files:
Less theme files can be modified. To publih css files, Less files must be compiled by this following command:
<pre>
# /usr/local/bin/lessc "--clean-css=--compatibility=ie8 --advanced" main.less ../css/main.min.css
</pre>


