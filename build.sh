#!/bin/sh
cp vue.js dist/vue.js
sed '/INSERT/ r cards.js' base.html > dist/index.html
