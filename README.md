Portal for IBM Decision Optimization on Cloud (DOcplexcloud) open source at GitHub https://ibmdecisionoptimization.github.io

The site is currently built based on the files:

* `cards.json`
* `index.html`

## Development
### Site Theme:
The site theme is based on Less files. After modification, Less files should be compiled by this following command:
<pre>
# /usr/local/bin/lessc "--clean-css=--compatibility=ie8 --advanced" main.less ../css/main.min.css
</pre>


