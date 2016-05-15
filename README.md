# Atlas

Hackathon project for [AngularAttack 2016](https://www.angularattack.com). Visualize and interact with [World Data Bank api](http://data.worldbank.org/developers/api-overview).

Visit the live app at [atlas.2016.angularattack.io](http://atlas.2016.angularattack.io/).
Click on the World Data Bank link in the navbar to start visualizing different global census data. A sample query to start with is:
Country (ies): United States, Canada
Indicator: Death rate, crude (per 1,000 people)
From: 1980
To: 2001

Note: Not all indicators have complete data sets for every country/year, so many chart combinations by be incomplete.

### Step 1) Get Your Local Environment setup

Clone this repo locally, and make sure all your team members have access to it. This project was generated using [angular2-cli](https://github.com/angular/angular-cli).

* Install the latest [Node / NPM](https://nodejs.org).

* Install Angular2 CLI with `npm install -g angular-cli`

* `git clone git@github.com:rumblex/angularattack2016-atlas.git`

* `cd angularattack2016-atlas`

* `npm install`

* `npm start` or `ng server` will start the server locally to test that everything is running correctly. Open a browser at `localhost:4200` to see the application.


### Step 2) Deploy Your App

While you can't make any checkins before the comp, what you **can** do right now is deploy this sample app to [Surge](https://surge.sh) (our competition hosting provider).

* `npm install -g surge`

* `ng build`

* `cp CNAME dist/`

* `cd dist`

* `surge .`

Note: please do not remove the `CNAME` file, as that tells it where to deploy to.

If you receive an error message `"You do not have permission to publish to atlas.2016.angularattack.io"`, it might mean another team member has already deployed your project to Surge. Ask them to run the next step to give you access.

### Step 3) Add Your Team Members to Surge

* `surge . --add djphan@ualberta.ca,connerdunn7399@gmail.com,gnarlywhale@live.co.uk,admin@alexander-wong.com`

## License

The MIT License (MIT)

Copyright (c) 2016 Alexander Wong <admin@alexander-wong.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
