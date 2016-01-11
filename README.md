# Tink skeleton Angular directive

v1.0.0

## What is this repository for?

The Tink Angular skeleton provides a scaffold for a directive or service that can easily work with Tink.

Tink is an in-house developed easy-to-use front end framework for quick prototyping and simple deployment of all kinds of websites and apps, keeping a uniform and consistent look and feel.

## Setup

### Prerequisites

* nodeJS [http://nodejs.org/download/](http://nodejs.org/download/)
* bower: `npm install -g bower`

### Install

1. Go to the root of your project and type the following command in your terminal:

   `bower install tink-tab-panel-angular --save`

2. Add the following files to your project:

   `<link rel="stylesheet" href="bower_components/tink-core/dist/tink.css" />` (or one of the Tink themes)

   `<script src="bower_components/tink-tab-panel-angular/dist/tink-tab-panel-angular.js"></script>`

3. Add `tink.tabpanel` to your app module's dependency.

   `angular.module('myApp', ['tink.tabpanel']);`


----------


## How to use

### tink-tab-panel

```html
<ul tink-tab-panel="content" class="nav-tabs nav-lg">
	<li tink-tab="{{::data}}" tink-tab-template="views/{{::data}}.html" ng-repeat="data in c.data" role="presentation"><a>{{::data}}</a></li>
</ul>
<div tink-tab-panel-content="content">
</div>
```

## Contribution guidelines

* If you're not sure, drop us a note
* Fork this repo
* Do your thing
* Create a pull request

## Who do I talk to?

* Jasper Van Proeyen - jasper.vanproeyen@digipolis.be - Lead front-end
* Tom Wuyts - tom.wuyts@digipolis.be - Lead UX
* [The hand](https://www.youtube.com/watch?v=_O-QqC9yM28)
