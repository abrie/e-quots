## Background

Infection control is a serious concern in health care facilities. The [CDC](https://cdc.gov) and [APIC](http://https://www.apic.org) developed a set of **Infection Prevention Observation Tools** to augment best practices. Known as **QUOTS** (Quick Observation Tools), the tools are provided to the public as [PDF worksheets](https://www.cdc.gov/infectioncontrol/tools/quots.html).

## Motivation

The worksheets provided by CDC are "fillable forms" with some basic tabulation features. This project aims to re-implement the worksheets as HTML forms, served through a small installable app. The goals are:

1. Remove the dependency on proprietary software (Adobe Acrobat),
2. Avoid dependencies on third-party App Stores (Google Play, Apple Store, etc),
3. Implement additional, useful export and metric features.
4. Provide a means for automatic updates.

# Presenting: E-QUOTS

This is a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) implementation of the PDF-based [QUOTS](https://www.cdc.gov/infectioncontrol/tools/quots.html).

<img src="pwa-screenshot.png" width="400">

## Implementation

E-QUOTS is a web app; an electronic version of QUOTS with automatic tabulation and export features. It requires no proprietary software or downloads. It works offline. Completed worksheets may be printed or emailed, making it easier to monitor and manage infection control proceedures.

## The App

Use E-QUOTS here: https://abrie.github.io/e-quots

## Legal Details

APIC and CDC created the original PDFs using funding from a Centers for Disease Control and Prevention (CDC) Contract (#200-2016-89676).

This project is not affiliated with APIC or the CDC.
