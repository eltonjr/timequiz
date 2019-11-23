## Timequiz Webapp

#### About

This Webapp displays a timed Computer Science quiz.  
When no one is taking any quiz, it displays a scoreboard with the best players
It is made in HTML+JS+CSS and it access the backend api from `../server`.

#### Building and running

A `Makefile` is provided to perform most tasks.

You can run the project using your local tools (node and npm needed) or using docker.

Make targets:

    Usage:
      make <target>

    Targets:
      help                  Display this help
      deps                  Install node dependencies based on npm
      build                 Compiles the system's dist
      run                   Run the system locally
      lint                  Check the system syntax
      ops-build             Compiles the system using docker
      ops-run               Runs the system using docker
