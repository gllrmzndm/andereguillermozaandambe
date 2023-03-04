var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"Home","text":""},{"location":"index.html#ea-traxx","title":"EA TRAXX","text":"<p>{{ blog_content }}</p>"},{"location":"blog/passwordless_ssh_windows_linux.html","title":"How to establish a passwordless SSH Connection between Windows and Linux","text":"<p>Create a key (ed25519)</p> <p>Open your favourite terminal emulator like Windows Terminal </p> <ol> <li>Use powershell: <code>ssh-keygen -t ed25519</code></li> <li>Choose a save location with password or without your choice.</li> <li>Change your current directory to your SSH folder <code>cd .\\.ssh\\</code></li> <li>Copy your public key to your Linux server <code>scp .\\id_ed25519.pub $name@192.168.1.173:~/</code></li> </ol>"},{"location":"blog/save-changes-after-reload.html","title":"Save CSS changes after page reload (Chrome)","text":"<p>Save your CCS changes with \"show override\" included in the Chrome DevTools.</p> <p>Open Chrome DevTools</p> <p></p> <p>Press Control+Shift+P or Command+Shift+P (Mac) to show Chrome\u2019s dev tools command menu.</p> <p></p> <p>Type \u201cshow overrides\u201d, press \"Select folder for overrides\" and allow acces to that particular folder.</p> <p></p> <p>Make some changes, reload the page and changes made earlier are still saved. click the back arrow to revert all changes.(2)</p> <p></p> <p>Changes that are made could be found in \"Sources\" tab. File could be saved locally  to your disk.</p> <p></p>"},{"location":"blog/starting-my-blog.html","title":"Starting my own blog.","text":"<p>I had to figure out how to express myself properly. Facebook, Instagram and Twitter weren't a good option due personal reasons and more.</p> <p>Facebook is too personal, Instagram is obviously for sharing photos and stories but, the worst part for me about Instagram is the part where most people are based on one personality or subject. Which is difficult for me, because there\u2019s much more than that.</p> <p>With my own blog, I have the freedom to blog about everything I want, sports, technology, cars and more. I\u2019m less dependent on Meta or Twitter.</p> <p>Starting my own blog with static pages is new to me, I heard of it before, but I had no clue how it would pan out. Yes, this blog is made with a static site generator called: Jekyll. Written in Ruby and can be used with Markdown, Liquid template engine and HTML and CSS.</p> <p>Diving right into Jekyll themes was clumsy, since I didn\u2019t know about Jekyll in general to make the most out of it. But right now, it works and is good enough to write blog posts.</p> <p>I selected the mediumish-theme-jekyll from Sal @ wowthemes.net</p> <p>Couple of fixes had to be made and things had to be figured out before I could properly launch my static page locally on my computer.</p> <p>The some what paltry instructions of any ${insert manual] is unpleasant for real beginners who want to have a nice theme. Starting with the mediumish theme:</p> <ul> <li>I had to install the bundle gems</li> <li>set bundle config to local path</li> <li>update the bundle (since it had a couple of errors.</li> <li>Changing the config file, because it didn\u2019t include the <code>vendor</code> string to exclude it from the building process.</li> </ul> <p>All the above has been solved and I made a pull request and made some changes to the file config.yml file and updated the README.md. (I think this is my second pull request?)</p> <p>Things are working \u201cproperly\u201d right now and it\u2019s time to start posting.</p>"},{"location":"blog/under-the-hood-changes.html","title":"Under the hood changes","text":"<p>Under the hood changes</p> <p>Website is going to get changed (again) for efficiency and for better clarification. The thumbnails of the posts are falling behind in terms of efficiency and clarification; I can\u2019t use .webp or .webm containers, since it doesn\u2019t work and the site is based on modified mediumish theme, with not everything available and had to be adjusted by me. You can read more about  .webp and .webm over here: WebP Compression Study  |  Google Developers What is WebP? Pros and cons of this next-gen image format - 99designs</p> <p>With the new changes I\u2019m able to support additional video players, like, Vimeo, YouTube, Twitch, Facebook video player and more. Loading the next page is going to be quicker. And more and better support for a variety of plugins and due changes in the hosting department.</p> <p>Sincerely,</p> <p>Guillermo</p>"},{"location":"blog/using-ntfs-bitlocker.html","title":"Using NTFS Bitlocker external SSD on Fedora","text":"<p>So I figured out that, <code>yarn</code> may be better than <code>npm</code> when installing packages.</p>"},{"location":"blog/using-ntfs-bitlocker.html#intro","title":"Intro","text":"<p>So I figured out that, <code>yarn</code> may be better than <code>npm</code> when installing packages. Reason why I use <code>yarn</code> instead of <code>npm</code> can be found here: Yarn: A new package manager for JavaScript</p> <p>Along side these tools, I use Node Version Manager:</p> <p>nvm is a version manager for node.js, designed to be installed per-user, and invoked per-shell. nvm works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL. ~ https://github.com/nvm-sh/nvm</p> <p>The reason why I use NVM:</p> <ul> <li>Use other version of <code>npm</code>.</li> <li>Using <code>yarn</code> without installing it with elevated rights</li> </ul>"},{"location":"blog/using-ntfs-bitlocker.html#using-yarn","title":"Using yarn","text":"<p>Since I couldn't use <code>yarn</code> on my system without(Fedora) using elevated rights. see error:</p> <pre><code>[guillermo@uhuh~]$ npm install --global yarn\nnpm ERR! code EACCES\nnpm ERR! syscall rename\nnpm ERR! path /usr/local/lib/node_modules/yarn\nnpm ERR! dest /usr/local/lib/node_modules/.yarn-Jrexx8nI\nnpm ERR! errno -13\nnpm ERR! Error: EACCES: permission denied, rename '/usr/local/lib/node_modules/yarn' -&gt; '/usr/local/lib/node_modules/.yarn-Jrexx8nI'\n</code></pre> <p>I had to find a solution for this problem and my resolution was to use <code>nvm</code> which obviously using a good reason to use, even without <code>yarn</code>. My source for the solution can be found here: Resolving EACCES permissions errors when installing packages globally</p>"},{"location":"blog/using-ntfs-bitlocker.html#installing-nvm-and-yarn","title":"Installing nvm and yarn","text":"<p>So Installed this script: (I don't like using scripts to install binaries, because that's the job of the package manager.)</p> <ol> <li>https://github.com/nvm-sh/nvm#install--update-script</li> <li>nvm install --lts (for installing the latest nodejs LTS version)</li> <li>npm install --global yarn</li> </ol> <p>For lazy people copy this:</p> <p><code>bash wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash nvm install --lts npm install --global yarn</code></p> <p>and use <code>yarn create react-app my-app</code> to use yarn as packagemanger. (Mind the space in <code>yarn create</code> part, it isn't a spelling mistake.)</p>"},{"location":"blog/using-ntfs-bitlocker.html#using-yarn-eg-create-react-app-my-app","title":"Using yarn e.g. create react-app my-app","text":"<p>Accoridng to Create a New React App</p> <p>You will need to use the command <code>npx create-react-app my-app</code> which is going to <code>npm</code> instead of <code>yarn</code> to install your packages. Which we don't want. The reason why <code>npx</code> defaults to <code>npm</code> is explained on GitHub by iansu:</p> <p>\"We've actually made some changes to this since the initial PR. Our goal is to make running create-react-app deterministic. With the old behaviour two people running npx create-react-app my-app could end up with different installs if one of them happened to have Yarn installed.</p> <p>The new behaviour in this PR looks at how create-react-app was invoked and uses the corresponding package manager. npx create-react-app my-app will use npm and yarn dlx create-react-app my-app (or yarn create react-app my-app) will use Yarn. This will also potentially allow us to add support for other package managers by following the same pattern.\"</p> <p>Source: https://github.com/facebook/create-react-app/pull/11322</p> <p>To use <code>yarn</code>, you will need to use the command <code>yarn create react-app my-app</code> (Mind the space in <code>yarn create</code> part, it isn't a spelling mistake.) Using <code>create-react-app my-app</code> will also use <code>npm</code> as package manager.</p>"}]}