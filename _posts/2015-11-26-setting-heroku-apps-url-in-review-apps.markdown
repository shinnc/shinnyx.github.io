---
layout: post
title:  "Setting Heroku apps URL in Review App"
slug:   "setting-heroku-apps-url-in-review-app"
date:   2015-11-26 23:47:06
comments: true
categories: Heroku Ruby Rails
---

Heroku launched the [review apps beta](https://blog.heroku.com/archives/2015/5/19/heroku_review_apps_beta) earlier in May 2015, which completes the continuous delivery experience when deploying on Heroku, along with the [Heroku flow](https://blog.heroku.com/archives/2015/9/3/heroku_flow_pipelines_review_apps_and_github_sync). To try out this new flow, I spinned up a rails review app, everything else looks good except that all the assets were broken on the review app server.

It turns out that the assets was depending on an ENV variable, `WWW_HOST` which is url of the Heroku app and I've to fix this manually by doing `heroku config:set WWW_HOST=blablabla.com` for each review app. But isn't it too tedious? I think so.

Then I was prying around in the Heroku server and found this `HEROKU_APP_NAME` which allows me to update the `WWW_HOST` env via the `postdeploy` script. I've configured the `app.json` as following:

{% highlight json %}
{
  "name":"my-app",
  "scripts":{
    "postdeploy":"bin/rake dev:bootstrap"
  },
  "env":{
    "MY_SECRET_KEY":{
      "required":true
    },
    "FACEBOOK_URL":{
      "required":true
    },
    "HEROKU_API_TOKEN":{
      "required":true
    }
  },
  "addons":[
    "heroku-postgresql"
  ]
}
{% endhighlight %}

It should run `bin/rake dev:bootstrap` after the deployment, and I've added a rake task to update the environment variable with [Heroku Platform API](https://github.com/heroku/platform-api).

{% highlight ruby %}
desc 'Bootstrap review app'
task bootstrap: ['db:schema:load', 'db:seed'] do
  heroku = PlatformAPI.connect_oauth(ENV['HEROKU_API_TOKEN'])
  heroku.config_var.update(ENV['HEROKU_APP_NAME'], 'WWW_HOSTNAME' => "#{ENV['HEROKU_APP_NAME']}.herokuapp.com")
end
{% endhighlight %}
