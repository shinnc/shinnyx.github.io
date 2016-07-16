---
layout: post
title:  "Setting up GPG for Git"
slug:   "setting-up-gpg-for-git"
date:   2016-04-30 11:31:00 +08:00
comments: true
categories: Git Coding GPG OSX
---

Earlier this month GitHub launched a new feature, [GPG signature verification](https://github.com/blog/2144-gpg-signature-verification) which would add a verified tag for each commit that signed with GPG.

<img alt="GitHub verified signature" src="https://cloud.githubusercontent.com/assets/25792/14290042/5b27dab2-fb12-11e5-9ff9-44116a7780ea.png" class="content" />

This feature is especially useful when you're working on a shared computer, where you want to prevent others to commit on your behalf (no, that spaghetti code wasn't mine) by verifying with a passphase whenever you make a commit; Or if you were like me, having a _Verified_ label on your commits on GitHub looks pretty cool yo.

---

**Install GPG with Homebrew**

`$ brew install gpg`

**Generate GPG key**

`$ gpg --gen-key`

This step is pretty straight forward, just follow the instruction. I opt for the default option to use RSA, whereas for the RSA keysize, it's recommended to use 2048 (default) since it's in a balance of security and performance. I like things to be balanced out.

    gpg (GnuPG) 1.4.20; Copyright (C) 2015 Free Software Foundation, Inc.
    This is free software: you are free to change and redistribute it.
    There is NO WARRANTY, to the extent permitted by law.

    gpg: directory `/Users/shinn/.gnupg' created
    gpg: new configuration file `/Users/shinn/.gnupg/gpg.conf' created
    gpg: WARNING: options in `/Users/shinn/.gnupg/gpg.conf' are not yet active during this run
    gpg: keyring `/Users/shinn/.gnupg/secring.gpg' created
    gpg: keyring `/Users/shinn/.gnupg/pubring.gpg' created
    Please select what kind of key you want:
       (1) RSA and RSA (default)
       (2) DSA and Elgamal
       (3) DSA (sign only)
       (4) RSA (sign only)
    Your selection? 1
    RSA keys may be between 1024 and 4096 bits long.
    What keysize do you want? (2048)
    Requested keysize is 2048 bits
    Please specify how long the key should be valid.
             0 = key does not expire
          <n>  = key expires in n days
          <n>w = key expires in n weeks
          <n>m = key expires in n months
          <n>y = key expires in n years
    Key is valid for? (0)
    Key does not expire at all
    Is this correct? (y/N) y


Then enter the information for your signature and set up the passphase:

    You need a user ID to identify your key; the software constructs the user ID
    from the Real Name, Comment and Email Address in this form:
        "Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"

    Real name: Shinn Chong
    Email address: your-email@example.com
    Comment: Personal Macbook
    You selected this USER-ID:
        "Shinn Chong (Personal Macbook) <your-email@example.com>"

    Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? o
    You need a Passphrase to protect your secret key.

    We need to generate a lot of random bytes. It is a good idea to perform
    some other action (type on the keyboard, move the mouse, utilize the
    disks) during the prime generation; this gives the random number
    generator a better chance to gain enough entropy.
    ...+++++
    ...+++++
    We need to generate a lot of random bytes. It is a good idea to perform
    some other action (type on the keyboard, move the mouse, utilize the
    disks) during the prime generation; this gives the random number
    generator a better chance to gain enough entropy.
    ........+++++
    ....+++++
    gpg: /Users/shinn/.gnupg/trustdb.gpg: trustdb created
    gpg: key 123C1234 marked as ultimately trusted
    public and secret key created and signed.

    gpg: checking the trustdb
    gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
    gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
    pub   2048R/123C1234 2016-04-30
          Key fingerprint = 7D50 C87B EA66 1A08 19CB  325C E6CD 064B 390A 7855
    uid                  Shinn Chong (Personal Macbook) <your-email@example.com>
    sub   2048R/08831C0D 2016-04-30

**Telling Git about your GPG key**

`$ gpg --list-keys`

    /Users/shinn/.gnupg/pubring.gpg
    -------------------------------
    pub   2048R/123C1234 2016-04-30
    uid                  Shinn Chong (Personal Macbook) <your-email@example.com>
    sub   2048R/08831C0D 2016-04-30

`$ git config --global user.signingkey 123C1234`

**Set all commits for a repository to be signed by default**

`$ git config --global commit.gpgsign true`

And you're done!

References:

[Signing Your Work](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work)
| [How to use GPG command line](http://blog.ghostinthemachines.com/2015/03/01/how-to-use-gpg-command-line/)
| [Telling Git about your GPG key](https://help.github.com/articles/telling-git-about-your-gpg-key/)
| [Setting up GPG signature on Mac OS X with Xcode](https://gist.github.com/stansidel/94fef5b042d03c004577367aa52b883d)
| [Change passphase](http://www.cyberciti.biz/faq/linux-unix-gpg-change-passphrase-command/)
