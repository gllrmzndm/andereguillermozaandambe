var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"Home","text":"<p>     Exploring the spectrum normal sports and extreme sports to computer science. Guillermo has talent for sports with the least amount of experience learning things quickly with undeniably \"it's-stupid-but-it-works\" and his so called \"strong Red Bull discipline\" mentality giving you new ideas and twists in life. </p> <p></p> <p>{{ blog_content }}</p>"},{"location":"blog/Windows-boot-transition.html","title":"Windows Boot Transition","text":"<p>Guillermo here, back again with another article.</p> <p>This time around it's about Windows boot transition, from the top of my head this is for Windows 7, 8 and Windows 10 1503-not sure yet.</p> <p>So I've made notes about it, because it's difficult to find on the internet and right now I am publishing it. Article might be difficult to read, since I came directly from my OneNote, Keep and Evernote.</p> <p>Enjoy.</p>"},{"location":"blog/Windows-boot-transition.html#applies-to-windows-version","title":"Applies to Windows version","text":"<ul> <li>Windows 7</li> <li>Windows 8</li> <li>Windows 8.1</li> <li>Windows 10 1503 or something. (Not sure)</li> </ul>"},{"location":"blog/Windows-boot-transition.html#boot-transition","title":"Boot Transition","text":"<p>Operating system initialization and device and driver initialization involve a lot of code and complicated interaction. Because system resources are taxed during boot, reducing resource usage as much as possible is critical to eliminate bottlenecks and improve performance. </p> <p>The boot transition can be divided into four high-level phases that are shown in Figure 2. A description of each phase is given, followed by a walkthrough of boot analysis. </p> <p>Figure 2. High-level phases of the boot transition.</p>"},{"location":"blog/Windows-boot-transition.html#boot-transition-biosinitialization-phase","title":"Boot Transition: BIOSInitialization Phase","text":""},{"location":"blog/Windows-boot-transition.html#what-happens-in-this-phase","title":"What Happens in This Phase","text":"<p>During the BIOSInitialization phase, the platform firmware identifies and initializes hardware devices, and then runs a power-on self-test (POST). The POST process ends when the BIOS detects a valid system disk, reads the master boot record (MBR), and starts Bootmgr.exe. Bootmgr.exe finds and starts Winload.exe on the Windows boot partition, which begins the OSLoader phase. </p>"},{"location":"blog/Windows-boot-transition.html#visual-cues","title":"Visual Cues","text":"<p>The BIOS splash screens and any POST-related messages appear during BIOSinitialization.</p>"},{"location":"blog/Windows-boot-transition.html#boot-transition-the-osloader-phase","title":"Boot Transition: The OSLoader Phase","text":""},{"location":"blog/Windows-boot-transition.html#what-happens-in-this-phase_1","title":"What Happens in This Phase","text":"<p>During the OSLoader phase, the Windows loader binary (Winload.exe) loads essential system drivers that are required to read minimal data from the disk and initializes the system to the point where the Windows kernel can begin execution. When the kernel starts to run, the loader loads into memory the system registry hive and additional drivers that are marked as BOOT_START. </p>"},{"location":"blog/Windows-boot-transition.html#visual-cues_1","title":"Visual Cues","text":"<p>This phase begins approximately when the BIOS splash and diagnostic screens are cleared and ends approximately when the \u201cLoading Windows\u201d splash screen appears.</p>"},{"location":"blog/Windows-boot-transition.html#boot-transition-the-mainpathboot-phase","title":"Boot Transition: The MainPathBoot Phase","text":""},{"location":"blog/Windows-boot-transition.html#what-happens-in-this-phase_2","title":"What Happens in This Phase","text":"<p>During the MainPathBoot phase, most of the operating system work occurs. This phase involves kernel initialization, Plug and Play activity, service start, logon, and Explorer (desktop) initialization. To simplify analysis, we divide the MainPathBoot phase into four subphases, as Figure 3 shows. Each subphase has unique characteristics and performance vulnerabilities. </p>"},{"location":"blog/Windows-boot-transition.html#visual-cues_2","title":"Visual Cues","text":"<p>Visually, the MainPathBoot phase begins when the \u201cStarting Windows\u201d splash screen appears and lasts until the desktop appears. If auto-logon is not enabled, the time that elapses while the logon screen is displayed affects the measured boot time in a trace. </p> <p>Figure 3. The MainPathBoot subphases.</p>"},{"location":"blog/Windows-boot-transition.html#mainpathboot-phase-presmss-subphase","title":"MainPathBoot Phase: PreSMSS Subphase","text":""},{"location":"blog/Windows-boot-transition.html#what-happens-in-this-subphase","title":"What Happens in This Subphase","text":"<p>The PreSMSS subphase begins when the kernel is invoked. During this subphase, the kernel initializes data structures and components. It also starts the PnP manager, which initializes the BOOT_START drivers that were loaded during the OSLoader phase. </p> <p>When the PnP manager detects a device, it loads and initializes the device\u2019s drivers in the following sequence: </p> <ol> <li> <p>Detects a device. </p> </li> <li> <p>Loads the drivers into memory and validates the driver signature. </p> </li> <li> <p>Calls the DriverEntry function of the device driver. The driver code executes. </p> </li> <li> <p>Sends an IRP_MN_START_DEVICE I/O request packet (IRP) to the driver, which notifies the driver to start the device. The driver code executes. </p> </li> <li> <p>Sends the IRP_MN_QUERY_DEVICE_RELATIONS IRP to the driver to enumerate any child devices. The driver code executes. </p> </li> </ol> <p>The PnP manager repeats these steps for each enumerated child device. It continues to iterate through child devices until it has enumerated and initialized the full device tree. </p>"},{"location":"blog/Windows-boot-transition.html#visual-cues_3","title":"Visual Cues","text":"<p>PreSMSS begins approximately when the \u201cLoading Windows\u201d splash screen appears. There are no explicit visual cues for the end of PreSMSS. </p>"},{"location":"blog/Windows-boot-transition.html#mainpathboot-phase-smssinit-subphase","title":"MainPathBoot Phase: SMSSInit Subphase","text":""},{"location":"blog/Windows-boot-transition.html#what-happens-in-this-subphase_1","title":"What Happens in This Subphase","text":"<p>The SMSSInit subphase begins when the kernel passes control to the session manager process (Smss.exe). During this subphase, the system initializes the registry, loads and starts the devices and drivers that are not marked BOOT_START, and starts the subsystem processes. SMSSInit ends when control is passed to Winlogon.exe. </p>"},{"location":"blog/Windows-boot-transition.html#visual-cues_4","title":"Visual Cues","text":"<p>There are no explicit visual cues for the start of SMSSInit, but the blank screen that appears between the splash screen and the logon screen is part of SMSSInit. It ends before the logon screen appears.</p>"},{"location":"blog/Windows-boot-transition.html#mainpathboot-phase-winlogoninit-subphase","title":"MainPathBoot Phase: WinLogonInit Subphase","text":""},{"location":"blog/Windows-boot-transition.html#what-happens-in-this-subphase_2","title":"What Happens in This Subphase","text":"<p>The WinLogonInit subphase begins when SMSSInit completes and starts Winlogon.exe. During WinLogonInit, the user logon screen appears, the service control manager starts services, and Group Policy scripts run. WinLogonInit ends when the Explorer process starts.</p>"},{"location":"blog/Windows-boot-transition.html#visual-cues_5","title":"Visual Cues","text":"<p>WinLogonInit begins shortly before the logon screen appears. It ends just before the desktop appears for the first time.</p>"},{"location":"blog/Windows-boot-transition.html#mainpathboot-phase-explorerinit-subphase","title":"MainPathBoot Phase: ExplorerInit Subphase","text":""},{"location":"blog/Windows-boot-transition.html#what-happens-in-this-subphase_3","title":"What Happens in This Subphase","text":"<p>The ExplorerInit subphase begins when Explorer.exe starts. During ExplorerInit, the system creates the desktop window manager (DWM) process, which initializes the desktop and displays it for the first time. </p> <p>This phase is CPU intensive. The initialization of DWM and desktop occurs in the foreground, while in the background the service control manager (SCM) starts services and the memory manager prefetches code and data. On most systems ExplorerInit is CPU bound, and timing issues are likely the result of a simple resource bottleneck. </p>"},{"location":"blog/Windows-boot-transition.html#visual-cues_6","title":"Visual Cues","text":"<p>ExplorerInit begins just before the desktop appears for the first time. There is no clear visual cue to indicate the end of ExplorerInit. </p>"},{"location":"blog/Windows-boot-transition.html#boot-transition-the-postboot-phase","title":"Boot Transition: The PostBoot Phase","text":""},{"location":"blog/Windows-boot-transition.html#what-happens-in-this-phase_3","title":"What Happens in This Phase","text":"<p>The PostBoot phase includes all background activity that occurs after the desktop is ready. The user can interact with the desktop, but the system might still be starting services, tray icons, and application code in the background. This phase is considered complete when Xperf data indicates that background activity has dropped to a reasonably idle level.</p> <p>Done</p>"},{"location":"blog/learning_from_video_games.html","title":"Learning from video games","text":""},{"location":"blog/learning_from_video_games.html#intro","title":"Intro","text":"<p>Note</p> <p>Don't forget to read Dan Luu's article about \"95%-ile isn't that good\" Completely forgot about it, but it's a great read.</p> <p>\"...My experience is that other games are similar and I think that \"real life\" activities aren't so different, although there are some complications. One complication is that real life activities tend not to have a single, one-dimensional, objective to optimize for. Another is that what makes someone good at a real life activity tends to be poorly understood (by comparison to games and sports) even in relation to a specific, well defined, goal...\"</p>"},{"location":"blog/learning_from_video_games.html#statements","title":"STATEMENTS","text":"<p>I'm talking about video games not games, video games are interactive video games. The \"video\" part is important to remember not only in this post, but for always. It's video games and not games. Not every video game requires the same skillset. If you don't use your brain then it's not going to work for you. (When you use a guide for example) Bold, inaccurate or slightly different statements are you going to read. Since I will modify my own perspectives carefully. Obviously you cannot learn all the finances from a single game or multiple games.</p>"},{"location":"blog/learning_from_video_games.html#learning","title":"Learning","text":"<p>Finances Tactics Communications (Verbal and non-verbal) Analysis Information gathering</p>"},{"location":"blog/learning_from_video_games.html#finances","title":"Finances","text":"<p>You buy a sniper rifle for 4.7K, you lose operator to the opposite team, the opposite team saves money getting a sniper rifle for you, the member that has your sniper rifle will buy better rifles for his/her teammates. You will think twice about buying your guns. A better explanation for \u201ceconomy\u201d is this video by SkillCapped Valorant Tips Tricks and Guides on YouTube:</p> <p></p>"},{"location":"blog/learning_from_video_games.html#communication","title":"Communication","text":"<p>Verbally through the microphone, commands (non verbal and messaging. Language barriers, members with no microphones and people that don't respond to comments are a thing. There are non spoken and nonverbal rules out there to get your point across like in real life. For the car culture there abbreviations and slangs for certain (like any other industry I guess)</p>"},{"location":"blog/learning_from_video_games.html#strategy-and-tactics","title":"Strategy and tactics","text":"<p>Again in Valorant your goal/strategy is getting a higher ranking, your tactic is winning the game. But how do you achieve this? Several websites and videos are available to help you out and learn from this. And one of the websites is called: Valoplant</p> <p>You create and strategize lineups for your agent(s) and teammates.</p> <p>!!! Definition: Lineup in Valorant     A Valorant Lineup is an act of launching a Valorant Agent Ability from a specific location, direction, and elevation so that it lands on the precise spot. Mostly, a Valorant lineup is used to prevent spike plant, or to prevent spike diffuse.</p> <p>And example for the agents that I use:</p> <p></p> <p>I think that Valorant and obviously Counter Strike and Overwatch are one of the best video games to develop almost every \u201cskill\u201d I mentioned earlier. If you don\u2019t use your brain you obviously don\u2019t develop it.</p>"},{"location":"blog/learning_from_video_games.html#analysis","title":"Analysis","text":"<p>I think Valorant is the easiest way for me to talk about. You died twice on the same spot, you did examine that when looking back at the performance tab in-game, next game you'll try something else or if you can remember the experience you will try different things and basically experiment with it until you get a positive experience. The same thing can be done in real life.</p> <p>Everything described earlier can be learned from video games and can be applied carefully in real life.</p> <p>The best one is obviously riding without Google maps in real life. You learn this in Need For Speed, there's no hand holding getting away from the cops, you have to figure out the route all by yourself and yes I\u2019m able to drive with satellite navigation, the fun thing is\u2026 I drive with satellite navigation on, but not for the guidance but something else and it\u2019s for you to figure out why.</p> <p></p> <p>Note</p> <p>Opinion: \u201cbut if you cheat or use guides in game, you don't learn anything from games and aren't as challenging as normally. So I did a game called Diablo 3 with whatever the expansion thing was I got invited by someone to play the game and she asked \u201cDon\u2019t use you Icy Veins and I was like flabbergasted that this existed, because I don\u2019t play games with guides and after I got through all those levels it was so boring, so I never touched it again. There\u2019s of course more to it, but you get the gist.\u201d</p>"},{"location":"blog/learning_from_video_games.html#information-gathering","title":"Information gathering","text":"<p>So gathering information in Valorant (and there are probably better games that can illustrate this more carefully) so in this instance when you\u2019re beginning the round, you first and probably want to know the enemies location. In order to do that you need to gather information. For example through the agent Fade. Throws her ability to mark enemies and basically spot those enemies in their location on the map. </p> <p>You\u2019re probably looking for a restaurant that makes the best Tagliatelle al Manzo in town. So you decide to use\u2026 a phone and probably Google Maps to gather information. Sounds easy right\u2026 Until the restaurant doesn\u2019t exist on Google Maps, the question is\u2026 what are you going to do when you want that particular meal. Gathering information.</p> <p>Note</p> <p>Did you notice the theme that\u2019s going on? If you don\u2019t play games or haven\u2019t played in a long time, this theme is from Need For Speed Heat.</p>"},{"location":"blog/managing_6000_bookmarks.html","title":"Managing almost six-thousand 6000 bookmarks.","text":""},{"location":"blog/managing_6000_bookmarks.html#intro","title":"Intro","text":"<p>How do I manage six-thousand bookmarks? To be honest, I had no clue how many bookmarks I had, since I don\u2019t count them. I had to use an extension to figure this out on Edge and Chrome on Firefox it\u2019s easier I think, Firefox isn\u2019t my main main-browser right now.</p> <p></p>"},{"location":"blog/managing_6000_bookmarks.html#firefox-tags","title":"Firefox tags","text":"<p>Back when I used Firefox as my main browser, you could tag your bookmarks with your words and separate them with commas. Other browsers don\u2019t support this, so relying on tags isn\u2019t an option. I am relying on my own \u201ctags\u201d to quickly search my bookmarks without opening the bookmarks page with the help of an extension called Vimium.</p> <p></p>"},{"location":"blog/managing_6000_bookmarks.html#using-an-extension-vimium","title":"Using an extension (Vimium)","text":"<p>I\u2019m using an extension to make it seamlessly and it\u2019s called Vimium and it\u2019s available for most popular browsers.</p> <p></p>"},{"location":"blog/managing_6000_bookmarks.html#getting-creative-with-tags","title":"Getting creative with tags","text":"<p>Whenever I need to save a bookmark a website I need come up with severals words (tags) to get back whenever I need to visit the website again, in general I come up with some random words the correspond to the website itself. For example we have a website talking about The performance of NTFS on Windows. Over here</p> <p>So my tag(s) are: \" #windowsntfsperformance\" behind the url itself. So actually it\u00b4s:</p> <p></p>"},{"location":"blog/managing_6000_bookmarks.html#done","title":"Done!","text":""},{"location":"blog/passwordless_ssh_windows_linux.html","title":"How to establish a passwordless SSH Connection between Windows and Linux","text":"<p>Open your favourite terminal emulator like Windows Terminal </p> <ol> <li>Use powershell: <code>ssh-keygen -t ed25519</code></li> <li>Choose a save location with password or without your choice.</li> <li>Change your current directory to your SSH folder <code>cd .\\.ssh\\</code></li> <li>Copy your public key to your Linux server <code>scp .\\id_ed25519.pub $name@192.168.1.173:~/</code></li> <li>press CTRL + D tells the terminal that it should register a EOF on standard input, which bash interprets as a desire to exit.</li> <li><code>ssh $name@192.168.1.173</code></li> <li>You're in without a password.</li> </ol> <p>You're done, way easier than this medium article</p>"},{"location":"blog/save-changes-after-reload.html","title":"Save CSS changes after page reload (Chrome)","text":"<p>Save your CCS changes with \"show override\" included in the Chrome DevTools.</p> <p>Open Chrome DevTools</p> <p></p> <p>Press Control+Shift+P or Command+Shift+P (Mac) to show Chrome\u2019s dev tools command menu.</p> <p></p> <p>Type \u201cshow overrides\u201d, press \"Select folder for overrides\" and allow acces to that particular folder.</p> <p></p> <p>Make some changes, reload the page and changes made earlier are still saved. click the back arrow to revert all changes.(2)</p> <p></p> <p>Changes that are made could be found in \"Sources\" tab. File could be saved locally  to your disk.</p> <p></p>"},{"location":"blog/starting-my-blog.html","title":"Starting my own blog.","text":"<p>I had to figure out how to express myself properly. Facebook, Instagram and Twitter weren't a good option due personal reasons and more.</p> <p>Facebook is too personal, Instagram is obviously for sharing photos and stories but, the worst part for me about Instagram is the part where most people are based on one personality or subject. Which is difficult for me, because there\u2019s much more than that.</p> <p>With my own blog, I have the freedom to blog about everything I want, sports, technology, cars and more. I\u2019m less dependent on Meta or Twitter.</p> <p>Starting my own blog with static pages is new to me, I heard of it before, but I had no clue how it would pan out. Yes, this blog is made with a static site generator called: Jekyll. Written in Ruby and can be used with Markdown, Liquid template engine and HTML and CSS.</p> <p>Diving right into Jekyll themes was clumsy, since I didn\u2019t know about Jekyll in general to make the most out of it. But right now, it works and is good enough to write blog posts.</p> <p>I selected the mediumish-theme-jekyll from Sal @ wowthemes.net</p> <p>Couple of fixes had to be made and things had to be figured out before I could properly launch my static page locally on my computer.</p> <p>The some what paltry instructions of any ${insert manual] is unpleasant for real beginners who want to have a nice theme. Starting with the mediumish theme:</p> <ul> <li>I had to install the bundle gems</li> <li>set bundle config to local path</li> <li>update the bundle (since it had a couple of errors.</li> <li>Changing the config file, because it didn\u2019t include the <code>vendor</code> string to exclude it from the building process.</li> </ul> <p>All the above has been solved and I made a pull request and made some changes to the file config.yml file and updated the README.md. (I think this is my second pull request?)</p> <p>Things are working \u201cproperly\u201d right now and it\u2019s time to start posting.</p>"},{"location":"blog/transferring.html","title":"Transferring files from my Linux VM to my localhost","text":"<p>Hey Guillermo here,</p> <p>So right now, I did another project and my files are being held hostage in a Linux Virtual Machine (Rocky Linux) and I want to duplicate my project for back-up and testing purposes. So I needed way to back-up my project.</p>"},{"location":"blog/transferring.html#for-the-people-that-dont-want-to-read","title":"For the people that don't want to read...","text":"<p>Visual Studo Code can download your projects. Just SSH in your server, go one directory up and select your folder to download. I would suggest to tar or zip your files first. zip, download, done.</p>"},{"location":"blog/transferring.html#visual-studio-code","title":"Visual Studio Code","text":"<p>Since Visual Studio Code is doing the majority of the work like forwarding my project to localhost. I figured that I could download my project and bring it to my local host. (my own device)</p>"},{"location":"blog/transferring.html#zipping-files","title":"Zipping files","text":"<p>First I zip my files, since it takes less time to transfer a lot of small files to my host or any other device.</p> <p>You can also I use tar, but from the top of my mind I am not sure if Windows 10 and Windows 11 will support tar out of the box. But you can download 7-Zip and use that program to pack and unpack tar files.</p>"},{"location":"blog/transferring.html#1-installing-zip","title":"1. Installing zip","text":"<p><code>sudo dnf install zip -y</code></p>"},{"location":"blog/transferring.html#2-the-command-that-i-use-to-zip-files-on-rocky-linux","title":"2. The command that I use to zip files on Rocky Linux","text":"<p><code>`zip -0 -r whatever.zip ./mkdocsguillermo.zip</code></p> <p></p>"},{"location":"blog/transferring.html#download-your-project-with-visual-studio-code","title":"Download your project with Visual Studio Code","text":""},{"location":"blog/transferring.html#1-open-your-visual-studio-code-but-dont-go-to-your-project-go-one-directory-above-project-in-the-visual-studio-code-explorer-ctrl-shift-e","title":"1. Open your Visual Studio Code, but... don't go to your project go one directory above project in the Visual Studio Code Explorer (CTRL + SHIFT E)","text":""},{"location":"blog/transferring.html#2-left-click-on-your-projectdirectory-and-download-the-project","title":"2. Left click on your project/directory and download the project.","text":""},{"location":"blog/transferring.html#done","title":"Done!","text":""},{"location":"blog/under-the-hood-changes.html","title":"Under the hood changes (old website)","text":"<p>Under the hood changes</p> <p>Website is going to get changed (again) for efficiency and for better clarification. The thumbnails of the posts are falling behind in terms of efficiency and clarification; I can\u2019t use .webp or .webm containers, since it doesn\u2019t work and the site is based on modified mediumish theme, with not everything available and had to be adjusted by me. You can read more about  .webp and .webm over here: WebP Compression Study  |  Google Developers What is WebP? Pros and cons of this next-gen image format - 99designs</p> <p>With the new changes I\u2019m able to support additional video players, like, Vimeo, YouTube, Twitch, Facebook video player and more. Loading the next page is going to be quicker. And more and better support for a variety of plugins and due changes in the hosting department.</p> <p>Sincerely,</p> <p>Guillermo</p>"},{"location":"blog/using-ntfs-bitlocker.html","title":"Using NTFS Bitlocker external SSD on Fedora","text":"<p>So I figured out that, <code>yarn</code> may be better than <code>npm</code> when installing packages.</p>"},{"location":"blog/using-ntfs-bitlocker.html#intro","title":"Intro","text":"<p>So I figured out that, <code>yarn</code> may be better than <code>npm</code> when installing packages. Reason why I use <code>yarn</code> instead of <code>npm</code> can be found here: Yarn: A new package manager for JavaScript</p> <p>Along side these tools, I use Node Version Manager:</p> <p>nvm is a version manager for node.js, designed to be installed per-user, and invoked per-shell. nvm works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and windows WSL. ~ https://github.com/nvm-sh/nvm</p> <p>The reason why I use NVM:</p> <ul> <li>Use other version of <code>npm</code>.</li> <li>Using <code>yarn</code> without installing it with elevated rights</li> </ul>"},{"location":"blog/using-ntfs-bitlocker.html#using-yarn","title":"Using yarn","text":"<p>Since I couldn't use <code>yarn</code> on my system without(Fedora) using elevated rights. see error:</p> <pre><code>[guillermo@uhuh~]$ npm install --global yarn\nnpm ERR! code EACCES\nnpm ERR! syscall rename\nnpm ERR! path /usr/local/lib/node_modules/yarn\nnpm ERR! dest /usr/local/lib/node_modules/.yarn-Jrexx8nI\nnpm ERR! errno -13\nnpm ERR! Error: EACCES: permission denied, rename '/usr/local/lib/node_modules/yarn' -&gt; '/usr/local/lib/node_modules/.yarn-Jrexx8nI'\n</code></pre> <p>I had to find a solution for this problem and my resolution was to use <code>nvm</code> which obviously using a good reason to use, even without <code>yarn</code>. My source for the solution can be found here: Resolving EACCES permissions errors when installing packages globally</p>"},{"location":"blog/using-ntfs-bitlocker.html#installing-nvm-and-yarn","title":"Installing nvm and yarn","text":"<p>So Installed this script: (I don't like using scripts to install binaries, because that's the job of the package manager.)</p> <ol> <li>https://github.com/nvm-sh/nvm#install--update-script</li> <li>nvm install --lts (for installing the latest nodejs LTS version)</li> <li>npm install --global yarn</li> </ol> <p>For lazy people copy this:</p> <p><code>bash wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash nvm install --lts npm install --global yarn</code></p> <p>and use <code>yarn create react-app my-app</code> to use yarn as packagemanger. (Mind the space in <code>yarn create</code> part, it isn't a spelling mistake.)</p>"},{"location":"blog/using-ntfs-bitlocker.html#using-yarn-eg-create-react-app-my-app","title":"Using yarn e.g. create react-app my-app","text":"<p>Accoridng to Create a New React App</p> <p>You will need to use the command <code>npx create-react-app my-app</code> which is going to <code>npm</code> instead of <code>yarn</code> to install your packages. Which we don't want. The reason why <code>npx</code> defaults to <code>npm</code> is explained on GitHub by iansu:</p> <p>\"We've actually made some changes to this since the initial PR. Our goal is to make running create-react-app deterministic. With the old behaviour two people running npx create-react-app my-app could end up with different installs if one of them happened to have Yarn installed.</p> <p>The new behaviour in this PR looks at how create-react-app was invoked and uses the corresponding package manager. npx create-react-app my-app will use npm and yarn dlx create-react-app my-app (or yarn create react-app my-app) will use Yarn. This will also potentially allow us to add support for other package managers by following the same pattern.\"</p> <p>Source: https://github.com/facebook/create-react-app/pull/11322</p> <p>To use <code>yarn</code>, you will need to use the command <code>yarn create react-app my-app</code> (Mind the space in <code>yarn create</code> part, it isn't a spelling mistake.) Using <code>create-react-app my-app</code> will also use <code>npm</code> as package manager.</p>"}]}