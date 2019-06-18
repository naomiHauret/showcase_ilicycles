# Ili Cycles

Showcase website for Ili Cycles company.

## Install and run

To install the project, in your terminal, run :
```
npm install
```

Then, at the root of the project create a `now.json` file and paste `now.json.dist` content in it.

As you can notice, some fields are empty :
* `PRISMIC_URL`
* `MAIL_TOKEN`
* `MAIL_TO`

These are secret env variables.
You can leave these fields empty if you wish, but it'd be better to fill them with your Prismic repo URL and Enformed info.

*You have add these key through `now-cli`.*
For instance, to add `PRISMIC_URL`, run `now -e PRISMIC_URL="https://myawesomewebsitefetchedfromprismic.cdn.prismic.io/api/v2"`

Once all your secrets are added, you can start the project with `npm run dev:start`. Hit `localhost:3000`. Have fun !
