#!/bin/sh
sed '/INSERT/ r cards.js' base.html > index.html
