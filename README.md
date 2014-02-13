whoozin
=======
[![Build Status master](https://api.travis-ci.org/boissonnat/whoozin.png?branch=master)](https://api.travis-ci.org/boissonnat/whoozin)
[![Build Status develop](https://api.travis-ci.org/boissonnat/whoozin.png?branch=develop)](https://api.travis-ci.org/boissonnat/whoozin)

Plan your activities easily


How to launch
-------------

Whoozin is a Node.js application with Express and Jade.

#### 1. Clone our repo
#### 2. Install deps
We are using npm to manage the dependencies. 
You have to run :

```
$ npm install
```
#### 3. Parse.com
We are using [Parse.com](http://http://parse.com) to store our data. You will need to create an account, an application an set some environment variables.

After having created a new application on [Parse.com](http://http://parse.com), grab your ```Application ID``` and your ```Javascript ID``` and add them to your environment :

##### For exemple on Unix systems :
```
export PARSE_WHOOZIN_APP_KEY=<YOUR APP ID>
export PARSE_WHOOZIN_SDK_KEY=<YOUR JS ID>
```

#### 4. Run
Now you are able tio run Whoozin with the following command line :

```
$ node app.js
```
