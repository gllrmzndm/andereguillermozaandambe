---
layout: post
title:  "Starting my blog"
author: Guillermo Zaandam
categories: [Jekyll, Ruby, Bundle]
image: assets/images/shift2_menu_career_2.jpg
featured: true
toc: true
---


# Starting my own blog.

I had to figure out how to express myself properly. Facebook, Instagram and Twitter weren't a good option due personal reasons and more.

Facebook is too personal, Instagram is obviously for sharing photos and stories but, the worst part for me about Instagram is the part where most people are based on one personality or subject. Which is difficult for me, because there’s much more than that.

With my own blog, I have the freedom to blog about everything I want, sports, technology, cars and more. I’m less dependent on Meta or Twitter.

Starting my own blog with static pages is new to me, I heard of it before, but I had no clue how it would pan out. Yes, this blog is made with a static site generator called: Jekyll.
Written in Ruby and can be used with Markdown, Liquid template engine and HTML and CSS.

Diving right into Jekyll themes was clumsy, since I didn’t know about Jekyll in general to make the most out of it. But right now, it works and is good enough to write blog posts.

I selected the [mediumish-theme-jekyl](https://github.com/wowthemesnet/mediumish-theme-jekyll)l from Sal @ wowthemes.net

Couple of fixes had to be made and things had to be figured out before I could properly launch my static page locally on my computer.

The some what paltry instructions of any ${insert manual] is unpleasant for real beginners who want to have a nice theme. Starting with the mediumish theme:

- I had to install the bundle gems
- set bundle config to local path
- update the bundle (since it had a couple of errors.
- Changing the config file, because it didn’t include the `vendor` string to exclude it from the building process.

All the above has been solved and I made a pull request and made some changes to the file config.yml file and updated the README.md. (I think this is my second pull request?)

Things are working “properly” right now and it’s time to start posting.