while working on the [contact page](https://enochspevivo.com/contact) for my portfolio site, i quickly realized that letting any stranger with access to my site send unlimited emails to my personal account could quickly become problematic.

so, i made this little express app. its duty is to expose a `POST` endpoint for my contact form. this allows me to hide my credentials, handle input sanitizing, and send emails programmatically, all on a server far, far, away from any mischievous clients.

the app is hosted "serverlessly" (as the kids call it) using Google Cloud Functions, right in the same firebase project as my portfolio site.
