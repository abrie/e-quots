#!/bin/sh
sed '/INSERT/ r cards.js' base.html > dist/index.html
echo `date`
