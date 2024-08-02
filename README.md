# Fetch SDET Coding Exercise

This repository contains a test automation project that uses Webdriver.IO and Cucumber to resolve a game where we must find a fake gold bar amongst a provided set of 9 gold bars. The test automation is used against a react app that simulates the scaling process. The objective of this test automation is to display the process of finding the fake gold bar using the least number of weighings.



## Installation and Execution

- It is assumed this test will be executed in a UNIX-like environment.
- Google Chrome browser must be installed in order to run the test automation.


 
1. Download and unzip the project .zip file or you may also open a terminal window and clone the repository to your system. 
```
git clone https://github.com/janicemiranda/fetch-sdet-coding-exercise.git
```
2. Open the project file path to the terminal
3. Run the following commands to install Node.js
- Install Node Version Manager
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

- Download and install Node.js (you may need to restart the terminal)
```
nvm install 20
```
- Verifies the right Node.js version is in the environment (should print `v20.16.0`)
```
node -v
```
- Verifies the right npm version is in the environment (should print `10.8.1`)
```
npm -v
```

4. Install npm packages
```
npm install
```
5. Run the test automation solution
```
npx wdio run wdio.conf.js
```


    
