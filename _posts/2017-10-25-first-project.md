---
layout:     post
title:      On Site Structure
date:       2017-10-25 8:26 pm
author:     Alex Potts
summary:    Serving a basic website with room to grow.
categories: DevOps
thumbnail:  server
tags:
 - coding
 - website
 - docker
 - jekyll
 - nginx
 - ruby
 - apache
 - vagrant
 - virtualbox
 - virtualenv
 - python
 - geoslice
 - raspberrypi
---

Today I started laying the groundwork for my personal projects to make an appearance on this site. Since I have samples and projects in several different languages and environments I need to create a framework where they don't all step on each other's toes. On top of that this site is running off a [raspberry pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) so it doesn't exactly have a lot of spare memory, but I want the site to be easily moved to different hardware. I'm getting pulled in a lot of different directions.

I've been using `virtualenv` with my python projects lately but it's a little cumbersome for my taste. I mean `source venv/bin/activate` isn't exactly the cleanest command. I  added `alias venv="source venv/bin/activate"` to my `.zshrc` and added a section of my theme to keep track of what environment I was in. ![venv looking nice](/images/venv.png) But `virtualenv` is really just for python... I'm gonna be working in more than just python. It's ok bad ideas are how we get to good ideas.

Virtual machines! Pretty great for setting up a clean coding environment and they're pretty portable. You can move them to new machines without disrupting your environment and they map to colud services really well! And [Vagrant](https://www.vagrantup.com/) makes it pretty easy to setup and mirror production environments without the hassle of a ridiculous manual virtualbox setup. But the memory footprint of multiple virtual machines can get a little big and they still feel kinda clunky to setup and manage with a larger ecosystem.

Enter [Docker](http://docker.com). Easy to setup, lots of prebuilt images for practically any service, portable, and not very resource intensive! The way docker only brings up the relevant scraps of an os is perfect for a tiny host like the raspberrypi. Being able to centralize the setup to one `docker-compose.yml` has been a godsend. With a little bit of thinking I can bring up a project as it's own system, or tie it into the larger whole that is this fledgling menagerie.

Alright great so with that settled I just needed to plan out and setup some infrastructure. `apotts.me` serves up mostly static content generated with [Jekyll](https://jekyllrb.com/) but jekyll's built in server is hardly robust enough for what I want to do. Jekyll will take all of your source files and compile them into a ready to go site in the `_site` directory so I can use that as a base and serve it up with a more fleshed out web server.

I've used Apache for several sites before, but life is all about learning new things and [Nginx](https://www.nginx.com/) seems like a [more modern alternative](http://www.hostingadvice.com/how-to/nginx-vs-apache/). It's got a slightly smaller memory footprint but mostly it's better at serving static content. Any dyanmic content on the site will be coming from a project with it's own way of handling that content. I'm pulling an Nginx image with some [Amplify](https://amplify.nginx.com/) monitoring built in, and mounting the compiled jekyll `_site` folder to my Nginx container. In my `docker-compose.yml`:
```
version: "3.1"
services:
    ####### Nginx sourcing jekyll output #########
    webserver:
      image: nginx-amplify
      volumes:
       - ./nginx.conf:/etc/nginx/nginx.conf:ro #overwrite nginx conf with custom config
       - ./jekyll/_site:/var/www/html:ro #mount the static site to the container
...
```

It should be pretty easy to work on the site and see my updates in real time now. The way I've mounted the `_site` directory in docker lets it mirror updates to files on the host filesystem. Now I can work on the site and see my updates in real time with just two commands:
`docker-compose up` to start my docker services and `jekyll build --watch` to rebuild the site when there are updates. It makes editing and catching mistakes waaaay easier.

Thats a decent primer on the static site.  I was going to get into the meat of adding my first project to the site but one idea at a time. In the meantime heres a [preview](/geoslice/).

